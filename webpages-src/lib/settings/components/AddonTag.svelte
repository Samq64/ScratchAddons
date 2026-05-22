<script>
  import tags from "../data/tags.js";
  import { S } from "../S.svelte.js";

  let { tag } = $props();

  const tagInfo = $derived(tags.find((t) => t.matchName === tag));
  const shouldShow = $derived.by(() => {
    if (!tagInfo) return false;
    if (S.isIframe) return tagInfo.iframeAlwaysShow;
    return !tagInfo.addonTabShow || tagInfo.addonTabShow[S.selectedCategory];
  });
  const tagName = $derived(tagInfo ? chrome.i18n.getMessage(tagInfo.name) : "");
  const tagTooltip = $derived(tagInfo?.tooltipText ? chrome.i18n.getMessage(tagInfo.tooltipText) : "");
</script>

{#if shouldShow}
  <div
    class="badge"
    tabindex={tagInfo.tooltipText ? 0 : -1}
    class:tooltip={!!tagInfo.tooltipText}
    class:blue={tagInfo.color === "blue"}
    class:yellow={tagInfo.color === "yellow"}
    class:red={tagInfo.color === "red"}
    class:darkred={tagInfo.color === "darkred"}
    class:green={tagInfo.color === "green"}
    class:darkgreen={tagInfo.color === "darkgreen"}
    class:lightblue={tagInfo.color === "lightblue"}
    class:purple={tagInfo.color === "purple"}
  >
    {tagName}
    {#if tagInfo.tooltipText}
      <span class="tooltiptext tooltiptexttop">{tagTooltip}</span>
    {/if}
  </div>
{/if}
