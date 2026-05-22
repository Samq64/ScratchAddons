<script>
  import { onMount } from "svelte";
  import { S, msg, updateSettings, closePickers } from "../S.svelte.js";
  import AddonTag from "./AddonTag.svelte";
  import AddonSetting from "./AddonSetting.svelte";
  import Dropdown from "./Dropdown.svelte";
  import downloadBlob from "../../../../libraries/common/cs/download-blob.js";

  // Preview components are lazily mapped by addonPreview type or addon id.
  import CompactMessages from "./previews/CompactMessages.svelte";
  import DarkWww from "./previews/DarkWww.svelte";
  import EditorDarkMode from "./previews/EditorDarkMode.svelte";
  import Palette from "./previews/Palette.svelte";
  import StageMonitor from "./previews/StageMonitor.svelte";
  import StageMonitorPreset from "./previews/StageMonitorPreset.svelte";
  import WorkspaceDots from "./previews/WorkspaceDots.svelte";

  const PREVIEWS = {
    "compact-messages": CompactMessages,
    "dark-www": DarkWww,
    "editor-dark-mode": EditorDarkMode,
    palette: Palette,
    "stage-monitor": StageMonitor,
    "stage-monitor-preset": StageMonitorPreset,
    "workspace-dots": WorkspaceDots,
  };

  let { addon, groupId, groupExpanded, visible } = $props();

  const getDefaultExpanded = () => (S.isIframe ? false : groupId === "enabled");

  let expanded = $state(getDefaultExpanded());
  let everExpanded = $state(getDefaultExpanded());
  let hoveredSettingId = $state(null);
  let highlightedSettingId = $state(null);

  const shouldShow = $derived(visible && (S.searchInput === "" ? groupExpanded : true));

  const addonIconSrc = $derived.by(() => {
    const map = {
      editor: "puzzle",
      player: "player",
      community: "web",
      theme: "brush",
      easterEgg: "egg-easter",
      popup: "popup",
    };
    return chrome.runtime.getURL(`images/icons/${map[addon._icon]}.svg`);
  });

  const addonSettings = $derived(S.addonSettings[addon._addonId]);

  const showUpdateNotice = $derived.by(() => {
    if (!addon.latestUpdate?.temporaryNotice) return false;
    const m = chrome.runtime.getManifest();
    const [extMajor, extMinor] = m.version.split(".");
    const [addonMajor, addonMinor] = addon.latestUpdate.version.split(".");
    return extMajor === addonMajor && extMinor === addonMinor;
  });

  $effect(() => {
    void groupId;
    expanded = getDefaultExpanded();
  });

  $effect(() => {
    if (S.searchInput === "") expanded = getDefaultExpanded();
    else expanded = false;
  });

  $effect(() => {
    if (expanded) everExpanded = true;
  });

  function loadPreset(preset) {
    if (window.confirm(chrome.i18n.getMessage("confirmPreset"))) {
      for (const property of Object.keys(preset.values)) {
        addonSettings[property] = preset.values[property];
      }
      updateSettings(addon);
    }
  }

  function importPreset() {
    const inputElem = Object.assign(document.createElement("input"), {
      hidden: true,
      type: "file",
      accept: "application/json",
    });
    inputElem.addEventListener("change", async () => {
      const text = await inputElem.files[0].text();
      inputElem.remove();
      let obj;
      try {
        obj = JSON.parse(text);
        if (!obj.addonId) {
          const settings = obj?.addons?.[addon._addonId]?.settings;
          if (settings) {
            loadPreset({ id: "extracted-settings", values: settings });
            return;
          }
          throw "Missing addon ID";
        }
        if (obj.addonId !== addon._addonId) {
          alert(msg("incorrectAddonImport", S.manifestsById[obj.addonId]?.name));
          return;
        }
      } catch {
        alert(chrome.i18n.getMessage("importFailed"));
        return;
      }
      loadPreset(obj);
    }, { once: true });
    inputElem.addEventListener("cancel", () => inputElem.remove(), { once: true });
    document.body.appendChild(inputElem);
    inputElem.click();
  }

  function exportPreset() {
    const preset = { addonId: addon._addonId, id: "custom-preset", values: addonSettings };
    const blob = new Blob([JSON.stringify(preset)], { type: "application/json" });
    const name = addon.name.replaceAll(" ", "-").toLowerCase();
    downloadBlob(`${name}.json`, blob);
  }

  function loadDefaults() {
    if (window.confirm(chrome.i18n.getMessage("confirmReset"))) {
      for (const property of addon.settings) {
        addonSettings[property.id] = JSON.parse(JSON.stringify(property.default));
      }
      updateSettings(addon);
    }
  }

  function toggleAddonRequest(event) {
    const toggle = () => {
      const newState = !addon._enabled;
      addon._wasEverEnabled = addon._enabled || newState;
      addon._enabled = newState;
      expanded = S.relatedAddonsOpen
        ? expanded
        : S.isIframe && !expanded && (addon.info || []).every((item) => item.type !== "warning")
          ? false
          : event.shiftKey
            ? false
            : newState;
      chrome.runtime.sendMessage({ changeEnabledState: { addonId: addon._addonId, newState } });
    };

    const requiredPermissions = (addon.permissions || []).filter((value) =>
      S.browserLevelPermissions.includes(value)
    );
    if (!addon._enabled && addon.tags.includes("danger")) {
      const confirmation = confirm(chrome.i18n.getMessage("dangerWarning", [addon.name]));
      if (!confirmation) {
        event.preventDefault();
        return;
      }
    }
    if (!addon._enabled && requiredPermissions.length) {
      const result = requiredPermissions.every((p) => S.grantedOptionalPermissions.includes(p));
      if (!result) {
        event.preventDefault();
        if (S.isIframe) {
          S.addonToEnable = addon;
          S.showPopupModal = true;
        } else {
          chrome.permissions.request({ permissions: requiredPermissions }, (granted) => {
            if (granted) toggle();
          });
        }
      } else toggle();
    } else toggle();
  }

  function openRelated(clickedAddon, event) {
    event.preventDefault();
    // Trigger via custom event from parent — done via a callback passed in by Settings.svelte.
    document.dispatchEvent(new CustomEvent("sa:openRelated", { detail: { addon, clickedAddon } }));
  }

  function highlightSetting(id) {
    highlightedSettingId = id;
  }

  onMount(() => {
    const onHashChange = () => {
      if (location.hash.replace(/^#addon-/, "") === addon._addonId) {
        expanded = true;
      }
    };
    window.addEventListener("hashchange", onHashChange, { capture: false });
    setTimeout(onHashChange, 0);
    return () => window.removeEventListener("hashchange", onHashChange);
  });
</script>

{#if shouldShow}
  <div class="addon-body" id={`addon-${addon._addonId}`}>
    <div class="addon-topbar">
      <div class="clickable-area" onclick={() => (expanded = !expanded)} role="button" tabindex="0" onkeydown={(e) => e.key === "Enter" && (expanded = !expanded)}>
        <button type="button" class="arrow-button" title={msg(expanded ? "collapse" : "expand")}>
          <img src={chrome.runtime.getURL("images/icons/expand.svg")} class:reverted={expanded} draggable="false" alt="" />
        </button>
        <img src={addonIconSrc} class="icon-type addon-icon" draggable="false" alt="" />
        <div class="addon-name-and-tags">
          <div class="addon-name tooltip">
            <span>{addon.name}</span>
            {#if S.devMode}<span class="tooltiptext tooltiptexttop">{addon._addonId}</span>{/if}
          </div>{#each addon.tags as tag (tag)}<AddonTag {tag} />{/each}
        </div>
      </div>
      {#if !expanded}
        <div class="addon-description" dir="auto">{addon.description}</div>
      {/if}
      <div class="addon-check">
        {#if expanded && addon._enabled && addon.settings}
          <div class="split-button dropdown-parent">
            <button class="icon-button split-button-button" title={msg("resetToDefault")} onclick={loadDefaults}>
              <img src={chrome.runtime.getURL("images/icons/undo.svg")} class="icon-type" draggable="false" alt="" />
            </button>
            <Dropdown buttonClass="icon-button split-button-dropdown" buttonTitle={msg("importExport")}>
              <li role="menuitem" tabindex="0" onclick={exportPreset} onkeydown={(e) => e.key === "Enter" && exportPreset()}>{msg("export")}</li>
              <li role="menuitem" tabindex="0" onclick={importPreset} onkeydown={(e) => e.key === "Enter" && importPreset()}>{msg("import")}</li>
            </Dropdown>
          </div>
        {/if}
        <input type="checkbox" class="switch" bind:checked={addon._enabled} onclick={toggleAddonRequest} />
      </div>
    </div>
    {#if everExpanded}
      <div class="addon-settings" style:display={expanded ? "" : "none"}>
        <div class="addon-description-full">{addon.description}</div>
        {#if showUpdateNotice}
          <div class="addon-message addon-update">
            <AddonTag tag="new" />
            {addon.latestUpdate.temporaryNotice}
          </div>
        {/if}
        {#if addon.info}
          {#each addon.info as info, i (i)}
            <div id="info">
              <div class={`addon-message addon-${info.type || "info"}`}>
                <img src={chrome.runtime.getURL(`images/icons/${{ warning: "warning.svg", notice: "notice.svg", info: "help.svg" }[info.type || "info"]}`)} draggable="false" alt="" />
                {info.text}
              </div>
            </div>
          {/each}
        {/if}
        {#if addon.credits}
          <div class="addon-credits">
            <span>{msg("creditTo")}</span>
            {#each addon.credits as credit, i (i)}
              <span>
                {#if credit.link}
                  <a href={credit.link} rel="noreferrer noopener" target="_blank">{credit.name}</a>
                {:else}
                  {credit.name}
                {/if}
                {#if credit.note}({credit.note}){/if}
              </span>
            {/each}
          </div>
        {/if}
        {#if addon.libraries?.length}
          <div class="addon-license">
            <a target="_blank" href={`./licenses.html?libraries=${addon.libraries.join(",")}`}>{msg("viewLicenses")}</a>
          </div>
        {/if}
        {#if addon.addonPreview && !S.isIframe && PREVIEWS[addon._addonId]}
          {@const PreviewC = PREVIEWS[addon._addonId]}
          <div class="preview-column" class:disabled={!addon._enabled}>
            <div class="setting-label">{msg("preview")}</div>
            <PreviewC settings={addonSettings} hoveredSettingId={hoveredSettingId} onAreaHover={highlightSetting} />
          </div>
        {/if}
        <div class="settings-column" class:disabled={!addon._enabled}>
          {#if addon.settings}
            {#each addon.settings as setting (setting.id)}
              <AddonSetting
                {addon}
                {groupId}
                {setting}
                settingPath={[setting.id]}
                {addonSettings}
              />
            {/each}
          {/if}
        </div>
        {#if addon.presets}
          <div class="presets-column" class:disabled={!addon._enabled}>
            <div class="setting-label">{msg("presets")}</div>
            {#each addon.presets as preset (preset.id ?? preset.name)}
              <div class="addon-setting">
                <button
                  type="button"
                  class="large-button"
                  disabled={!addon._enabled}
                  onclick={() => loadPreset(preset)}
                  title={preset.description}
                >
                  <span class="preset-preview">
                    {#if addon.presetPreview && PREVIEWS[addon.presetPreview.type]}
                      {@const PreviewC = PREVIEWS[addon.presetPreview.type]}
                      <PreviewC options={addon.presetPreview} settingData={addon.settings} settings={preset.values} />
                    {/if}
                  </span>
                  <span>{preset.name}</span>
                </button>
              </div>
            {/each}
          </div>
        {/if}
        {#if addon._relatedAddons && !S.isIframe}
          <div class="related-addons">
            <div class="addon-message">
              <span class="related-addons-text">{msg("relatedAddons")}</span>
              {#each addon._relatedAddons as relatedManifest, i (i)}
                <span>
                  <a href="#" onclick={(e) => openRelated(relatedManifest, e)}>{relatedManifest.name}</a>
                </span>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
{/if}
