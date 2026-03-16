const manifest = chrome.runtime.getManifest();
export const version = manifest.version;
export const versionName = manifest.version_name;
export const getLanguage = chrome.i18n.getUILanguage;
export const msg = chrome.i18n.getMessage;
export const openSettingsPage = chrome.runtime.openOptionsPage;
