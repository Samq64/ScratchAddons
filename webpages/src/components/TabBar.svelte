<script>
  let { tabsData, selected = $bindable() } = $props();
  let tabRefs = $state({});

  let indicatorPosition = $derived.by(() => {
    const el = tabRefs[selected];
    if (!el) return "";
    return `left: ${el.offsetLeft + 10}px; width: ${el.offsetWidth - 20}px;`;
  });
</script>

<div class="tabs" role="radiogroup">
  {#each tabsData as data}
    <label class="tab" bind:this={tabRefs[data.id]}>
      <input type="radio" name="tabBar" value={data.id} bind:group={selected} />
      <img src={`/dist/icons/${data.icon}.svg`} draggable="false" />
      {data.name}
    </label>
  {/each}
  <div class="indicator" style={indicatorPosition}></div>
</div>

<style>
  .tabs {
    height: 3rem;
    display: flex;
    background-color: var(--navigation-background);
    border-bottom: 1px solid var(--control-border);
    position: relative;
  }

  .tab {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    user-select: none;
    transition: background 0.2s ease;
  }

  .tab:hover {
    background-color: var(--hover-darken);
  }

  .tab:has(input:checked) {
    background-color: var(--hover-darken);
    font-weight: bold;
  }

  .tab:has(input:focus-visible) {
    outline: var(--keyboard-focus);
  }

  .indicator {
    position: absolute;
    height: 4px;
    bottom: 0;
    background-color: var(--brand);
    border-radius: 4px 4px 0 0;
    transition:
      left 0.2s ease,
      width 0.2s ease;
  }

  img {
    filter: var(--icon-filter);
    height: 1.3em;
  }

  input {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
</style>
