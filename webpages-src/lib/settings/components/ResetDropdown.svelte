<script>
  import Dropdown from "./Dropdown.svelte";
  import { msg, updateSettings } from "../S.svelte.js";

  let { disabled, setting, presets, addon, addonSettings } = $props();

  function resetToDefault() {
    addonSettings[setting.id] = setting.default;
    updateSettings(addon, { settingId: setting.id });
  }
  function resetToPreset(preset) {
    addonSettings[setting.id] = preset.values[setting.id];
    updateSettings(addon, { settingId: setting.id });
  }

  function showPreset(preset) {
    if (!Object.prototype.hasOwnProperty.call(preset.values, setting.id)) return false;
    if (setting.type === "color") {
      return preset.values[setting.id].toLowerCase() !== setting.default.toLowerCase();
    }
    return preset.values[setting.id] !== setting.default;
  }
</script>

<div class="setting-dropdown">
  <Dropdown buttonClass="large-button clear-button" {disabled} buttonTitle={msg("resetTo")}>
    <li tabindex="0" role="menuitem" onclick={resetToDefault} onkeydown={(e) => e.key === "Enter" && resetToDefault()}>
      {#if setting.type === "color"}
        <span class="color-preview"><span style:backgroundColor={setting.default}></span></span>
      {/if}
      <span>{msg("default")}</span>
      {#if setting.type !== "color"}
        <span class="text-preview">{setting.default}</span>
      {/if}
    </li>
    {#each presets as preset (preset.id ?? preset.name)}
      {#if showPreset(preset)}
        <li tabindex="0" role="menuitem" onclick={() => resetToPreset(preset)} onkeydown={(e) => e.key === "Enter" && resetToPreset(preset)}>
          {#if setting.type === "color"}
            <span class="color-preview"><span style:backgroundColor={preset.values[setting.id]}></span></span>
          {/if}
          <span>{preset.name}</span>
          {#if setting.type !== "color"}
            <span class="text-preview">{preset.values[setting.id]}</span>
          {/if}
        </li>
      {/if}
    {/each}
  </Dropdown>
</div>
