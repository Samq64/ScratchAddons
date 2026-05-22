export function msg(message, ...params) {
  return chrome.i18n.getMessage(message, ...params);
}

export function direction() {
  return chrome.i18n.getMessage("@@bidi_dir");
}

export function uiLanguage() {
  return chrome.i18n.getUILanguage();
}

export function manifest() {
  return chrome.runtime.getManifest();
}

export function isDevMode() {
  return new Promise((resolve) => {
    chrome.management.getSelf((info) => resolve(info.installType === "development"));
  });
}

export function sendMessage(message) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message, (res) => {
      void chrome.runtime.lastError;
      resolve(res);
    });
  });
}

export function extensionUrl(path) {
  return chrome.runtime.getURL(path);
}
