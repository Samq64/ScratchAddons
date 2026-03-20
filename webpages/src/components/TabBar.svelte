<script>
  const indicatorOffset = 10;

  let { items, selected = $bindable() } = $props();
  let tabRefs = $state({});

  let indicatorPosition = $derived.by(() => {
    const el = tabRefs[selected];
    if (!el) return "";
    return `left: ${el.offsetLeft + indicatorOffset}px; width: ${el.offsetWidth - indicatorOffset * 2}px;`;
  });
</script>

<div class="tabs" role="radiogroup">
  {#each items as item}
    <label class="tab" bind:this={tabRefs[item.id]}>
      <input type="radio" name="tabBar" value={item.id} bind:group={selected} />
      <img src={`/dist/icons/${item.icon}.svg`} draggable="false" />
      {item.name}
    </label>
  {/each}
  <div class="indicator" style={indicatorPosition}></div>
</div>

<style>
  .tabs {
    position: relative;
    height: 3rem;
    flex-shrink: 0;
    display: flex;
    background-color: var(--navigation-background);
    border-bottom: 1px solid var(--control-border);
  }

  .tab {
    flex-grow: 1;
    display: flex;
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
