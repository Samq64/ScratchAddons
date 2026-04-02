export default function () {
  const prerelease = chrome.runtime.getManifest().version_name.includes("-prerelease");
  if (prerelease) {
    const blue = getComputedStyle(document.documentElement).getPropertyValue("--blue");
    document.documentElement.style.setProperty("--brand-orange", blue);
    const favicon = document.getElementById("favicon");
    if (favicon) favicon.href = chrome.runtime.getURL("/images/icon-blue.png");
  }
  return new Promise((resolve) => {
    chrome.storage.sync.get(["globalTheme"], ({ globalTheme = false }) => {
      // true = light, false = dark
      if (globalTheme === false || globalTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      }
      let theme = globalTheme;
      resolve({
        theme: globalTheme,
        setGlobalTheme(mode) {
          if (mode === theme) return;
          chrome.storage.sync.set({ globalTheme: mode }, () => {
            if (globalTheme === false || globalTheme === "dark") {
              document.documentElement.setAttribute("data-theme", "dark");
            } else {
              document.documentElement.setAttribute("data-theme");
            }
          });
          theme = mode;
        },
      });
    });
  });
}
