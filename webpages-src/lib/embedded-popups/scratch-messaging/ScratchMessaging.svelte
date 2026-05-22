<script>
  import { onMount } from "svelte";
  import { createAddonContext } from "$lib/embedded-popup-loader.js";
  import Comment from "./Comment.svelte";
  import { escapeHTML } from "../../../../libraries/common/cs/autoescaper.js";
  import * as MessageCache from "../../../../libraries/common/message-cache.js";
  import * as API from "../../../../popups/scratch-messaging/api.js";
  import fixCommentContent from "../../../../popups/scratch-messaging/fix-comment-content.js";

  let { addonId } = $props();
  let ctx = $state(null);

  function appendDom(node, element) {
    if (element) node.appendChild(element);
    return {
      update(newElement) {
        if (element) try { node.removeChild(element); } catch {}
        element = newElement;
        if (element) node.appendChild(element);
      },
      destroy() {
        if (element) try { node.removeChild(element); } catch {}
      },
    };
  }

  const errorCodes = {
    isEmpty: "comment-error-empty",
    isFlood: "comment-error-ratelimit",
    429: "comment-error-ratelimit",
    isBad: "comment-error-filterbot-generic",
    hasChatSite: "comment-error-filterbot-chat",
    isSpam: "comment-error-filterbot-spam",
    replyLimitReached: "comment-error-reply-limit",
    500: "comment-error-down",
    503: "comment-error-down",
  };

  let dateNow = Date.now();
  const parser = new DOMParser();

  // State (mirrors Vue 1 component's data)
  let stMessages = $state([]);
  let messages = $state([]);
  let comments = $state({});
  let error = $state("notReady");
  let hasCustomError = $state(false);
  let username = $state(null);
  let msgCount = $state(null);

  let messagesReady = $state(false);
  let commentsReady = $state(false);
  let commentsProgress = $state(0);
  let showAllMessages = $state(false);
  let showingMessagesAmt = $state(null);
  let markedAsRead = $state(false);

  let follows = $state([]);
  let studioInvites = $state([]);
  let studioPromotions = $state([]);
  let studioHostTransfers = $state([]);
  let forumActivity = $state([]);
  let studioActivity = $state([]);
  let studioActivityAmt = $state(0);
  let remixes = $state([]);
  let profiles = $state([]);
  let studios = $state([]);
  let projects = $state([]);
  let welcomeToScratch = $state(false);

  let messageTypeExtended = $state({
    stMessages: false,
    follows: false,
    studioInvites: false,
    studioPromotions: false,
    studioHostTransfers: false,
    forumActivity: false,
    studioActivity: false,
    remixes: false,
  });

  const uiMessages = $derived.by(() => {
    if (!ctx) return {};
    const { msg } = ctx;
    return {
      stMessagesMsg: msg("stMessages"),
      followsMsg: msg("follows"),
      studioInvitesMsg: msg("studio-invites"),
      forumMsg: msg("forum"),
      studioActivityMsg: msg("studio-activity"),
      remixesMsg: msg("remixes"),
      yourProfileMsg: msg("your-profile"),
      loadingMsg: msg("loading"),
      loggedOutMsg: msg("logged-out"),
      loggedOutLinkMsg: msg("logged-out-link"),
      serverErrorMsg: msg("server-error"),
      networkErrorMsg: msg("network-error"),
      unknownFatalErrorMsg: msg("unknown-fatal-error"),
      reportBugMsg: msg("report-bug"),
      copyMsg: msg("copy"),
      loadingCommentsMsg: msg("loading-comments"),
      reloadMsg: msg("reload"),
      dismissMsg: msg("dismiss"),
      noUnreadMsg: msg("no-unread"),
      showMoreMsg: msg("show-more"),
      markAsReadMsg: msg("mark-as-read"),
      markedAsReadMsg: msg("marked-as-read"),
      openMessagesMsg: msg("open-messages"),
      studioPromotionsMsg: msg("studio-promotions"),
      studioHostTransfersMsg: msg("studio-host-transfers"),
      welcomeToScratchMsg: msg("welcome-to-scratch"),
    };
  });

  const feedbackUrl = $derived.by(() => {
    const m = chrome.runtime.getManifest();
    return `https://scratchaddons.com/feedback/?ext_version=${m.version_name}&utm_source=extension&utm_medium=messagingcrash&utm_campaign=v${m.version}`;
  });

  const profilesOrdered = $derived([
    ...profiles.filter((p) => p.username === username),
    ...profiles.filter((p) => p.username !== username),
  ]);

  const projectsOrdered = $derived([
    ...projects.filter((p) => p.unreadComments !== 0),
    ...projects.filter((p) => p.unreadComments === 0),
  ]);

  const canShowMoreMessages = $derived(
    messagesReady && commentsReady && !error && showAllMessages === false && messages.length > showingMessagesAmt
  );

  function getProjectObject(projectId, title) {
    const search = projects.find((obj) => obj.id === projectId);
    if (search) return search;
    const obj = {
      id: projectId,
      title,
      unreadComments: 0,
      commentChains: [],
      loveCount: 0,
      favoriteCount: 0,
      loversAndFavers: [],
      loadedComments: false,
    };
    projects.push(obj);
    return obj;
  }
  function getProfileObject(uname) {
    const search = profiles.find((obj) => obj.username === uname);
    if (search) return search;
    const obj = { username: uname, unreadComments: 0, commentChains: [], loadedComments: false };
    profiles.push(obj);
    return obj;
  }
  function getStudioObject(studioId, title) {
    const search = studios.find((obj) => obj.id === studioId);
    if (search) return search;
    const obj = { id: studioId, title, unreadComments: 0, commentChains: [], loadedComments: false };
    studios.push(obj);
    return obj;
  }

  function isCommentUnread(commentId) {
    const realCommentId = Number(commentId.substring(2));
    const messageIndex = messages.findIndex((m) => m.comment_id === realCommentId);
    if (messageIndex === -1) return false;
    if (messageIndex < msgCount) {
      if (comments[commentId].childOf) {
        return !isCommentUnread(comments[commentId].childOf);
      }
      return true;
    }
    return false;
  }

  async function getData() {
    const { addon } = ctx;
    try {
      const [uname, xToken] = await Promise.all([addon.auth.fetchUsername(), addon.auth.fetchXToken()]);
      if (window.scratchAddons?.cookieFetchingFailed) throw new TypeError("NetworkError");
      if (!uname) throw new MessageCache.HTTPError("Not logged in", 401);
      username = uname;
      const [newMessages, alerts] = await Promise.all([
        MessageCache.updateMessages(window.scratchAddons.cookieStoreId, false, uname, xToken),
        API.fetchAlerts(addon),
      ]);
      chrome.runtime.sendMessage({
        forceBadgeUpdate: { store: window.scratchAddons.cookieStoreId },
        notifyNewMessages: { store: window.scratchAddons.cookieStoreId, messages: newMessages },
      });
      const db = await MessageCache.openDatabase();
      try {
        messages = await db.get("cache", window.scratchAddons.cookieStoreId);
        msgCount = await db.get("count", window.scratchAddons.cookieStoreId);
      } finally {
        await db.close();
      }
      stMessages = (Array.isArray(alerts) ? alerts : []).map((alert) => {
        const element = parser.parseFromString(alert.message, "text/html");
        for (const link of element.getElementsByTagName("a")) {
          link.href = new URL(link.getAttribute("href"), "https://scratch.mit.edu/").toString();
        }
        const wrapped = document.createElement("div");
        wrapped.append(...element.body.childNodes);
        return { ...alert, element: wrapped, datetime_created: new Date(alert.datetime_created).toDateString() };
      });
      error = undefined;
      return true;
    } catch (e) {
      if (e instanceof MessageCache.HTTPError) {
        if (e.code === 401 || e.code === 403) {
          error = "loggedOut";
          return false;
        } else if (e.code >= 500) {
          error = "serverError";
          return false;
        }
      } else if (e instanceof TypeError && String(e).includes("NetworkError")) {
        error = "networkError";
        return false;
      }
      console.error("Error while initial getData", e);
      hasCustomError = true;
      error = String(e);
      return false;
    }
  }

  async function updateMessageCount(bypassCache = false) {
    const { addon } = ctx;
    const uname = await addon.auth.fetchUsername();
    const msgCountData = await MessageCache.fetchMessageCount(uname, { bypassCache });
    const count = await MessageCache.getUpToDateMsgCount(window.scratchAddons.cookieStoreId, msgCountData);
    const db = await MessageCache.openDatabase();
    try {
      await db.put("count", count, window.scratchAddons.cookieStoreId);
      if (!bypassCache && msgCountData.resId && !(db instanceof MessageCache.IncognitoDatabase)) {
        await db.put("count", msgCountData.resId, `${window.scratchAddons.cookieStoreId}_resId`);
      }
    } finally {
      await db.close();
    }
    chrome.runtime.sendMessage({ forceBadgeUpdate: { store: window.scratchAddons.cookieStoreId } });
  }

  function markAsRead() {
    const { addon } = ctx;
    MessageCache.markAsRead(addon.auth.csrfToken)
      .then(() => updateMessageCount(true))
      .then(() => {
        markedAsRead = true;
      })
      .catch((e) => console.error("Marking messages as read failed:", e));
  }
  function dismissAlert(id) {
    if (!confirm(ctx.msg("stMessagesConfirm"))) return;
    API.dismissAlert(ctx.addon, id)
      .then(() => {
        const i = stMessages.findIndex((alert) => alert.id === id);
        if (i !== -1) stMessages.splice(i, 1);
        updateMessageCount(true);
      })
      .catch((e) => console.error("Dismissing alert failed:", e));
  }
  function reloadPage() {
    location.reload();
  }
  function copyToClipboard(message) {
    navigator.clipboard.writeText(message);
  }

  async function checkCommentLocation(resourceType, resourceId, commentMessages, elementObject) {
    const { addon } = ctx;
    try {
      const [fetched, enabledAddons] = await Promise.all([
        API.fetchComments(addon, { resourceType, resourceId, commentMessages }),
        addon.self.getEnabledAddons(),
      ]);
      if (Object.keys(fetched).length === 0) elementObject.unreadComments = 0;
      for (const commentId of Object.keys(fetched)) {
        const commentObject = fetched[commentId];
        let domContent = fixCommentContent(commentObject.content, enabledAddons);
        if (resourceType !== "user") {
          const newElement = document.createElement("div");
          if (commentObject.replyingTo) {
            newElement.append(
              Object.assign(document.createElement("a"), {
                href: `https://scratch.mit.edu/users/${commentObject.replyingTo}`,
                textContent: "@" + commentObject.replyingTo,
              })
            );
            newElement.append(" ");
          }
          newElement.append(...domContent.childNodes);
          domContent = newElement;
        }
        commentObject.content = domContent;
        comments[commentId] = commentObject;
      }
      const parentComments = Object.entries(fetched).filter((c) => c[1].childOf === null);
      const sortedParentComments = parentComments.sort((a, b) => new Date(b[1].date) - new Date(a[1].date));
      const sortedIds = sortedParentComments.map((arr) => arr[0]);
      const resourceObject =
        resourceType === "project"
          ? getProjectObject(resourceId)
          : resourceType === "user"
            ? getProfileObject(resourceId)
            : getStudioObject(resourceId);
      for (const sortedId of sortedIds) resourceObject.commentChains.push(sortedId);
      elementObject.loadedComments = true;
    } catch (e) {
      if (e instanceof API.HTTPError && e.code > 400) {
        error = e.code < 500 ? "loggedOut" : "serverError";
        return;
      } else if (String(e).includes("NetworkError")) {
        error = "networkError";
        return;
      }
      console.error(e);
      error = String(e);
      hasCustomError = true;
    }
  }

  async function analyzeMessages(showAll = false) {
    const commentLocations = { 0: [], 1: [], 2: [] };
    let realMsgCount = msgCount - stMessages.length;
    const messagesToCheck = showAll ? messages.length : realMsgCount;
    showingMessagesAmt = messagesToCheck;
    for (const message of messages.slice(0, messagesToCheck)) {
      if (message.type === "followuser") {
        follows.push(message.actor_username);
      } else if (message.type === "curatorinvite") {
        studioInvites.push({ actor: message.actor_username, studioId: message.gallery_id, studioTitle: message.title });
      } else if (message.type === "becomeownerstudio") {
        studioPromotions.push({ actor: message.actor_username, studioId: message.gallery_id, studioTitle: message.gallery_title });
      } else if (message.type === "becomehoststudio") {
        studioHostTransfers.push({
          actorAdmin: message.admin_actor,
          actor: message.actor_username,
          studioId: message.gallery_id,
          studioTitle: message.gallery_title,
        });
      } else if (message.type === "forumpost") {
        if (!forumActivity.find((obj) => obj.topicId === message.topic_id)) {
          forumActivity.push({ topicId: message.topic_id, topicTitle: message.topic_title });
        }
      } else if (message.type === "remixproject") {
        remixes.push({ parentTitle: message.parent_title, actor: message.actor_username, projectId: message.project_id });
      } else if (message.type === "studioactivity") {
        const existing = studioActivity.find((obj) => obj.studioId === message.gallery_id);
        if (existing) existing.amount++;
        else studioActivity.push({ studioId: message.gallery_id, studioTitle: message.title, amount: 1 });
        studioActivityAmt++;
      } else if (message.type === "loveproject") {
        const projectObject = getProjectObject(message.project_id, message.title);
        projectObject.loveCount++;
        const findLover = projectObject.loversAndFavers.find((o) => o.username === message.actor_username);
        if (findLover) findLover.loved = true;
        else projectObject.loversAndFavers.push({ username: message.actor_username, loved: true, faved: false });
      } else if (message.type === "favoriteproject") {
        const projectObject = getProjectObject(message.project_id, message.project_title);
        projectObject.favoriteCount++;
        const findFaver = projectObject.loversAndFavers.find((o) => o.username === message.actor_username);
        if (findFaver) findFaver.faved = true;
        else projectObject.loversAndFavers.push({ username: message.actor_username, loved: false, faved: true });
      } else if (message.type === "addcomment") {
        const resourceId = message.comment_type === 1 ? message.comment_obj_title : message.comment_obj_id;
        let location = commentLocations[message.comment_type].find((obj) => obj.resourceId === resourceId);
        if (!location) {
          location = { resourceId, commentMessages: [] };
          commentLocations[message.comment_type].push(location);
        }
        location.commentMessages.push(message);
        let resourceObject;
        if (message.comment_type === 0) resourceObject = getProjectObject(resourceId, message.comment_obj_title);
        else if (message.comment_type === 1) resourceObject = getProfileObject(resourceId);
        else if (message.comment_type === 2) resourceObject = getStudioObject(resourceId, message.comment_obj_title);
        resourceObject.unreadComments++;
      } else if (message.type === "userjoin") {
        welcomeToScratch = true;
      }
    }
    messagesReady = true;

    const locationsToCheckAmt = commentLocations[0].length + commentLocations[1].length + commentLocations[2].length;
    let locationsChecked = 0;
    for (const profile of profilesOrdered) {
      const location = commentLocations[1].find((obj) => obj.resourceId === profile.username);
      if (location) {
        await checkCommentLocation("user", location.resourceId, location.commentMessages, profile);
        locationsChecked++;
        commentsProgress = Math.round((locationsChecked / locationsToCheckAmt) * 100);
      }
    }
    for (const studio of studios) {
      const location = commentLocations[2].find((obj) => obj.resourceId === studio.id);
      if (location) {
        await checkCommentLocation("gallery", location.resourceId, location.commentMessages, studio);
        locationsChecked++;
        commentsProgress = Math.round((locationsChecked / locationsToCheckAmt) * 100);
      }
    }
    for (const project of projectsOrdered) {
      const location = commentLocations[0].find((obj) => obj.resourceId === project.id);
      if (location) {
        await checkCommentLocation("project", location.resourceId, location.commentMessages, project);
        locationsChecked++;
        commentsProgress = Math.round((locationsChecked / locationsToCheckAmt) * 100);
      }
    }
    commentsReady = true;
  }

  function resetMessageState() {
    commentsReady = false;
    commentsProgress = 0;
    follows = [];
    studioInvites = [];
    studioPromotions = [];
    studioHostTransfers = [];
    forumActivity = [];
    studioActivity = [];
    studioActivityAmt = 0;
    remixes = [];
    profiles = [];
    studios = [];
    projects = [];
    welcomeToScratch = false;
  }

  function toggleShowAll() {
    showAllMessages = true;
    resetMessageState();
    analyzeMessages(true);
  }

  // HTML builders
  function studioInviteHTML(invite) {
    const { safeMsg } = ctx;
    const actor = `<a target="_blank" rel="noopener noreferrer" href="https://scratch.mit.edu/users/${invite.actor}/">${invite.actor}</a>`;
    const title = `<a target="_blank" rel="noopener noreferrer" href="https://scratch.mit.edu/studios/${invite.studioId}/curators/" style="text-decoration: underline">${escapeHTML(invite.studioTitle)}</a>`;
    return safeMsg("curate-invite", { actor, title });
  }
  function studioPromotionHTML(promotion) {
    const { safeMsg } = ctx;
    const actor = `<a target="_blank" rel="noopener noreferrer" href="https://scratch.mit.edu/users/${promotion.actor}/">${promotion.actor}</a>`;
    const title = `<a target="_blank" rel="noopener noreferrer" href="https://scratch.mit.edu/studios/${promotion.studioId}/curators/" style="text-decoration: underline">${escapeHTML(promotion.studioTitle)}</a>`;
    return safeMsg("studio-promotion", { actor, title });
  }
  function studioHostTransferHTML(promotion) {
    const { safeMsg } = ctx;
    const actor = promotion.actorAdmin
      ? safeMsg("st")
      : `<a target="_blank" rel="noopener noreferrer" href="https://scratch.mit.edu/users/${escapeHTML(promotion.actor)}/">${escapeHTML(promotion.actor)}</a>`;
    const title = `<a target="_blank" rel="noopener noreferrer" href="https://scratch.mit.edu/studios/${promotion.studioId}/" style="text-decoration: underline">${escapeHTML(promotion.studioTitle)}</a>`;
    return safeMsg("studio-host-transfer", { actor, title });
  }
  function forumHTML(forumTopic) {
    const { safeMsg } = ctx;
    const title = `<a target="_blank" rel="noopener noreferrer" href="https://scratch.mit.edu/discuss/topic/${forumTopic.topicId}/unread/" style="text-decoration: underline">${escapeHTML(forumTopic.topicTitle)}</a>`;
    return safeMsg("forum-new-post", { title });
  }
  function studioActivityHTML(studio) {
    const { safeMsg } = ctx;
    const title = `<a target="_blank" rel="noopener noreferrer" href="https://scratch.mit.edu/studios/${studio.studioId}/activity/" style="text-decoration: underline">${escapeHTML(studio.studioTitle)}</a>`;
    return safeMsg("new-activity", { title });
  }
  function remixHTML(remix) {
    const { msg, safeMsg } = ctx;
    const actor = `<a target="_blank" rel="noopener noreferrer" href="https://scratch.mit.edu/users/${remix.actor}/">${remix.actor}</a>`;
    const link = `<a target="_blank" rel="noopener noreferrer" href="https://scratch.mit.edu/projects/${remix.projectId}/" style="text-decoration: underline">${msg("remix-link")}</a>`;
    return safeMsg("remix-as", { actor, link, parentTitle: escapeHTML(remix.parentTitle) });
  }
  function othersProfile(uname) {
    return ctx.msg("others-profile", { username: uname });
  }
  function studioText(title) {
    return ctx.msg("studio", { title });
  }
  function projectLoversAndFavers(project) {
    const priorityOf = (obj) => (obj.loved && obj.faved ? 0 : obj.faved ? 1 : 2);
    return project.loversAndFavers.slice(0, 20).sort((a, b) => priorityOf(a) - priorityOf(b));
  }

  onMount(async () => {
    ctx = await createAddonContext(addonId);
    document.title = ctx.msg("popup-title");
    const fetched = await getData();
    if (fetched) await analyzeMessages();
  });
</script>

<svelte:head>
  <base target="_blank" />
  <link rel="stylesheet" href={chrome.runtime.getURL("webpages/styles/components/buttons.css")} />
  <link rel="stylesheet" href={chrome.runtime.getURL("webpages/styles/components/tooltips.css")} />
</svelte:head>

{#if ctx}
<div class="contents">
  {#if !error}
    {#if stMessages.length}
      <div class="message-type message-type-admin">
        <div class="message-type-title hover-reverse" onclick={() => (messageTypeExtended.stMessages = !messageTypeExtended.stMessages)}>
          <button class="btn-dropdown" type="button">
            <img src={chrome.runtime.getURL("images/icons/expand.svg")} alt="v" class:reverted={messageTypeExtended.stMessages} draggable="false" />
          </button>
          <span class="message-type-title-text">{uiMessages.stMessagesMsg}</span>
          <span class="float-right"><img class="small-icon" src={chrome.runtime.getURL("images/icons/notice.svg")} draggable="false" alt="" /> {stMessages.length}</span>
        </div>
        {#if messageTypeExtended.stMessages}
          <div class="message-type-details">
            {#each stMessages as alert (alert.id)}
              <div class="comment">
                <span class="comment-time">{alert.datetime_created}</span>
                <a class="delete-btn" tabindex="0" role="button" onclick={() => dismissAlert(alert.id)} onkeydown={(e) => e.key === "Enter" && dismissAlert(alert.id)}>{uiMessages.dismissMsg}</a>
                <!-- inline DOM element rendering -->
                <div class="dom-element-renderer" use:appendDom={alert.element}></div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    {#if follows.length}
      <div class="message-type">
        <div class="message-type-title hover-reverse" onclick={() => (messageTypeExtended.follows = !messageTypeExtended.follows)}>
          <button class="btn-dropdown" type="button">
            <img src={chrome.runtime.getURL("images/icons/expand.svg")} alt="v" class:reverted={messageTypeExtended.follows} draggable="false" />
          </button>
          <span class="message-type-title-text">{uiMessages.followsMsg}</span>
          <span class="float-right"><img class="small-icon" src={chrome.runtime.getURL("images/icons/follow.svg")} draggable="false" alt="" /> {follows.length}</span>
        </div>
        {#if messageTypeExtended.follows}
          <div class="message-type-details">
            <div class="username-list">
              {#each follows as follower (follower)}
                <a href={`https://scratch.mit.edu/users/${follower}/`}>{follower}</a>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/if}

    {#if studioInvites.length}
      <div class="message-type">
        <div class="message-type-title hover-reverse" onclick={() => (messageTypeExtended.studioInvites = !messageTypeExtended.studioInvites)}>
          <button class="btn-dropdown" type="button">
            <img src={chrome.runtime.getURL("images/icons/expand.svg")} alt="v" class:reverted={messageTypeExtended.studioInvites} draggable="false" />
          </button>
          <span class="message-type-title-text">{uiMessages.studioInvitesMsg}</span>
          <span class="float-right"><img class="small-icon" src={chrome.runtime.getURL("images/icons/studio-add.svg")} draggable="false" alt="" /> {studioInvites.length}</span>
        </div>
        {#if messageTypeExtended.studioInvites}
          <div class="message-type-details">
            {#each studioInvites as invite, i (i)}
              <div class="thread-list">{@html studioInviteHTML(invite)}</div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    {#if studioPromotions.length}
      <div class="message-type">
        <div class="message-type-title hover-reverse" onclick={() => (messageTypeExtended.studioPromotions = !messageTypeExtended.studioPromotions)}>
          <button class="btn-dropdown" type="button">
            <img src={chrome.runtime.getURL("images/icons/expand.svg")} alt="v" class:reverted={messageTypeExtended.studioPromotions} draggable="false" />
          </button>
          <span class="message-type-title-text">{uiMessages.studioPromotionsMsg}</span>
          <span class="float-right"><img class="small-icon" src={chrome.runtime.getURL("images/icons/adminusers.svg")} draggable="false" alt="" /> {studioPromotions.length}</span>
        </div>
        {#if messageTypeExtended.studioPromotions}
          <div class="message-type-details">
            {#each studioPromotions as p, i (i)}
              <div class="thread-list">{@html studioPromotionHTML(p)}</div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    {#if studioHostTransfers.length}
      <div class="message-type">
        <div class="message-type-title hover-reverse" onclick={() => (messageTypeExtended.studioHostTransfers = !messageTypeExtended.studioHostTransfers)}>
          <button class="btn-dropdown" type="button">
            <img src={chrome.runtime.getURL("images/icons/expand.svg")} alt="v" class:reverted={messageTypeExtended.studioHostTransfers} draggable="false" />
          </button>
          <span class="message-type-title-text">{uiMessages.studioHostTransfersMsg}</span>
          <span class="float-right"><img class="small-icon" src={chrome.runtime.getURL("images/icons/users.svg")} draggable="false" alt="" /> {studioHostTransfers.length}</span>
        </div>
        {#if messageTypeExtended.studioHostTransfers}
          <div class="message-type-details">
            {#each studioHostTransfers as transfer, i (i)}
              <div class="thread-list">{@html studioHostTransferHTML(transfer)}</div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    {#if forumActivity.length}
      <div class="message-type">
        <div class="message-type-title hover-reverse" onclick={() => (messageTypeExtended.forumActivity = !messageTypeExtended.forumActivity)}>
          <button class="btn-dropdown" type="button">
            <img src={chrome.runtime.getURL("images/icons/expand.svg")} alt="v" class:reverted={messageTypeExtended.forumActivity} draggable="false" />
          </button>
          <span class="message-type-title-text">{uiMessages.forumMsg}</span>
          <span class="float-right"><img class="small-icon" src={chrome.runtime.getURL("images/icons/forum.svg")} draggable="false" alt="" /> {forumActivity.length}</span>
        </div>
        {#if messageTypeExtended.forumActivity}
          <div class="message-type-details">
            {#each forumActivity as topic, i (i)}
              <div class="thread-list">{@html forumHTML(topic)}</div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    {#if studioActivity.length}
      <div class="message-type">
        <div class="message-type-title hover-reverse" onclick={() => (messageTypeExtended.studioActivity = !messageTypeExtended.studioActivity)}>
          <button class="btn-dropdown" type="button">
            <img src={chrome.runtime.getURL("images/icons/expand.svg")} alt="v" class:reverted={messageTypeExtended.studioActivity} draggable="false" />
          </button>
          <span class="message-type-title-text">{uiMessages.studioActivityMsg}</span>
          <span class="float-right"><img class="small-icon" src={chrome.runtime.getURL("images/icons/studio.svg")} draggable="false" alt="" /> {studioActivityAmt}</span>
        </div>
        {#if messageTypeExtended.studioActivity}
          <div class="message-type-details">
            {#each studioActivity as studio, i (i)}
              <div class="thread-list">
                {@html studioActivityHTML(studio)}
                {#if studio.amount > 1}<span>({studio.amount})</span>{/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    {#if remixes.length}
      <div class="message-type">
        <div class="message-type-title hover-reverse" onclick={() => (messageTypeExtended.remixes = !messageTypeExtended.remixes)}>
          <button class="btn-dropdown" type="button">
            <img src={chrome.runtime.getURL("images/icons/expand.svg")} alt="v" class:reverted={messageTypeExtended.remixes} draggable="false" />
          </button>
          <span class="message-type-title-text">{uiMessages.remixesMsg}</span>
          <span class="float-right"><img class="small-icon" src={chrome.runtime.getURL("images/icons/remix.svg")} draggable="false" alt="" /> {remixes.length}</span>
        </div>
        {#if messageTypeExtended.remixes}
          <div class="message-type-details">
            {#each remixes as remix, i (i)}
              <div class="thread-list">{@html remixHTML(remix)}</div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    {#each profilesOrdered as profile (profile.username)}
      {#if profile.unreadComments && profile.loadedComments}
        <div class="message-type">
          <div class="message-type-title">
            <a class="message-type-title-text nolink" rel="noreferrer noopener" target="_blank" href={`https://scratch.mit.edu/users/${profile.username}/`}>
              {#if profile.username === username}{uiMessages.yourProfileMsg}{:else}{othersProfile(profile.username)}{/if}
            </a>
            <span class="float-right">
              {#if profile.unreadComments}<span><img class="small-icon" src={chrome.runtime.getURL("images/icons/comment.svg")} draggable="false" alt="" /> {profile.unreadComments}</span>{/if}
            </span>
          </div>
          {#if profile.commentChains.length}
            <div class="message-type-details">
              {#each profile.commentChains as parentId (parentId)}
                <div class="comment-chain" class:unread={isCommentUnread(parentId)}>
                  <Comment commentId={parentId} commentsObj={comments} isParent={true} unread={false} resourceType="user" resourceId={profile.username} addon={ctx.addon} msg={ctx.msg} {username} {dateNow} {errorCodes} />
                  {#if comments[parentId]?.children}
                    {#each comments[parentId].children as childId (childId)}
                      <Comment commentId={childId} commentsObj={comments} isParent={false} unread={isCommentUnread(childId)} resourceType="user" resourceId={profile.username} addon={ctx.addon} msg={ctx.msg} {username} {dateNow} {errorCodes} />
                    {/each}
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    {/each}

    {#each studios as studio (studio.id)}
      {#if studio.unreadComments && studio.loadedComments}
        <div class="message-type">
          <div class="message-type-title">
            <a class="message-type-title-text nolink" rel="noopener noreferrer" target="_blank" href={`https://scratch.mit.edu/studios/${studio.id}/`}>{studioText(studio.title)}</a>
            <span class="float-right">
              {#if studio.unreadComments}<span><img class="small-icon" src={chrome.runtime.getURL("images/icons/comment.svg")} draggable="false" alt="" /> {studio.unreadComments}</span>{/if}
            </span>
          </div>
          {#if studio.commentChains.length}
            <div class="message-type-details">
              {#each studio.commentChains as parentId (parentId)}
                <div class="comment-chain" class:unread={isCommentUnread(parentId)}>
                  <Comment commentId={parentId} commentsObj={comments} isParent={true} unread={false} resourceType="gallery" resourceId={studio.id} addon={ctx.addon} msg={ctx.msg} {username} {dateNow} {errorCodes} />
                  {#if comments[parentId]?.children}
                    {#each comments[parentId].children as childId (childId)}
                      <Comment commentId={childId} commentsObj={comments} isParent={false} unread={isCommentUnread(childId)} resourceType="gallery" resourceId={studio.id} addon={ctx.addon} msg={ctx.msg} {username} {dateNow} {errorCodes} />
                    {/each}
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    {/each}

    {#each projectsOrdered as project, i (project.id)}
      {#if (project.unreadComments && project.loadedComments) || (!project.unreadComments && commentsReady)}
        <div class="message-type">
          <div class="message-type-title" style:zIndex={9999 - i}>
            <a class="message-type-title-text nolink" target="_blank" rel="noopener noreferrer" href={`https://scratch.mit.edu/projects/${project.id}/`}>{project.title}</a>
            <span class="float-right">
              {#if project.loveCount || project.favoriteCount}
                <div class="tooltip" tabindex="0">
                  <span class="tooltip-indicator">
                    {#if project.loveCount}<span><img class="small-icon colored" src={chrome.runtime.getURL("images/icons/heart.svg")} draggable="false" alt="" /> {project.loveCount}</span>{/if}
                    {#if project.favoriteCount}<span><img class="small-icon colored" src={chrome.runtime.getURL("images/icons/star.svg")} draggable="false" alt="" /> {project.favoriteCount}</span>{/if}
                  </span>
                  <div class="tooltiptext tooltiptextleft">
                    {#each projectLoversAndFavers(project) as person, idx (person.username + idx)}
                      <div>
                        {#if person.loved}<img class="small-icon colored" src={chrome.runtime.getURL("images/icons/heart.svg")} draggable="false" alt="" />{/if}
                        {#if person.faved}<img class="small-icon colored" src={chrome.runtime.getURL("images/icons/star.svg")} draggable="false" alt="" />{/if}
                        <a href={`https://scratch.mit.edu/users/${person.username}/`}>{person.username}</a>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
              {#if project.unreadComments}<span><img class="small-icon" src={chrome.runtime.getURL("images/icons/comment.svg")} draggable="false" alt="" /> {project.unreadComments}</span>{/if}
            </span>
          </div>
          {#if project.commentChains.length}
            <div class="message-type-details">
              {#each project.commentChains as parentId (parentId)}
                <div class="comment-chain" class:unread={isCommentUnread(parentId)}>
                  <Comment commentId={parentId} commentsObj={comments} isParent={true} unread={false} resourceType="project" resourceId={project.id} addon={ctx.addon} msg={ctx.msg} {username} {dateNow} {errorCodes} />
                  {#if comments[parentId]?.children}
                    {#each comments[parentId].children as childId (childId)}
                      <Comment commentId={childId} commentsObj={comments} isParent={false} unread={isCommentUnread(childId)} resourceType="project" resourceId={project.id} addon={ctx.addon} msg={ctx.msg} {username} {dateNow} {errorCodes} />
                    {/each}
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    {/each}

    {#if welcomeToScratch}
      <div class="message-type">
        <div class="message-type-details welcome-message">{uiMessages.welcomeToScratchMsg}</div>
      </div>
    {/if}
  {/if}

  <div class="status-container">
    {#if error === "notReady"}<p>{uiMessages.loadingMsg}</p>{/if}
    {#if error === "loggedOut"}
      <p>{uiMessages.loggedOutMsg} <a href="https://scratch.mit.edu/login">{uiMessages.loggedOutLinkMsg}</a></p>
    {/if}
    {#if error === "serverError"}<p>{uiMessages.serverErrorMsg}</p>{/if}
    {#if error === "networkError"}<p>{uiMessages.networkErrorMsg}</p>{/if}
    {#if messagesReady && !commentsReady}<p>{uiMessages.loadingCommentsMsg}</p>{/if}
    {#if hasCustomError}
      <p>
        {uiMessages.unknownFatalErrorMsg}
        <a target="_blank" href={feedbackUrl} rel="noopener noreferrer">{uiMessages.reportBugMsg}</a>
        <br />
        <code class="error-message">{error}</code>
        (<a onclick={() => copyToClipboard(error)} role="button" tabindex="0">{uiMessages.copyMsg}</a>)
      </p>
    {/if}
    {#if messagesReady && showingMessagesAmt === 0 && stMessages.length === 0}
      <span class="status-empty">{uiMessages.noUnreadMsg}</span>
    {/if}
    {#if commentsReady || canShowMoreMessages}
      <div class="buttons-container">
        {#if commentsReady}
          <button type="button" onclick={reloadPage} class="large-button">
            <img class="small-icon" src={chrome.runtime.getURL("images/icons/reload.svg")} draggable="false" alt="" /><span>{uiMessages.reloadMsg}</span>
          </button>
        {/if}
        {#if canShowMoreMessages}
          <button type="button" onclick={toggleShowAll} class="large-button">
            <img class="small-icon" src={chrome.runtime.getURL("images/icons/plus.svg")} draggable="false" alt="" /><span>{uiMessages.showMoreMsg}</span>
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<div id="bottom-bar">
  {#if !markedAsRead}
    <a tabindex="0" role="button" onclick={markAsRead} onkeydown={(e) => e.key === "Enter" && markAsRead()}>{uiMessages.markAsReadMsg}</a>
  {:else}
    <span class="marked-as-read"><img class="small-icon" src={chrome.runtime.getURL("images/icons/read.svg")} draggable="false" alt="" /> {uiMessages.markedAsReadMsg}</span>
  {/if}
  <span class="separator"></span>
  <a href="https://scratch.mit.edu/messages" class="nolink open-messages">{uiMessages.openMessagesMsg}<img src={chrome.runtime.getURL("images/icons/popout.svg")} class="popout" draggable="false" alt="" /></a>
</div>
{/if}

<style>
  button {
    overflow: hidden;
  }
  .contents {
    max-height: calc(100vh - 32px);
    max-height: calc(100svh - 32px);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--gray-text) transparent;
  }
  .btn-dropdown {
    display: flex;
    align-items: center;
    padding: 4px;
    border-radius: 4px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .message-type-title:hover .btn-dropdown {
    background: var(--hover-highlight);
  }
  :global(.reverted) { transform: rotate(180deg); }
  .btn-dropdown :global(img) { height: 24px; filter: var(--content-icon-filter); }
  .message-type {
    border-radius: 4px;
    border: 1px solid var(--content-border);
    background: var(--content-background);
    margin: 10px;
    box-shadow: var(--content-shadow);
  }
  .message-type-admin { border-color: var(--orange); }
  .message-type-title { font-size: 14px; padding: 6px; padding-inline-end: 9px; cursor: default; display: flex; align-items: center; user-select: none; }
  @media (min-width: 700px) { .message-type-title { padding: 10px; padding-inline-end: 12px; } }
  .message-type-title:not(.hover-reverse) {
    position: sticky; top: 0; background: inherit; z-index: 999;
    border-bottom: 1px solid var(--content-border);
    border-top-left-radius: 3px; border-top-right-radius: 3px;
  }
  .message-type-title:not(.hover-reverse) .message-type-title-text { margin-inline-start: 10px; }
  .thread-list, .username-list { color: var(--description-text); font-size: 14px; -moz-text-size-adjust: none; padding-inline: 16px; }
  @media (min-width: 700px) { .thread-list, .username-list { padding-inline: 20px; } }
  .thread-list { padding-bottom: 20px; overflow-wrap: break-word; }
  .thread-list:first-child, .username-list { padding-top: 5px; }
  .thread-list:last-child, .username-list { padding-bottom: 16px; }
  .username-list > :global(a) { display: inline-block; margin-inline-end: 10px; }
  .hover-reverse { cursor: pointer; }
  .small-icon { height: 16px; vertical-align: text-bottom; }
  .small-icon:not(.colored) { filter: var(--content-icon-filter); }
  button > .small-icon { margin-inline-start: -2px; margin-inline-end: 6px; vertical-align: middle; }
  .message-type-title-text { white-space: nowrap; text-overflow: ellipsis; overflow: hidden; margin-inline-end: auto; margin-inline-start: 6px; }
  @media (min-width: 700px) { .message-type-title-text { margin-inline-start: 10px; } }
  .float-right { margin-inline-start: 6px; white-space: nowrap; font-size: 14px; }
  .float-right > :global(span) { display: inline-block; margin-inline-start: 6px; }
  .float-right > :global(div) { display: inline-block; }
  .tooltip { padding-inline-start: 10px; }
  .welcome-message { padding: 6px 16px; }
  .status-container { padding-top: 10px; padding-bottom: 20px; font-size: 1rem; font-weight: 500; text-align: center; }
  .status-container :global(p), .status-empty { display: block; margin-block: 10px; user-select: none; }
  .buttons-container { display: flex; justify-content: center; flex-wrap: wrap; }
  .buttons-container > :global(button + button) { margin-inline-start: 10px; }
  #bottom-bar { position: absolute; z-index: 10000; bottom: 0; left: 0; right: 0; background: var(--content-background); border-top: 1px solid var(--content-border); font-size: 14px; text-align: center; box-shadow: var(--content-shadow); line-height: 15px; min-height: 31px; display: flex; align-items: stretch; justify-content: center; user-select: none; }
  #bottom-bar > :global(*) { margin: 8px 0; }
  #bottom-bar > :global(a) { font-weight: var(--brand-orange-min-font-weight); }
  #bottom-bar > :global(a:hover) { color: var(--brand-orange); text-decoration: none; }
  #bottom-bar .separator { margin: auto 8px; height: 15px; padding: 0; border-left: 1px solid var(--content-separator); }
  .marked-as-read { font-weight: bold; }
  .popout { height: 12px; vertical-align: -1px; margin-inline-start: 5px; opacity: 0.6; filter: var(--content-icon-filter); }
  :global([dir="rtl"]) .popout { transform: scaleX(-1); }
  .open-messages { color: inherit; }
  .open-messages:hover .popout { opacity: 1; filter: none; }
  .dom-element-renderer { display: contents; }
</style>

