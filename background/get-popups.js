const POPUP_PREFIXES = [
  chrome.runtime.getURL("popups"),
  chrome.runtime.getURL("webpages/popup"),
  chrome.runtime.getURL("webpages/popups"),
];

const isPopupSender = (url) => url && POPUP_PREFIXES.some((p) => url.startsWith(p));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request?.requestPopupInfo) return;
  if (!isPopupSender(sender.url)) return;
  const handle = () => {
    const { addonId } = request.requestPopupInfo;
    const manifest = scratchAddons.manifests.find(
      ({ addonId: mAddonId, manifest: mManifest }) => addonId === mAddonId && mManifest.popup
    );
    if (!manifest) return;
    return {
      popup: manifest.manifest.popup,
      settings: JSON.parse(JSON.stringify(scratchAddons.globalState.addonSettings)),
    };
  };
  if (!scratchAddons.localState.allReady) {
    scratchAddons.localEvents.addEventListener("ready", () => sendResponse(handle()), { once: true });
    return true;
  }
  sendResponse(handle());
});

chrome.runtime.onConnect.addListener((port) => {
  if (!isPopupSender(port.sender.url)) return;
  const addonId = port.name;
  if (!scratchAddons.popupPorts[addonId]) scratchAddons.popupPorts[addonId] = [];
  scratchAddons.popupPorts[addonId].push(port);
  port.postMessage("ping");
  port.onDisconnect.addListener(() => {
    scratchAddons.popupPorts[port.name] = scratchAddons.popupPorts[port.name].filter((port2) => port2 !== port);
  });
});
