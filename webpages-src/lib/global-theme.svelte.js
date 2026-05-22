export const themeState = $state({ light: false });

let lightThemeLink = null;

export async function initGlobalTheme() {
  const prerelease = chrome.runtime.getManifest().version_name.includes("-prerelease");
  if (prerelease) {
    const blue = getComputedStyle(document.documentElement).getPropertyValue("--blue");
    document.documentElement.style.setProperty("--brand-orange", blue);
    const favicon = document.getElementById("favicon");
    if (favicon) favicon.href = chrome.runtime.getURL("/images/icon-blue.png");
  }
  lightThemeLink = document.createElement("link");
  lightThemeLink.setAttribute("rel", "stylesheet");
  lightThemeLink.setAttribute("href", chrome.runtime.getURL("/webpages/styles/colors-light.css"));
  lightThemeLink.setAttribute("data-below-vue-components", "");
  lightThemeLink.media = "not all";
  document.head.appendChild(lightThemeLink);

  return new Promise((resolve) => {
    chrome.storage.sync.get(["globalTheme"], ({ globalTheme = false }) => {
      themeState.light = globalTheme === true;
      if (themeState.light) {
        lightThemeLink.removeAttribute("media");
      }
      resolve();
    });
  });
}

export function setGlobalTheme(light) {
  if (themeState.light === light) return;
  chrome.storage.sync.set({ globalTheme: light }, () => {
    if (light) lightThemeLink.removeAttribute("media");
    else lightThemeLink.media = "not all";
  });
  themeState.light = light;
}
