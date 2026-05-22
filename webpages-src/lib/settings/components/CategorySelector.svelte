<script>
  import { S } from "../S.svelte.js";

  let { category } = $props();
  let lastClick = $state(0);

  const shouldShow = $derived.by(() => {
    const childIds = S.categories
      .filter((c) => c.parent === category.parent)
      .map((c) => c.id);
    return !category.parent || [category.parent, ...childIds].includes(S.selectedCategory);
  });

  function onClick(event) {
    event.stopPropagation();
    if (S.selectedCategory === category.id) {
      if (S.smallMode) {
        S.categoryOpen = false;
      } else {
        if (category.parent || Date.now() - lastClick < 350) return;
        S.selectedCategory = "all";
      }
    } else {
      S.selectedCategory = category.id;
    }
    lastClick = Date.now();
    S.relatedAddonsHistory.length = 0;
    S.relatedAddonsOpen = false;
  }
</script>

{#if !category.hidden && shouldShow}
  <button
    type="button"
    class="category"
    class:sel={category.id === S.selectedCategory && !S.relatedAddonsOpen}
    class:hasParent={!!category.parent}
    style:marginBottom={category.marginBottom ? "12px" : 0}
    onclick={onClick}
  >
    <img src={chrome.runtime.getURL(`images/icons/${category.icon}.svg`)} draggable="false" alt="" />
    <span>{category.name}</span>
  </button>
{/if}

<style>
  .category {
    transition:
      background-color 0.2s ease,
      padding 0.2s ease,
      height 0.2s ease,
      opacity 0.2s ease;
    padding: 15px 20px;
    position: relative;
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    outline-offset: -2px;
    background-color: transparent;
    border: none;
    color: inherit;
    font: inherit;
  }
  .category.sel { font-weight: 600; }
  .category.hasParent {
    padding-inline: 40px 20px;
    box-sizing: border-box;
    padding-block: 10px;
    opacity: 1;
  }
  .category:hover, .category.sel { background: var(--hover-darken); }
  .category:focus-visible { outline: 2px solid var(--content-text); }
  .category::before {
    content: "";
    transition: all 0.2s ease;
    display: block;
    width: 4px;
    border-radius: 0 4px 4px 0;
    background: var(--orange);
    position: absolute;
    left: 0;
    inset-block: 6px;
    opacity: 0;
  }
  :global([dir="rtl"]) .category::before { right: 0; border-radius: 4px 0 0 4px; }
  .category.sel::before { opacity: 1; }
  .category img { height: 18px; width: 18px; filter: var(--content-icon-filter); }
  .category :global(span) { margin-inline-start: 15px; }
</style>
