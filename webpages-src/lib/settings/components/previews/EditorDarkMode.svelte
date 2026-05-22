<script>
  let { settings, hoveredSettingId, onAreaHover } = $props();
</script>

<div class="preview-placeholder">
  <span>Preview unavailable</span>
</div>

<style>
  .preview-placeholder {
    color: var(--description-text);
    font-style: italic;
    padding: 8px;
    border: 1px dashed var(--control-border);
    border-radius: 4px;
  }
</style>
