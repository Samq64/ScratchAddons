<script>
  import { onMount } from "svelte";
  import { msg, openSettingsPage } from "/src/lib/extension-api.js";
  import { changelogLink, versionLabel } from "/src/lib/util.js";
  import logo from "/src/assets/logo-transparent.svg";
  import TabBar from "/src/components/TabBar.svelte";

  const TAB_ORDER = ["__settings__", "scratch-messaging", "cloud-games"];

  let popups = $state([]);
  let selectedPopupId = $state(null);

  let selectedComponent = $derived.by(async () => {
    if (!selectedPopupId) return null;
    return (await import(`./tabs/${selectedPopupId}/Popup.svelte`)).default;
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
          return { ...m.manifest.popup, id: m.addonId };
        });

      popupObjects.push({
        id: "__settings__",
        name: msg("quickSettings"),
        icon: "wrench",
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
  <a href="#" class="header-button" title={msg("settings")} onclick={() => openSettingsPage()}>
    <img src="/dist/icons/settings.svg" draggable="false" />
  </a>
</nav>

<TabBar items={popups} bind:selected={selectedPopupId} />

<div class="tab-content">
  {#await selectedComponent then Component}
    <Component />
  {:catch error}
    <p>{error}</p>
  {/await}
</div>
