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

<div>
  {#each addons.manifests as { manifest, addonId } (addonId)}
    <div class="addon-body">
      <input type="checkbox" checked={addons.enabled[addonId]} onclick={() => toggleRequest(addonId)} />{manifest.name}
    </div>
  {/each}
</div>

<style>
.addon-body {
  background-color: var(--content-background);
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 4px;
}
</style>
