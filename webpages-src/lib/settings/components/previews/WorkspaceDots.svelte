<script>
  let { settings, hoveredSettingId } = $props();

  const spacing = $derived(27 / settings.spacingDivisor);
  const lineWidth = $derived(
    {
      dots: 0.675,
      crosshairs: spacing / 2.5,
      lines: spacing + 1,
      vertical: spacing + 1,
      horizontal: spacing + 1,
    }[settings.theme] || 0
  );
</script>

<div role="presentation" class="dots-preview">
  <svg width="100%" height="108">
    <defs>
      <pattern id="dots-pattern" patternUnits="userSpaceOnUse" width={spacing} height={spacing}>
        <g stroke-width={lineWidth} stroke="var(--content-text)">
          {#if settings.theme !== "horizontal"}
            <line x1={spacing / 2 - 1} x2={spacing / 2 + 1} y1={spacing / 2} y2={spacing / 2} />
          {/if}
          {#if settings.theme !== "vertical"}
            <line x1={spacing / 2} x2={spacing / 2} y1={spacing / 2 - 1} y2={spacing / 2 + 1} />
          {/if}
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots-pattern)" />
  </svg>
</div>

<style>
  .dots-preview {
    margin-top: 10px;
    background-color: var(--input-background);
    border: 1px solid var(--control-border);
    border-radius: 4px;
  }
  .dots-preview > svg {
    display: block;
    opacity: 0.14;
  }
</style>
