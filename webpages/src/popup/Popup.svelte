<script>
  import { onMount } from "svelte";
  import { msg, openSettingsPage } from "/src/lib/extension-api.js";
  import { changelogLink, versionLabel } from "/src/lib/util.js";
  import ListView from "/src/components/ListView.svelte";
  import logo from "/src/assets/logo-transparent.svg";

  const TAB_ORDER = ["__settings__", "scratch-messaging", "cloud-games"];
  let manifests = [];
  let popups = $state([]);
  let selectedPopupId = $state(null);
  let selectedPopup = $derived(popups.find((p) => p._addonId === selectedPopupId));

  const loaders = Object.fromEntries(
    Object.entries(import.meta.glob("./tabs/*/Popup.svelte")).map(([path, loader]) => [path.split("/")[2], loader])
  );

  async function selectPopup(id) {
    if (selectedPopupId === id) return;
    const popup = popups.find((p) => p._addonId === id);
    selectedPopupId = id;
    if (!popup.component) {
      popup.component = (await popup.loader()).default;
    }
    localStorage.setItem("lastSelectedPopup", id);
  }

  onMount(() => {
    chrome.runtime.sendMessage("getSettingsInfo", (res) => {
      manifests = res.manifests;

      const popupObjects = manifests
        .filter((m) => res.addonsEnabled[m.addonId])
        .filter((m) => m.manifest?.popup)
        .map((m) => {
          const loader = loaders[m.addonId];
          return loader ? { ...m.manifest.popup, _addonId: m.addonId, loader } : null;
        })
        .filter(Boolean);

      popupObjects.push({
        _addonId: "__settings__",
        name: msg("quickSettings"),
        icon: "wrench.svg",
        loader: async () => ({ default: ListView }),
      });

      popupObjects.sort((a, b) => TAB_ORDER.indexOf(a._addonId) - TAB_ORDER.indexOf(b._addonId));

      popups = popupObjects;

      selectPopup(localStorage.getItem("lastSelectedPopup") ?? "__settings__");
    });
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const change = request.changeEnabledState;
    if (!change) return;

    const { addonId, newState } = change;
    const entry = manifests.find((m) => m.addonId === addonId);
    const loader = loaders[addonId];
    if (!entry?.manifest?.popup || !loader) return;

    if (newState) {
      if (!popups.some((p) => p._addonId === addonId)) {
        const popup = {
          ...entry.manifest.popup,
          _addonId: addonId,
          loader,
        };
        popups = [...popups, popup].sort((a, b) => TAB_ORDER.indexOf(a._addonId) - TAB_ORDER.indexOf(b._addonId));
      }
    } else {
      const wasSelected = selectedPopupId === addonId;
      popups = popups.filter((p) => p._addonId !== addonId);
      if (wasSelected) {
        selectPopup("__settings__");
      }
    }
    sendResponse({ ok: true });
  });
</script>

<nav>
  <img src={logo} alt="Logo" class="logo" draggable="false" />
  <h1>{msg("extensionName")}</h1>
  <a href={changelogLink()} target="_blank" title={msg("changelog")} class="version">
    v{versionLabel()}
  </a>
  <a href="#" class="header-button" onclick={() => openSettingsPage()}>
    <img src="/dist/icons/settings.svg" title={msg("settings")} draggable="false" />
  </a>
</nav>

<tab-group role="radiogroup">
  {#each popups as popup (popup._addonId)}
    <label>
      <input
        type="radio"
        name="popupTab"
        checked={selectedPopupId === popup._addonId}
        onchange={() => selectPopup(popup._addonId)}
      />
      <img src={`/dist/icons/${popup.icon}`} draggable="false" />
      {popup.name}
    </label>
  {/each}
</tab-group>

<div class="tab-content">
  {#if selectedPopup?.component}
    <selectedPopup.component />
  {/if}
</div>

<style>
  @import "/src/styles/tabGroup.css";
</style>
