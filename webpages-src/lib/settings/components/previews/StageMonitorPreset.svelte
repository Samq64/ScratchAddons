<script>
  import { textColor } from "../../../../../libraries/common/cs/text-color.esm.js";

  let { options, settingData, settings } = $props();

  const colors = $derived.by(() => {
    const valueColor = settings.customValueColor ? settings.monitorValueBg : "#ff8c1a";
    return {
      monitorLabel: textColor(settings.monitor),
      value: valueColor,
      valueText: textColor(valueColor),
    };
  });
</script>

<span
  role="presentation"
  class="monitor-preset-preview"
  style:--monitor={settings.monitor}
  style:--monitor-label={colors.monitorLabel}
  style:--value={colors.value}
  style:--value-text={colors.valueText}
>
  <span class="monitor-preset-label">Aa</span>
  <span class="monitor-preset-value">123</span>
</span>

<style>
  .monitor-preset-preview {
    margin-inline-end: 10px;
    display: flex;
    padding: 3px;
    background-color: var(--monitor);
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    color: var(--monitor-label);
    user-select: none;
  }
  .monitor-preset-label { margin: 0 2px; font-weight: bold; }
  .monitor-preset-value {
    margin: 0 2px;
    padding: 0 2px;
    background-color: var(--value);
    border-radius: 4px;
    color: var(--value-text);
  }
</style>
