<script>
  import { onMount } from "svelte";
  import { createAddonContext } from "$lib/embedded-popup-loader.js";
  import { HTTPError } from "../../../../libraries/common/message-cache.js";

  let { addonId } = $props();

  let ctx = $state(null);
  let displayedGames = $state([]);

  let projects = $state([]);
  let projectsVisible = $state(false);
  let projectsChecked = $state(0);
  let error = $state(null);
  let selectedTabUrl = $state(null);
  let selectedTabId = $state(null);
  let addButtonUsed = $state(false);

  const getRegex = () => /^(?:(?:https?:\/\/scratch\.mit\.edu\/)?(project|studio)s\/)?(\d+)/;

  const extractUrl = (url) => {
    if (!url) return {};
    const match = url.match(getRegex());
    if (!match) return {};
    const type = match[1] || "project";
    const id = match[2];
    if (isNaN(id)) return {};
    return { id: +id, type };
  };

  async function studioStrategy(studioId) {
    let res;
    try {
      res = await fetch(`https://api.scratch.mit.edu/studios/${studioId}/projects/?limit=40`);
    } catch (e) {
      console.warn("Error when fetching studio: ", e);
      throw new HTTPError(`Error when fetching studio: ${e}`, 500);
    }
    if (res.status >= 400) {
      console.warn("Error when fetching studio: ", res.status);
      throw HTTPError.fromResponse("Error when fetching studio", res);
    }
    return res.json().catch((exc) => {
      console.warn("Error when fetching studio JSON: ", exc);
      throw exc;
    });
  }

  async function strategy(addon, games) {
    const fetched = await Promise.all(
      games.map(async ({ id, type }) => {
        if (!id) return;
        if (type === "studio") return await studioStrategy(id);
        let res;
        try {
          res = await fetch(`https://api.scratch.mit.edu/projects/${id}`);
        } catch (e) {
          console.warn("Error when fetching project: ", e);
          return null;
        }
        if (res.status >= 400) {
          console.warn("Error when fetching project: ", res.status);
          return null;
        }
        return res.json().catch((exc) => {
          console.warn("Error when fetching project JSON: ", exc);
          return null;
        });
      })
    );
    const flat = fetched.flat();
    const filtered = [];
    const knownIds = new Set();
    for (const project of flat) {
      if (!project || knownIds.has(project.id)) continue;
      knownIds.add(project.id);
      filtered.push(project);
    }
    return filtered;
  }

  const messages = $derived.by(() => {
    if (!ctx) return {};
    const { msg } = ctx;
    return {
      loadingMsg: msg("loading"),
      noUsersMsg: msg("no-users"),
      addProject: msg("add-project"),
      addProjectDescription: msg("add-project-desc"),
      addStudio: msg("add-studio"),
      addStudioDescription: msg("add-studio-desc"),
      added: msg("added"),
      changeDisplay2: msg("change-display-2"),
    };
  });

  const projectsSorted = $derived(
    projects.slice().sort((a, b) => {
      if (a.id === b.id) return 0;
      if (a.id === selectedTabId) return -1;
      if (b.id === selectedTabId) return 1;
      if (a.online && !b.online) return -1;
      if (b.online && !a.online) return 1;
      if (a.amt !== b.amt) return b.amt - a.amt;
      return b.timestamp - a.timestamp;
    })
  );

  const errorMessage = $derived(ctx && error ? ctx.msg(error) : "");

  const addButtonType = $derived.by(() => {
    if (projects.length === 0 && error !== "no-projects") return null;
    if (projectsChecked !== projects.length) return null;
    const { id, type } = extractUrl(selectedTabUrl);
    if (!id || projects.some((el) => el.id === id)) return null;
    return type;
  });

  const clickButtonToAddDisplayMessage = $derived.by(() => {
    if (!ctx || !addButtonType) return "";
    return ctx.msg("change-display-open", { buttonName: ctx.msg(`add-${addButtonType}`) });
  });

  function settingsHTML() {
    if (!ctx) return "";
    const link = document.createElement("a");
    link.target = "_blank";
    link.href = chrome.runtime.getURL("/webpages/settings/index.html#addon-cloud-games");
    link.textContent = ctx.msg("addon-settings");
    return ctx.safeMsg("change-display", { settings: link.outerHTML });
  }

  function addFromSelectedTab() {
    if (!ctx) return;
    addButtonUsed = true;
    const { id, type } = extractUrl(selectedTabUrl);
    const url = `https://scratch.mit.edu/${type}s/${id}`;
    ctx.addon.popup.changeSettings({
      displayedGames: [...ctx.addon.settings.get("displayedGames"), { url }],
    });
    setTimeout(() => location.reload(), 1500);
  }

  function setCloudDataForProject(projectObject, i) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const handle = () => {
          projectsChecked++;
          if (projectsChecked / projects.length > 0.5) projectsVisible = true;
          resolve();
        };
        let username = await ctx.addon.auth.fetchUsername();
        let json;
        try {
          const res = await fetch(
            `https://clouddata.scratch.mit.edu/logs?projectid=${projectObject.id}&limit=40&offset=0`
          );
          if (res.status >= 400) {
            if (res.status >= 500) projectObject.errorMessage = ctx.msg("server-error");
            throw HTTPError.fromResponse(`Error when fetching cloud data for ${projectObject.id}`, res);
          }
          json = await res.json();
        } catch (exc) {
          console.warn("Error when fetching cloud data", exc);
          projectObject.error = ctx.msg("fetch-error");
          if (!projectObject.errorMessage) projectObject.errorMessage = String(exc);
          handle();
          return;
        }
        const dateNow = Date.now();
        const usersSet = new Set();
        projectObject.online = false;
        for (const varChange of json) {
          if (dateNow - varChange.timestamp > 60000) break;
          if (varChange.user === username) projectObject.online = true;
          usersSet.add(varChange.user);
        }
        projectObject.timestamp = json[0]?.timestamp || 0;
        projectObject.amt = usersSet.size;
        projectObject.users = Array.from(usersSet);
        handle();
      }, i * 125);
    });
  }

  onMount(async () => {
    ctx = await createAddonContext(addonId);
    if (typeof document !== "undefined") document.title = ctx.msg("popup-title");

    displayedGames = ctx.addon.settings
      .get("displayedGames")
      .map(({ url }) => url)
      .map(extractUrl);

    ctx.addon.popup.getSelectedTabUrl().then((url) => {
      selectedTabUrl = url;
      const { id } = extractUrl(url);
      selectedTabId = id;
    });

    let fetched;
    try {
      fetched = await strategy(ctx.addon, displayedGames);
    } catch (e) {
      if (e instanceof HTTPError) {
        const code = e.code;
        if (code >= 500) error = "server-error";
        else if (code >= 400) error = "general-error";
        return;
      }
      throw e;
    }
    if (fetched.length === 0) {
      error = "no-projects";
      return;
    }
    projects = fetched
      .map((project) => ({
        title: project.title,
        id: project.id,
        amt: 0,
        users: [],
        online: project.online,
        extended: true,
        error: null,
        errorMessage: "",
        timestamp: 0,
      }))
      .reverse();
    await Promise.all(projects.map((project, i) => setCloudDataForProject(project, i)));
  });

  const loadingVisible = $derived(!error && (projects.length === 0 || projects.length !== projectsChecked));
</script>

<svelte:head>
  <link rel="stylesheet" href={chrome.runtime.getURL("webpages/styles/components/buttons.css")} />
</svelte:head>

{#if loadingVisible}
  <div class="loading">
    {messages.loadingMsg ?? ""}
    <div class="loading-progress" style:width={`${(100 * projectsChecked) / Math.max(projects.length, 1) || 0}%`}></div>
  </div>
{/if}

{#if error}
  <div class="error">
    {errorMessage}
    {#if error !== "server-error"}
      <span>{@html settingsHTML()}</span>
    {/if}
    {#if error !== "server-error"}
      <div>
        {#if addButtonType}
          <p>{clickButtonToAddDisplayMessage}</p>
        {:else}
          <p>{messages.changeDisplay2}</p>
        {/if}
      </div>
    {/if}
  </div>
{/if}

{#if addButtonType}
  <div class="add-button">
    <button
      type="button"
      onclick={addFromSelectedTab}
      disabled={addButtonUsed}
      class="large-button"
      title={addButtonUsed ? "" : addButtonType === "project" ? messages.addProjectDescription : messages.addStudioDescription}
    >
      {#if !addButtonUsed}
        <span>
          <img class="small-icon" src={chrome.runtime.getURL("images/icons/plus.svg")} draggable="false" alt="" />
          <span>{addButtonType === "project" ? messages.addProject : messages.addStudio}</span>
        </span>
      {:else}
        <span>
          <img class="small-icon" src={chrome.runtime.getURL("images/icons/check.svg")} draggable="false" alt="" />
          <span>{messages.added}</span>
        </span>
      {/if}
    </button>
  </div>
{/if}

{#if projectsVisible}
  <div>
    {#each projectsSorted as project (project.id)}
      <div class="game" class:opened={project.id === selectedTabId}>
        <div class="title">
          <a class="project-name nolink" href={`https://scratch.mit.edu/projects/${project.id}`} target="_blank">{project.title}</a>
          <span class="float-right">
            <img class="small-icon" src={chrome.runtime.getURL("images/icons/users.svg")} draggable="false" alt="" />
            {project.error ? "?" : project.amt}
          </span>
        </div>
        <div class="project-details">
          {#if project.error}
            <div class="username-list">
              {project.error}<code style:display={project.errorMessage ? "" : "none"}> {project.errorMessage}</code>
            </div>
          {:else if project.amt === 0}
            <div class="username-list">{messages.noUsersMsg}</div>
          {:else}
            <div class="username-list">
              {#each project.users as user (user)}
                <a href={`https://scratch.mit.edu/users/${user}`} target="_blank" class="nolink">{user}</a>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
{:else}
  <div>
    {#each new Array(Math.max(Math.floor(projects.length / 2), 1)) as _, i (i)}
      <div class="game">
        <div class="title"><span class="title-placeholder"></span><br /></div>
        <div class="project-details"></div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .loading {
    position: fixed;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 20px;
    overflow: hidden;
    background-color: var(--tooltip-background);
    border-radius: 10px;
    box-shadow: var(--large-shadow);
    font-weight: 500;
    user-select: none;
    z-index: 10;
  }
  .loading-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 4px;
    background-color: var(--brand-orange);
  }
  .error {
    text-align: center;
    font-size: 1rem;
    padding-top: 20px;
    font-weight: 500;
    margin: 0 2rem;
    user-select: none;
  }
  .title {
    font-size: 14px;
    color: var(--content-text);
    padding: 6px 8px;
    cursor: default;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--content-border);
    user-select: none;
  }
  .project-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-inline-end: auto;
  }
  .float-right {
    white-space: nowrap;
    font-size: 14px;
  }
  .project-details {
    padding: 8px;
    color: var(--description-text);
    font-size: 14px;
    -moz-text-size-adjust: none;
  }
  .username-list > :global(a) {
    display: inline-block;
    margin-inline-end: 10px;
    color: var(--blue-text);
  }
  .game {
    border-radius: 4px;
    border: 1px solid var(--content-border);
    background: var(--content-background);
    margin: 10px;
    box-shadow: var(--content-shadow);
  }
  .title-placeholder {
    display: inline-block;
    vertical-align: middle;
    width: 150px;
    height: 8px;
    background-color: var(--gray-text);
    border-radius: 3px;
  }
  .small-icon {
    height: 16px;
    vertical-align: text-bottom;
    filter: var(--content-icon-filter);
  }
  .add-button {
    text-align: center;
    padding-top: 0.5rem;
  }
  .add-button :global(.large-button) {
    display: inline-flex;
  }
  .opened {
    border: 1px solid var(--blue-variant);
  }
  .opened .title {
    background: var(--blue);
    border-color: var(--blue-variant);
  }
</style>
