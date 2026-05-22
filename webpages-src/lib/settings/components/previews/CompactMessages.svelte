<script>
  let { settings, hoveredSettingId, onAreaHover } = $props();
  // TODO: Port full mockup from webpages/settings/components/previews/compact-messages.html.
  // The legacy preview is a static HTML mockup styled with CSS variables driven from settings.
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
