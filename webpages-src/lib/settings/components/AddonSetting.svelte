<script>
  import { onMount, tick } from "svelte";
  import { S, msg, updateSettings, on, emit, closePickers } from "../S.svelte.js";
  import AddonTag from "./AddonTag.svelte";
  import Dropdown from "./Dropdown.svelte";
  import ResetDropdown from "./ResetDropdown.svelte";
  import PickerComponent from "./PickerComponent.svelte";
  import Self from "./AddonSetting.svelte";
  import Sortable from "sortablejs";

  let { addon, groupId, setting, settingPath, addonSettings } = $props();

  const noResetDropdown = $derived(["table", "boolean", "select"].includes(setting.type));
  const tableChild = $derived(settingPath.length > 1);
  const selectName = $derived(`${groupId}-${addon._addonId}-${settingPath.join("-")}`);

  const show = $derived.by(() => {
    if (!setting.if) return true;
    if (setting.if.addonEnabled) {
      const arr = Array.isArray(setting.if.addonEnabled) ? setting.if.addonEnabled : [setting.if.addonEnabled];
      if (arr.some((id) => S.manifestsById[id]?._enabled === true)) return true;
    }
    if (setting.if.settings) {
      const anyMatches = Object.keys(setting.if.settings).some((settingName) => {
        const arr = Array.isArray(setting.if.settings[settingName])
          ? setting.if.settings[settingName]
          : [setting.if.settings[settingName]];
        return arr.some((v) => addonSettings[settingName] === v);
      });
      if (anyMatches) return true;
    }
    return false;
  });

  const showResetDropdown = $derived.by(() => {
    return (
      !tableChild &&
      addon.presets &&
      addon.presets.some(
        (preset) =>
          Object.prototype.hasOwnProperty.call(preset.values, setting.id) &&
          (setting.type === "color"
            ? preset.values[setting.id].toLowerCase() !== setting.default.toLowerCase()
            : preset.values[setting.id] !== setting.default)
      )
    );
  });

  const isNewOption = $derived.by(() => {
    if (!addon.latestUpdate) return false;
    const m = chrome.runtime.getManifest();
    const [extMajor, extMinor] = m.version.split(".");
    const [addonMajor, addonMinor] = addon.latestUpdate.version.split(".");
    if (extMajor !== addonMajor || extMinor !== addonMinor) return false;
    return Boolean(addon.latestUpdate.newSettings?.includes(setting.id));
  });

  function settingsName() {
    const name = setting.name;
    const regex = /([\\]*)(@|#)([a-zA-Z0-9.\-\/_]*)/g;
    return name.replace(regex, (icon) => {
      if (icon[0] === "\\") return icon.slice(1);
      if (icon[0] === "@") {
        return `<img class="inline-icon" src="${chrome.runtime.getURL(`images/icons/${icon.split("@")[1]}`)}" draggable="false"/>`;
      }
      if (icon[0] === "#") {
        return `<img class="inline-icon" src="${chrome.runtime.getURL(`addons/${addon._addonId}/${icon.split("#")[1]}`)}" draggable="false"/>`;
      }
    });
  }

  function selectOptionId(option) {
    return `${selectName}-${option.id}`;
  }

  function checkValidity(e) {
    if (!e.target.validity.valid) addonSettings[setting.id] = setting.default;
  }

  function getTableSetting(id) {
    return setting.row.find((s) => s.id === id);
  }

  let sortable = null;
  let listEl = $state(null);

  function moveTableRow(oldIndex, newIndex) {
    const list = addonSettings[setting.id];
    list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
    updateSettings(addon);
    const focused = document.activeElement;
    setTimeout(() => focused?.focus?.(), 0);
  }

  function deleteTableRow(i) {
    addonSettings[setting.id].splice(i, 1);
    updateSettings(addon);
  }

  function addTableRow(items = {}) {
    const settings = Object.assign(
      {},
      setting.row.reduce((acc, cur) => {
        acc[cur.id] = cur.default;
        return acc;
      }, {}),
      items
    );
    addonSettings[setting.id].push(settings);
    updateSettings(addon);
  }

  function updateOption(newValue) {
    addonSettings[setting.id] = newValue;
    updateSettings(addon);
  }

  $effect(() => {
    if (setting.type === "table" && listEl && !sortable) {
      sortable = new Sortable(listEl, {
        handle: ".handle",
        animation: 300,
        onUpdate: (event) => moveTableRow(event.oldIndex, event.newIndex),
        disabled: !addon._enabled,
      });
    }
    return () => {
      sortable?.destroy?.();
      sortable = null;
    };
  });

  $effect(() => {
    if (sortable) sortable.option("disabled", !addon._enabled);
  });
</script>

{#if show}
  <div
    class="addon-setting"
    class:boolean-setting={setting.type === "boolean"}
    class:number-setting={setting.type === "integer" || setting.type === "positive_integer"}
  >
    <div class="setting-label-container">
      <div class="setting-label">{@html settingsName()}</div>
      {#if setting.description}
        <div class:tooltip={addon._enabled} tabindex={addon._enabled ? 0 : -1}>
          <img src={chrome.runtime.getURL("images/icons/help.svg")} class="icon-type setting-help-icon" alt="" />
          <span class="tooltiptext tooltiptexttop">{setting.description}</span>
        </div>
      {/if}
      {#if isNewOption}
        <AddonTag tag="new" />
      {/if}
    </div>
    {#if noResetDropdown}
      {#if setting.type === "table"}
        <div class="setting-table">
          <div class="setting-table-list" bind:this={listEl}>
            {#each addonSettings[setting.id] as row, i (i)}
              <div class="setting-table-row">
                <div class="setting-table-options">
                  <button
                    type="button"
                    disabled={!addon._enabled || i === 0}
                    class="icon-button"
                    class:disabled={i === 0}
                    onclick={() => moveTableRow(i, i - 1)}
                    title={msg("moveUp")}
                  ><img class="icon-type" src={chrome.runtime.getURL("images/icons/move-up.svg")} alt="" /></button>
                  <button
                    type="button"
                    disabled={!addon._enabled}
                    class="icon-button handle"
                    tabindex="-1"
                  ><img class="icon-type" src={chrome.runtime.getURL("images/icons/drag.svg")} alt="" /></button>
                  <button
                    type="button"
                    disabled={!addon._enabled || i === addonSettings[setting.id].length - 1}
                    class="icon-button"
                    class:disabled={i === addonSettings[setting.id].length - 1}
                    onclick={() => moveTableRow(i, i + 1)}
                    title={msg("moveDown")}
                  ><img class="icon-type" src={chrome.runtime.getURL("images/icons/move-down.svg")} alt="" /></button>
                </div>
                <div class="setting-table-row-settings">
                  {#each setting.row as childSetting (childSetting.id)}
                    <Self
                      addon={addon}
                      groupId={groupId}
                      setting={childSetting}
                      settingPath={[...settingPath, i, childSetting.id]}
                      addonSettings={row}
                    />
                  {/each}
                </div>
                <div class="setting-table-options">
                  <button
                    type="button"
                    disabled={!addon._enabled}
                    class="icon-button"
                    onclick={() => deleteTableRow(i)}
                    title={msg("deleteRow")}
                  ><img class="icon-type" src={chrome.runtime.getURL("images/icons/close.svg")} alt="" /></button>
                </div>
              </div>
            {/each}
          </div>
          <div class="split-button setting-table-dropdown dropdown-parent">
            <button type="button" disabled={!addon._enabled} class="large-button split-button-button" onclick={() => addTableRow()}>
              <img class="icon-type" src={chrome.runtime.getURL("images/icons/plus.svg")} draggable="false" alt="" />
              {msg("addRow")}
            </button>
            {#if setting.presets}
              <Dropdown buttonClass="large-button split-button-dropdown" disabled={!addon._enabled} buttonTitle={msg("addPresetRow")}>
                {#each setting.presets as preset (preset.id ?? preset.name)}
                  <li tabindex="0" role="menuitem" onclick={() => addTableRow(preset.values)} onkeydown={(e) => e.key === "Enter" && addTableRow(preset.values)}>
                    {preset.name}
                  </li>
                {/each}
              </Dropdown>
            {/if}
          </div>
        </div>
      {:else if setting.type === "boolean"}
        <input
          type="checkbox"
          class="switch blue"
          bind:checked={addonSettings[setting.id]}
          onchange={() => updateSettings(addon)}
          disabled={!addon._enabled}
        />
      {:else if setting.type === "select"}
        <div class="filter-options" role="radiogroup">
          {#each setting.potentialValues as option (option.id)}
            <div>
              <input
                type="radio"
                name={selectName}
                id={selectOptionId(option)}
                value={option.id}
                disabled={!addon._enabled}
                bind:group={addonSettings[setting.id]}
                onchange={() => updateSettings(addon)}
              />
              <label class="filter-option" for={selectOptionId(option)}>{option.name}</label>
            </div>
          {/each}
        </div>
      {/if}
    {:else}
      <div class="setting-input-container dropdown-parent" class:full-radius={tableChild}>
        {#if setting.type === "positive_integer"}
          <input
            type="number"
            class="setting-input number"
            bind:value={addonSettings[setting.id]}
            onchange={(e) => { checkValidity(e); updateSettings(addon); }}
            disabled={!addon._enabled}
            min="0"
          />
        {:else if setting.type === "integer"}
          <input
            type="number"
            class="setting-input number"
            bind:value={addonSettings[setting.id]}
            onchange={(e) => { checkValidity(e); updateSettings(addon); }}
            disabled={!addon._enabled}
            min={setting.min}
            max={setting.max}
          />
        {:else if setting.type === "string" || setting.type === "untranslated"}
          <input
            type="text"
            class="setting-input string"
            bind:value={addonSettings[setting.id]}
            onchange={(e) => { checkValidity(e); updateSettings(addon); }}
            disabled={!addon._enabled}
            placeholder={setting.default}
            maxlength={setting.max || 100}
            minlength={setting.min || 0}
            required={!!setting.min}
          />
        {:else if setting.type === "color"}
          <PickerComponent
            value={addonSettings[setting.id] || setting.default}
            {setting}
            {addon}
            {addonSettings}
            no_alpha={!setting.allowTransparency}
            disabled={!addon._enabled}
          />
        {/if}
        {#if showResetDropdown}
          <ResetDropdown {setting} disabled={!addon._enabled} presets={addon.presets} {addon} {addonSettings} />
        {:else if !tableChild}
          <button
            type="button"
            class="large-button clear-button"
            disabled={!addon._enabled}
            title={msg("reset")}
            onclick={() => updateOption(setting.default || "")}
          >
            <img src={chrome.runtime.getURL("images/icons/undo.svg")} class="icon-type" draggable="false" alt="" />
          </button>
        {/if}
      </div>
    {/if}
  </div>
{/if}
