<script>
  import { onMount } from "svelte";
  import CloudGames from "$lib/embedded-popups/cloud-games/CloudGames.svelte";
  import ScratchMessaging from "$lib/embedded-popups/scratch-messaging/ScratchMessaging.svelte";

  const REGISTRY = {
    "cloud-games": CloudGames,
    "scratch-messaging": ScratchMessaging,
  };

  let addonId = $state(null);
  let Component = $state(null);
  let error = $state(null);

  onMount(() => {
    // Initialize globalState for embedded popups before they mount.
    chrome.runtime.sendMessage("getSettingsInfo", (res) => {
      window.scratchAddons = window.scratchAddons || {};
      window.scratchAddons.globalState = window.scratchAddons.globalState || {};
      window.scratchAddons.globalState.addonSettings = res.addonSettings;
    });
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if (!id) {
      error = "Missing ?id= query parameter";
      return;
    }
    addonId = id;
    if (!REGISTRY[id]) {
      error = `Unknown popup: ${id}`;
      return;
    }
    Component = REGISTRY[id];
  });
</script>

{#if error}
  <pre style="padding:1em">{error}</pre>
{:else if Component && addonId}
  <Component {addonId} />
{/if}
