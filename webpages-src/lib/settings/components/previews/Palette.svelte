<script>
  let { options, settingData, settings } = $props();

  function settingName(id) {
    return settingData.find((s) => s.id === id)?.name ?? id;
  }
</script>

<span class="preset-palette">
  {#each options.colors as colorKey (colorKey)}
    <span style:backgroundColor={settings[colorKey]} title={`${settingName(colorKey)}: ${settings[colorKey]}`}></span>
  {/each}
</span>

<style>
  .preset-palette {
    margin-inline-end: 6px;
    height: 18px;
    display: flex;
    background: linear-gradient(45deg, #777 25%, transparent 25%), linear-gradient(-45deg, #777 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #777 75%), linear-gradient(-45deg, transparent 75%, #777 75%);
    background-color: white;
    background-size: 6px 6px;
    background-position: 0 0, 0 3px, 3px -3px, -3px 0px;
    border-radius: 5px;
  }
  .preset-palette > :global(span) {
    width: 16px;
    height: 16px;
    border: 1px solid var(--control-border);
  }
  .preset-palette > :global(span + span) { border-inline-start: none; }
  .preset-palette > :global(span:first-child) { border-radius: 4px 0 0 4px; }
  :global([dir="rtl"]) .preset-palette > :global(span:first-child) { border-radius: 0 4px 4px 0; }
  .preset-palette > :global(span:last-child) { border-radius: 0 4px 4px 0; }
  :global([dir="rtl"]) .preset-palette > :global(span:last-child) { border-radius: 4px 0 0 4px; }
</style>
