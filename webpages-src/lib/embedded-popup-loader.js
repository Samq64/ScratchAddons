import Addon from "../../addon-api/popup/Addon.js";
import WebsiteLocalizationProvider from "../../libraries/common/website-l10n.js";

const sendMessage = (...args) => new Promise((resolve) => chrome.runtime.sendMessage(...args, resolve));

let initPromise = null;

export function initEmbeddedPopups() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const scratchAddons = (window.scratchAddons = window.scratchAddons || {});
    scratchAddons.eventTargets = scratchAddons.eventTargets || {
      auth: [],
      settings: [],
      self: [],
    };
    scratchAddons.localEvents = scratchAddons.localEvents || new EventTarget();
    scratchAddons.globalState = scratchAddons.globalState || {};
    scratchAddons.methods = scratchAddons.methods || {};
    scratchAddons.l10n = scratchAddons.l10n || new WebsiteLocalizationProvider();
    scratchAddons.isLightMode = scratchAddons.isLightMode || false;
    scratchAddons.cookieFetchingFailed = scratchAddons.cookieFetchingFailed || false;
    scratchAddons.cookies = scratchAddons.cookies || new Map();

    scratchAddons.methods.getEnabledAddons = (tag) => sendMessage({ getEnabledAddons: { tag } });

    await refetchCookies();
  })();
  return initPromise;
}

async function getCookieValue(name, getCookie, storeId) {
  return new Promise((resolve) => {
    chrome.cookies.get({ url: "https://scratch.mit.edu/", name, storeId }, (cookie) => {
      if (cookie && cookie.value) resolve(getCookie ? cookie : cookie.value);
      else resolve(null);
    });
  });
}

async function getActualCookieStore() {
  const current = await chrome.tabs.getCurrent();
  return current?.cookieStoreId || undefined;
}

async function refetchCookies(needsRequest = false) {
  if (needsRequest) {
    try {
      await fetch("https://scratch.mit.edu/csrf_token/");
    } catch (e) {
      console.error(e);
      window.scratchAddons.cookieFetchingFailed = true;
      return;
    }
  }
  const tabCookieStoreId = await getActualCookieStore();
  const scratchLang = (await getCookieValue("scratchlanguage", false, tabCookieStoreId)) || navigator.language;
  const csrfTokenCookie = await getCookieValue("scratchcsrftoken", true, tabCookieStoreId);
  window.scratchAddons.cookieStoreId = tabCookieStoreId || csrfTokenCookie?.storeId;
  window.scratchAddons.cookies.set("scratchlanguage", scratchLang);
  window.scratchAddons.cookies.set("scratchcsrftoken", csrfTokenCookie?.value);
}

async function refetchSession(addon) {
  let res;
  let d;
  if (window.scratchAddons.isFetchingSession) return;
  window.scratchAddons.isFetchingSession = true;
  addon.auth._refresh();
  try {
    res = await fetch("https://scratch.mit.edu/session/", {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
    d = await res.json();
  } catch (e) {
    d = {};
    console.warn("Session fetch failed: ", e);
    if ((res && !res.ok) || !res) setTimeout(() => refetchSession(addon), 60000);
  }
  window.scratchAddons.session = d;
  addon.auth._update(d);
  window.scratchAddons.isFetchingSession = false;
}

const addonContexts = new Map();

/**
 * Set up an Addon API context for a single embedded popup component.
 * Returns { addon, msg, safeMsg, dispose }.
 */
export async function createAddonContext(addonId, popupData) {
  await initEmbeddedPopups();

  if (addonContexts.has(addonId)) return addonContexts.get(addonId);

  const scratchAddons = window.scratchAddons;

  if (popupData?.settings) {
    scratchAddons.globalState.addonSettings = {
      ...(scratchAddons.globalState.addonSettings || {}),
      ...popupData.settings,
    };
  }

  const port = chrome.runtime.connect(undefined, { name: addonId });
  await new Promise((resolve) => {
    const handler = (value) => {
      if (value === "ping") {
        port.onMessage.removeListener(handler);
        resolve();
      }
    };
    port.onMessage.addListener(handler);
  });

  const addon = new Addon({ id: addonId });

  port.onMessage.addListener((request) => {
    if (request.newGlobalState) {
      scratchAddons.globalState = request.newGlobalState;
      return;
    }
    if (request.fireEvent && request.fireEvent.addonId === addonId) {
      scratchAddons.eventTargets[request.fireEvent.target]?.forEach((t) =>
        t.dispatchEvent(new CustomEvent(request.fireEvent.name))
      );
      return;
    }
    if (request.refetchSession) {
      refetchCookies(false).then(() => refetchSession(addon));
      return;
    }
  });

  await scratchAddons.l10n.loadByAddonId(addonId);
  refetchSession(addon);

  const msg = (key, placeholders) =>
    scratchAddons.l10n.get(key.startsWith("/") ? key.slice(1) : `${addonId}/${key}`, placeholders);
  msg.locale = scratchAddons.l10n.locale;

  const safeMsg = (key, placeholders) =>
    scratchAddons.l10n.escaped(key.startsWith("/") ? key.slice(1) : `${addonId}/${key}`, placeholders);

  const context = {
    addon,
    msg,
    safeMsg,
    dispose() {
      try {
        port.disconnect();
      } catch {}
      addonContexts.delete(addonId);
    },
  };
  addonContexts.set(addonId, context);
  return context;
}

/**
 * Fetch popup info (manifest + settings) for an addon. The background only allows requests
 * from /popups/. So for the new layout we get this data from `getSettingsInfo` instead.
 */
export async function fetchAllSettingsInfo() {
  return sendMessage("getSettingsInfo");
}
