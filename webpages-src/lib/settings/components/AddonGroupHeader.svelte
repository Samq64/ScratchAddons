<script>
  import { S, msg } from "../S.svelte.js";

  let { group, shownCount, marginAbove } = $props();

  const shouldShow = $derived.by(() => {
    if (S.searchInput !== "") return false;
    return shownCount > 0;
  });

  function toggle() {
    group.expanded = !group.expanded;
  }
</script>

{#if shouldShow}
  <div class="addon-group" class:margin-above={marginAbove} onclick={toggle} role="button" tabindex="0" onkeydown={(e) => e.key === "Enter" && toggle()}>
    <button type="button" class="arrow-button" title={msg(group.expanded ? "collapse" : "expand")}>
      <img src={chrome.runtime.getURL("images/icons/expand.svg")} class:reverted={group.expanded} draggable="false" alt="" />
    </button>
    {group.name} ({shownCount})
  </div>
{/if}

<style>
  .addon-group.margin-above { margin-top: 20px; }
  .addon-group {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 0px 11px;
    padding: 0px 10px;
    user-select: none;
  }
  .addon-group::after {
    content: "";
    border-top: 1px solid var(--content-separator);
    width: 100px;
    margin-inline-start: 20px;
    margin-inline-end: 5px;
    flex: 1;
  }
  @media (max-width: 700px) {
    .addon-group { padding-inline: 6px; }
  }
  .arrow-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .reverted { transform: rotate(180deg); }
</style>
