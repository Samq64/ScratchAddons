import addonGroupsData from "./data/addon-groups.js";
import categoriesData from "./data/categories.js";

// Shared reactive settings state, accessible via plain imports.
// Replaces Vue's $root.* access pattern from the legacy code.
export const S = $state({
  smallMode: false,
  devMode: false,
  theme: false,
  forceEnglishSetting: null,
  forceEnglishSettingInitial: null,
  moreSettingsOpen: false,
  relatedAddonsOpen: false,
  relatedToAddonName: null,
  relatedAddons: [],
  relatedAddonsHistory: [],
  categoryOpen: true,
  loaded: false,
  searchLoaded: false,
  manifests: [],
  manifestsById: {},
  selectedCategory: "all",
  previousCategory: "all",
  searchInput: "",
  searchInputReal: "",
  addonSettings: {},
  addonToEnable: null,
  showPopupModal: false,
  isIframe: false,
  addonGroups: [],
  categories: categoriesData,
  browserLevelPermissions: ["notifications"],
  grantedOptionalPermissions: [],
  addonListObjs: [],
  sidebarUrls: { contributors: "", feedback: "", changelog: "" },
});

export function initS({ isIframe } = {}) {
  S.isIframe = !!isIframe;
  S.addonGroups = addonGroupsData
    .filter((g) => (isIframe ? g.iframeShow : g.fullscreenShow))
    .map((g) => ({ ...g, addonIds: [], expanded: g.expanded ?? false }));
  const uiLanguage = chrome.i18n.getUILanguage();
  const localeSlash = uiLanguage.startsWith("en") ? "" : `${uiLanguage.split("-")[0]}/`;
  const m = chrome.runtime.getManifest();
  const utm = `utm_source=extension&utm_medium=settingspage&utm_campaign=v${m.version}`;
  S.sidebarUrls = {
    contributors: `https://scratchaddons.com/${localeSlash}credits?${utm}`,
    feedback: `https://scratchaddons.com/${localeSlash}feedback/?ext_version=${m.version_name}&${utm}`,
    changelog: `https://scratchaddons.com/${localeSlash}changelog?${utm}`,
  };
}

// Event hub (replaces Vue $emit / $on)
const listeners = { "close-pickers": new Set(), "close-dropdowns": new Set(), "toggle-addon-request": new Set() };
export function on(event, handler) {
  if (!listeners[event]) listeners[event] = new Set();
  listeners[event].add(handler);
  return () => listeners[event].delete(handler);
}
export function emit(event, ...args) {
  if (!listeners[event]) return;
  for (const handler of [...listeners[event]]) handler(...args);
}

export function msg(message, ...params) {
  return chrome.i18n.getMessage(message, ...params);
}

export function direction() {
  // tags.js, settings page etc. rely on this matching webpages/rtl-list output.
  // The simpler approach is to defer to bidi_dir which is "rtl" or "ltr".
  return chrome.i18n.getMessage("@@bidi_dir");
}

export function updateSettings(addon, { wait = 0, settingId = null } = {}) {
  const value = settingId && S.addonSettings[addon._addonId][settingId];
  setTimeout(() => {
    if (!settingId || S.addonSettings[addon._addonId][settingId] === value) {
      chrome.runtime.sendMessage({
        changeAddonSettings: {
          addonId: addon._addonId,
          newSettings: S.addonSettings[addon._addonId],
        },
      });
    }
  }, wait);
}

export function closePickers(e, leaveOpen, { callCloseDropdowns = true } = {}) {
  emit("close-pickers", leaveOpen);
  if (callCloseDropdowns) closeDropdowns(e, leaveOpen);
}
export function closeDropdowns(e, leaveOpen) {
  emit("close-dropdowns", leaveOpen);
}
