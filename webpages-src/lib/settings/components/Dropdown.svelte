<script>
  import { tick } from "svelte";
  import { on, emit, closeDropdowns } from "../S.svelte.js";

  let { buttonClass = "", buttonTitle = "", disabled = false, children } = $props();
  let isOpen = $state(false);
  let buttonEl = $state(null);
  let listEl = $state(null);

  const shiftAmountsByKey = {
    ArrowUp: -1, ArrowDown: 1, ArrowLeft: -1, ArrowRight: 1,
    Home: -Infinity, End: Infinity,
  };

  $effect(() => {
    return on("close-dropdowns", (except) => {
      if (isOpen && except !== self) {
        isOpen = false;
      }
    });
  });

  const self = {};

  async function toggle() {
    isOpen = !isOpen;
    emit("close-pickers", null);
    emit("close-dropdowns", self);
    if (isOpen) {
      await tick();
      listEl?.firstElementChild?.focus?.();
    }
  }

  function listClick(e) {
    if (e.target.closest("li")) {
      closeDropdowns();
    }
  }

  function handleKeys(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "Tab") {
      buttonEl?.focus();
      closeDropdowns();
    } else if (document.activeElement?.tagName === "LI" && e.key === "Enter") {
      document.activeElement.click();
    } else {
      const shiftBy = shiftAmountsByKey[e.key];
      if (shiftBy === undefined) return;
      e.preventDefault();
      const items = listEl ? Array.from(listEl.children) : [];
      const oldFocusIndex = items.indexOf(document.activeElement);
      const adjustedFocusIndex = oldFocusIndex + shiftBy;
      const newFocusIndex = Math.min(Math.max(adjustedFocusIndex, 0), items.length - 1);
      items[newFocusIndex]?.focus?.();
    }
  }

  function handleOutside(node) {
    function onPointerDown(e) {
      if (!node.contains(e.target) && isOpen) {
        closeDropdowns();
      }
    }
    document.body.addEventListener("mousedown", onPointerDown, true);
    return {
      destroy() {
        document.body.removeEventListener("mousedown", onPointerDown, true);
      },
    };
  }
</script>

<div onkeydown={handleKeys} use:handleOutside>
  <button
    type="button"
    bind:this={buttonEl}
    aria-haspopup="true"
    aria-expanded={isOpen ? "true" : "false"}
    class={`dropdown-btn ${buttonClass} ${isOpen ? "open" : ""}`}
    {disabled}
    title={buttonTitle}
    onclick={toggle}
  >
    <img src={chrome.runtime.getURL("images/icons/expand.svg")} class="icon-type" draggable="false" alt="" />
  </button>
  <ul class="dropdown-list" onclick={listClick} role="menu" bind:this={listEl}>
    {@render children?.()}
  </ul>
</div>

<style>
  :global(.dropdown-parent) { position: relative; }
  .dropdown-list {
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    margin: 0;
    min-width: 100px;
    padding: 6px 0;
    display: none;
    z-index: 3;
    border-radius: 4px;
    background: var(--button-background);
    color: var(--content-text);
    border: 1px solid var(--control-border);
    box-shadow: var(--large-shadow);
  }
  .dropdown-btn.open + ul { display: block; }
  .dropdown-list :global(li) {
    padding: 6px 12px;
    list-style: none;
    white-space: nowrap;
    text-align: start;
    transition: 0.2s ease;
    user-select: none;
    cursor: pointer;
  }
  .dropdown-list :global(li:hover) { background: var(--button-hover-background); }
  @media (max-width: 700px) {
    .dropdown-list { right: auto; left: 0; }
    :global([dir="rtl"]) .dropdown-list { left: auto; right: 0; }
  }
</style>
