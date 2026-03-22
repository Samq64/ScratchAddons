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
      <span class="addon-name">{manifest.name}</span>
      <input type="checkbox" class="switch" checked={addons.enabled[addonId]} onclick={() => toggleRequest(addonId)} />
    </div>
  {/each}
</div>

<style>
  @import "/src/styles/switch.css";

  .addon-body {
    display: flex;
    padding: 0.75rem;
    margin: 0.75rem;
    border-radius: 4px;
    align-items: center;
    background-color: var(--content-background);
    border: 1px solid var(--content-border);
    box-shadow: var(--content-shadow);
  }
  .addon-name {
    flex-grow: 1;
  }
</style>
