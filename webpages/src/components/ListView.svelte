<script>
  import { onMount } from "svelte";

  let addons = $state({
    manifests: {},
    enabled: [],
    settings: [],
  });

  function toggleRequest(addonId) {
    const newState = !addons.enabled[addonId];
    addons.enabled[addonId] = newState;
    chrome.runtime.sendMessage({ changeEnabledState: { addonId: addonId, newState } });
  }

  onMount(() => {
    chrome.runtime.sendMessage("getSettingsInfo", async ({ manifests, addonsEnabled, addonSettings }) => {
      addons.manifests = manifests;
      addons.settings = addonSettings;
      addons.enabled = addonsEnabled;
    });
  });
</script>

<ol>
  {#each addons.manifests as { manifest, addonId } (addonId)}
    <div>
      <input type="checkbox" checked={addons.enabled[addonId]} onclick={() => toggleRequest(addonId)} />{manifest.name}
    </div>
  {/each}
</ol>
