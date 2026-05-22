// Shared per-page initialization formerly handled by set-lang.js / check-unsupported.js.

const RTL_LANGS = ["ar", "az", "ckb", "fa", "he", "ug", "ur", "yi"];
function getDirectionImpl(lang) {
  if (!lang) return "ltr";
  const short = lang.split("-")[0];
  return RTL_LANGS.includes(short) ? "rtl" : "ltr";
}

export function applyLanguage() {
  document.documentElement.lang = chrome.i18n.getUILanguage();
  document.body.dir = getDirectionImpl(chrome.i18n.getUILanguage());
}

export function checkUnsupported() {
  const getVersion = () => {
    const ua = /(Firefox|Chrome)\/([0-9.]+)/.exec(navigator.userAgent);
    if (!ua) return { browser: null, version: null };
    return { browser: ua[1], version: ua[2].split(".")[0] };
  };
  const { browser, version } = getVersion();
  const MIN_CHROME_VERSION = 96;
  const MIN_FIREFOX_VERSION = 109;
  const unsupported =
    (browser === "Chrome" && version < MIN_CHROME_VERSION) || (browser === "Firefox" && version < MIN_FIREFOX_VERSION);
  if (unsupported) {
    const isPopup = new URL(location.href).pathname.startsWith("/webpages/popup/");
    const urlToOpen = chrome.runtime.getURL("webpages/error/unsupported-browser.html");
    if (isPopup) chrome.tabs.create({ url: urlToOpen, active: true });
    else location.href = urlToOpen;
  }
}
