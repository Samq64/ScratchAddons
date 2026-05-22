<script>
  import { onMount, tick } from "svelte";
  import DomElementRenderer from "./DomElementRenderer.svelte";
  import * as API from "../../../../popups/scratch-messaging/api.js";
  import fixCommentContent from "../../../../popups/scratch-messaging/fix-comment-content.js";

  let {
    commentId,
    commentsObj,
    isParent,
    unread,
    resourceType,
    resourceId,
    addon,
    msg,
    username,
    dateNow,
    errorCodes,
  } = $props();

  let replying = $state(false);
  let replyBoxValue = $state("");
  let deleted = $state(false);
  let deleting = $state(false);
  let deleteStep = $state(0);
  let postingComment = $state(false);
  let textareaEl = $state(null);

  const messages = {
    openNewTabMsg: msg("open-new-tab"),
    deleteMsg: msg("delete"),
    deleteConfirmMsg: msg("delete-confirm"),
    replyMsg: msg("reply"),
    postingMsg: msg("posting"),
    postMsg: msg("post"),
    cancelMsg: msg("cancel"),
    deletedMsg: msg("deleted"),
    deletingMsg: msg("deleting"),
  };

  const thisComment = $derived(commentsObj[commentId]);
  const replyBoxLeftMsg = $derived(msg("chars-left", { num: 500 - replyBoxValue.length }));

  const canDeleteComment = $derived.by(() => {
    switch (resourceType) {
      case "user":
        return resourceId === username;
      case "project":
        return thisComment?.projectAuthor === username;
      default:
        return true;
    }
  });

  const commentTimeAgo = $derived.by(() => {
    if (!thisComment) return "";
    const timeFormatter = new Intl.RelativeTimeFormat(msg.locale, {
      localeMatcher: "best fit",
      numeric: "auto",
      style: "short",
    });
    const commentTimestamp = new Date(thisComment.date).getTime();
    const timeDiffSeconds = (dateNow - commentTimestamp) / 1000;
    let options;
    if (timeDiffSeconds < 60) return timeFormatter.format(0, "second");
    else if (timeDiffSeconds < 3600) options = { unit: "minute", divideBy: 60 };
    else if (timeDiffSeconds < 86400) options = { unit: "hour", divideBy: 60 * 60 };
    else options = { unit: "day", divideBy: 60 * 60 * 24 };
    return timeFormatter.format(-Math.round(timeDiffSeconds / options.divideBy), options.unit);
  });

  const commentURL = $derived.by(() => {
    const urlPath = resourceType === "user" ? "users" : resourceType === "gallery" ? "studios" : "projects";
    const commentPath = resourceType === "gallery" ? "comments/" : "";
    return `https://scratch.mit.edu/${urlPath}/${resourceId}/${commentPath}#comments-${commentId.substring(2)}`;
  });

  $effect(() => {
    if (replying && textareaEl) {
      textareaEl.focus();
    }
  });

  function startReply() {
    replying = true;
  }

  function cancelReply() {
    replying = false;
  }

  function onTextareaKey(e) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      postComment();
    }
  }

  function postComment() {
    const removeReiteratedChars = (s) =>
      s.split("").filter((c, i, arr) => (i === 0 ? true : arr[i - 1] !== c)).join("");
    const shouldCaptureComment = (value) => {
      const limited = removeReiteratedChars(value.toLowerCase().match(/[a-z]+/g)?.join("") || "");
      return limited.includes("scratchadon");
    };
    if (shouldCaptureComment(replyBoxValue)) {
      alert(chrome.i18n.getMessage("captureCommentError", [chrome.i18n.getMessage("captureCommentPolicy")]));
      return;
    }
    postingComment = true;
    const parent_pseudo_id = isParent ? commentId : thisComment.childOf;
    const parent_id = Number(parent_pseudo_id.substring(2));
    Promise.all([
      addon.auth.fetchUsername(),
      addon.auth.fetchUserId(),
      API.sendComment(addon, {
        resourceType,
        resourceId,
        content: replyBoxValue,
        parentId: parent_id,
        commenteeId: thisComment.authorId,
      }),
      addon.self.getEnabledAddons(),
    ])
      .then(([uname, userId, { id, content }, enabledAddons]) => {
        replying = false;
        let domContent = fixCommentContent(content, enabledAddons);
        if (resourceType !== "user") {
          const newElement = document.createElement("div");
          newElement.append(
            Object.assign(document.createElement("a"), {
              href: `https://scratch.mit.edu/users/${thisComment.author}`,
              textContent: "@" + thisComment.author,
            })
          );
          newElement.append(" ");
          newElement.append(...domContent.childNodes);
          domContent = newElement;
        }
        const newCommentPseudoId = `${resourceType[0]}_${id}`;
        commentsObj[newCommentPseudoId] = {
          author: uname,
          authorId: userId,
          content: domContent,
          date: new Date().toISOString(),
          children: null,
          childOf: parent_pseudo_id,
          projectAuthor: thisComment.projectAuthor,
        };
        if (commentsObj[parent_pseudo_id].children) {
          commentsObj[parent_pseudo_id].children.push(newCommentPseudoId);
        } else {
          commentsObj[parent_pseudo_id].children = [newCommentPseudoId];
        }
        replyBoxValue = "";
      })
      .catch((e) => {
        let errorMsg;
        if (e instanceof API.DetailedError) {
          if (e.details.muteStatus) {
            errorMsg = msg("comment-mute") + " ";
            errorMsg += msg("comment-cannot-post-for", {
              mins: Math.max(Math.ceil((e.details.muteStatus.muteExpiresAt - Date.now() / 1000) / 60), 1),
            });
          } else {
            errorMsg = msg(errorCodes[e.details?.error] || "send-error");
          }
        } else if (e instanceof API.HTTPError) {
          errorMsg = msg(errorCodes[e.code] || "send-error");
        } else {
          errorMsg = e.toString();
        }
        alert(errorMsg);
      })
      .finally(() => {
        postingComment = false;
      });
  }

  function deleteComment() {
    if (deleteStep === 0) {
      setTimeout(() => (deleteStep = 1), 250);
      setTimeout(() => {
        if (deleteStep === 1) deleteStep = 0;
      }, 5000);
      return;
    }
    deleted = true;
    deleting = true;
    API.deleteComment(addon, {
      resourceType,
      resourceId,
      commentId: Number(commentId.substring(2)),
    })
      .then(() => {
        if (isParent) thisComment.children = [];
      })
      .catch((e) => {
        console.error("Error while deleting a comment: ", e);
        alert(msg("delete-error"));
        deleteStep = 0;
        deleted = false;
      })
      .finally(() => {
        deleting = false;
      });
  }
</script>

{#if thisComment}
  <div
    class="comment"
    class:child-comment={!isParent}
    class:unread
    class:comment-me={thisComment.author === username}
  >
    <a
      class="comment-author"
      rel="noopener noreferrer"
      target="_blank"
      href={`https://scratch.mit.edu/users/${thisComment.author}/`}
    >{thisComment.author}</a>{thisComment.scratchTeam ? "*" : ""}
    {#if deleteStep !== 1 && !deleted}
      <span class="comment-time">
        · {commentTimeAgo}
        <a rel="noopener noreferrer" target="_blank" href={commentURL}>
          <img
            src={chrome.runtime.getURL("images/icons/popout.svg")}
            class="popout-comment"
            title={messages.openNewTabMsg}
            draggable="false"
            alt=""
          />
        </a>
      </span>
    {/if}
    {#if !deleted && canDeleteComment}
      <a
        onclick={deleteComment}
        onkeydown={(e) => e.key === "Enter" && deleteComment()}
        tabindex="0"
        role="button"
        class="delete-btn"
        class:delete-confirm={deleteStep === 1}
      >{deleteStep === 0 ? messages.deleteMsg : messages.deleteConfirmMsg}</a>
    {/if}
    <bdo dir="ltr">
      <div class="comment-content" class:comment-self={thisComment.author === username}>
        <div class="comment-content-text">
          {#if deleting}<span>{messages.deletingMsg}</span>{/if}
          {#if deleted && !deleting}<span>{messages.deletedMsg}</span>{/if}
          {#if !deleted}
            <DomElementRenderer element={thisComment.content} />
          {/if}
        </div>
        {#if !deleted}
          <a
            class="reply-button-comment"
            class:replying
            style:visibility={replying ? "hidden" : "visible"}
            tabindex="0"
            role="button"
            onclick={startReply}
            onkeydown={(e) => e.key === "Enter" && startReply()}
          >{messages.replyMsg}</a>
        {/if}
      </div>
    </bdo>
    {#if replying}
      <div class="reply-box-comment">
        <textarea
          bind:this={textareaEl}
          class="reply-textarea"
          maxlength="500"
          bind:value={replyBoxValue}
          onkeyup={onTextareaKey}
        ></textarea>
        <div class="reply-box-buttons">
          <button type="button" onclick={postComment} class="large-button post-button" disabled={postingComment}>
            {postingComment ? messages.postingMsg : messages.postMsg}
          </button>
          {#if !postingComment}
            <button type="button" onclick={cancelReply} class="large-button">
              {messages.cancelMsg}
            </button>
          {/if}
          <span class="comment-chars"> {replyBoxLeftMsg}</span>
        </div>
      </div>
    {/if}
  </div>
{/if}
