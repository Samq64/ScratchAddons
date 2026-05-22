<script>
  import { onMount } from "svelte";
  import EmbeddedSettings from "$lib/embedded-popups/EmbeddedSettings.svelte";
  import CloudGames from "$lib/embedded-popups/cloud-games/CloudGames.svelte";
  import ScratchMessaging from "$lib/embedded-popups/scratch-messaging/ScratchMessaging.svelte";
  import { msg, manifest, sendMessage } from "$lib/chrome-utils.js";

  // Order takes precedence (lower = earlier tab)
  const TAB_ORDER = ["__settings__", "scratch-messaging", "cloud-games"];

  // Registry of built-in embedded popup components, keyed by addonId.
  const EMBEDDED_COMPONENTS = {
    "cloud-games": CloudGames,
    "scratch-messaging": ScratchMessaging,
  };

  let popups = $state([]);
  let currentPopupId = $state(null);
  let mountedPopupIds = $state(new Set()); // popups that have been opened (kept mounted)
  let manifests = null;

  const currentPopup = $derived(popups.find((p) => p._addonId === currentPopupId));

  const version = $derived.by(() => {
    const m = manifest();
    const prerelease = m.version_name.includes("-prerelease");
    return prerelease ? m.version + "-pre" : m.version;
  });

  const changelogLink = $derived.by(() => {
    const uiLanguage = chrome.i18n.getUILanguage();
    const localeSlash = uiLanguage.startsWith("en") ? "" : `${uiLanguage.split("-")[0]}/`;
    const m = manifest();
    const utm = `utm_source=extension&utm_medium=popup&utm_campaign=v${m.version}`;
    return `https://scratchaddons.com/${localeSlash}changelog/?${utm}#v${m.version}`;
  });

  function calculatePopupSize() {
    if (!window.innerWidth || !window.innerHeight) {
      requestAnimationFrame(calculatePopupSize);
      return;
    }
    document.documentElement.style.setProperty("--width", `${window.innerWidth}px`);
    document.documentElement.style.setProperty("--height", `${window.innerHeight}px`);
    document.body.classList.remove("loading");
  }

  function closePopup() {
    setTimeout(() => window.close(), 100);
  }

  function openSettingsPage() {
    chrome.runtime.openOptionsPage();
    closePopup();
  }

  function setPopup(popup) {
    if (currentPopupId === popup._addonId) return;
    currentPopupId = popup._addonId;
    chrome.storage.local.set({ lastSelectedPopup: popup._addonId });
    mountedPopupIds = new Set([...mountedPopupIds, popup._addonId]);
  }

  function openInNewTab(popup) {
    if (popup._addonId === "__settings__") {
      // Settings has its own standalone page
      chrome.tabs.create({ url: chrome.runtime.getURL("webpages/settings/index.html") });
    } else {
      chrome.tabs.create({
        url: chrome.runtime.getURL(`webpages/popups/index.html?id=${encodeURIComponent(popup._addonId)}`),
      });
    }
    closePopup();
  }

  function sortPopups(arr) {
    return arr.slice().sort((b, a) => TAB_ORDER.indexOf(b._addonId) - TAB_ORDER.indexOf(a._addonId));
  }

  function loadPopupsFromManifests(res) {
    manifests = res.manifests;
    const popupObjects = Object.keys(res.addonsEnabled)
      .filter((addonId) => res.addonsEnabled[addonId] === true)
      .map((addonId) => manifests.find((addon) => addon.addonId === addonId))
      .filter((findManifest) => findManifest !== undefined)
      .filter(({ manifest }) => manifest.popup)
      .map(({ addonId, manifest }) => ({
        ...manifest.popup,
        _addonId: addonId,
        fullscreen: manifest.popup.fullscreen,
      }));
    popupObjects.push({
      name: msg("quickSettings"),
      icon: "../../images/icons/wrench.svg",
      _addonId: "__settings__",
    });
    return sortPopups(popupObjects);
  }

  onMount(() => {
    window.addEventListener("load", () => setTimeout(calculatePopupSize, 0));
    if (document.readyState === "complete") setTimeout(calculatePopupSize, 0);

    chrome.runtime.sendMessage("getSettingsInfo", (res) => {
      // Initialize global state for embedded popup components to use.
      window.__SA_settingsInfo = res;
      window.scratchAddons = window.scratchAddons || {};
      window.scratchAddons.globalState = window.scratchAddons.globalState || {};
      window.scratchAddons.globalState.addonSettings = res.addonSettings;

      popups = loadPopupsFromManifests(res);

      chrome.storage.local.get("lastSelectedPopup", ({ lastSelectedPopup }) => {
        let target = popups.find((p) => p._addonId === lastSelectedPopup);
        if (!target) target = popups.find((p) => p._addonId === "__settings__");
        if (target) setPopup(target);
      });
    });

    const onMsg = (request) => {
      if (request.changeEnabledState) {
        const { addonId, newState } = request.changeEnabledState;
        const entry = manifests?.find((addon) => addon.addonId === addonId);
        if (!entry?.manifest?.popup) return;
        if (newState === true) {
          const popupObj = {
            ...entry.manifest.popup,
            _addonId: addonId,
            fullscreen: entry.manifest.popup.fullscreen,
          };
          popups = sortPopups([...popups, popupObj]);
        } else {
          mountedPopupIds = new Set([...mountedPopupIds].filter((id) => id !== addonId));
          popups = popups.filter((p) => p._addonId !== addonId);
          if (!popups.find((p) => p._addonId === currentPopupId)) {
            if (popups[0]) setPopup(popups[0]);
          }
        }
      }
    };
    chrome.runtime.onMessage.addListener(onMsg);
    chrome.runtime.sendMessage("checkPermissions");
    return () => chrome.runtime.onMessage.removeListener(onMsg);
  });

  function componentFor(addonId) {
    if (addonId === "__settings__") return EmbeddedSettings;
    return EMBEDDED_COMPONENTS[addonId] || null;
  }

  function popupIconSrc(popup) {
    if (!popup.icon) return null;
    // Settings icon path is relative to webpages/popup/. Built-in addon popup icons are relative to /addons/<id>/.
    if (popup._addonId === "__settings__") return popup.icon;
    return chrome.runtime.getURL(`addons/${popup._addonId}/${popup.icon}`);
  }
</script>

<div id="header">
  <div id="title">
    <img src={chrome.runtime.getURL("images/icon-transparent.svg")} id="logo" alt="Logo" draggable="false" />
    <span id="title-text">
      {msg("extensionName")}
      <a id="version" href={changelogLink} target="_blank" title={msg("changelog")}>v{version}</a>
    </span>
  </div>
  <a href="#settings" class="header-button" onclick={(e) => { e.preventDefault(); openSettingsPage(); }}>
    <img src={chrome.runtime.getURL("images/icons/settings.svg")} id="settings-icon" title={msg("settings")} draggable="false" alt={msg("settings")} />
  </a>
</div>

<div id="popup-bar">
  {#each popups as popup (popup._addonId)}
    <button
      type="button"
      class="popup-name"
      class:sel={currentPopupId === popup._addonId}
      onclick={() => setPopup(popup)}
    >
      {#if popup.icon}
        <img src={popupIconSrc(popup)} class="popup-icon" draggable="false" alt="" />
      {/if}
      <span class="popup-title">{popup.name}</span>
      {#if popup.fullscreen}
        <span class="popout" onclick={(e) => { e.stopPropagation(); openInNewTab(popup); }}>
          <img
            src={chrome.runtime.getURL("images/icons/popout.svg")}
            class="popout-img"
            title={msg("openInNewTab")}
            draggable="false"
            alt={msg("openInNewTab")}
          />
        </span>
      {/if}
    </button>
  {/each}
</div>

{#each popups as popup (popup._addonId)}
  {#if mountedPopupIds.has(popup._addonId)}
    {@const Component = componentFor(popup._addonId)}
    {#if Component}
      <div class="embedded-popup" style:display={currentPopupId === popup._addonId ? "flex" : "none"}>
        <Component addonId={popup._addonId} popupMeta={popup} />
      </div>
    {/if}
  {/if}
{/each}
