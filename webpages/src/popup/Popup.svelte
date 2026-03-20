<script>
  import { onMount } from "svelte";
  import { msg, openSettingsPage } from "/src/lib/extension-api.js";
  import { changelogLink, versionLabel } from "/src/lib/util.js";
  import logo from "/src/assets/logo-transparent.svg";

  import ListView from "/src/components/ListView.svelte";
  import TabBar from "/src/components/TabBar.svelte";

  const TAB_ORDER = ["__settings__", "scratch-messaging", "cloud-games"];
  const loaders = import.meta.glob("./tabs/*/Popup.svelte");

  let popups = $state([]);
  let selectedPopupId = $state(null);
  let selectedPopup = $derived(popups.find((p) => p.id === selectedPopupId));

  let selectedComponent = $derived.by(async () => {
    if (!selectedPopup) return null;
    if (!selectedPopup.component) {
      selectedPopup.component = (await selectedPopup.loader()).default;
    }
    return selectedPopup.component;
  });

  $effect(() => {
    if (selectedPopupId) {
      localStorage.setItem("lastSelectedPopup", selectedPopupId);
    }
  });

  onMount(() => {
    chrome.runtime.sendMessage("getSettingsInfo", (res) => {
      const popupObjects = res.manifests
        .filter((m) => res.addonsEnabled[m.addonId])
        .filter((m) => m.manifest?.popup)
        .map((m) => {
          const key = `./tabs/${m.addonId}/Popup.svelte`;
          return { ...m.manifest.popup, id: m.addonId, loader: loaders[key] };
        });

      popupObjects.push({
        id: "__settings__",
        name: msg("quickSettings"),
        icon: "wrench",
        loader: async () => ({ default: ListView }),
      });

      popupObjects.sort((a, b) => TAB_ORDER.indexOf(a.id) - TAB_ORDER.indexOf(b.id));
      popups = popupObjects;
      selectedPopupId = localStorage.getItem("lastSelectedPopup") ?? "__settings__";
    });
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

<TabBar tabsData={popups} bind:selected={selectedPopupId} />
<div class="tab-content">
  {#await selectedComponent then Component}
    <Component />
  {/await}
</div>
