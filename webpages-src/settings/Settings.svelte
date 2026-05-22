<script>
  import { onMount } from "svelte";
  import { S, msg, direction } from "$lib/settings/S.svelte.js";
  import { themeState, setGlobalTheme } from "$lib/global-theme.svelte.js";
  import CategorySelector from "$lib/settings/components/CategorySelector.svelte";
  import AddonGroupHeader from "$lib/settings/components/AddonGroupHeader.svelte";
  import AddonBody from "$lib/settings/components/AddonBody.svelte";
  import Modal from "$lib/settings/components/Modal.svelte";
  import Fuse from "fuse.js";
  import fuseOptions from "$lib/settings/data/fuse-options.js";
  import exampleManifest from "$lib/settings/data/example-manifest.js";
  import tags from "$lib/settings/data/tags.js";
  import { serializeSettings, deserializeSettings } from "$lib/settings/settings-utils.js";
  import downloadBlob from "../../libraries/common/cs/download-blob.js";
  import { isFirefox } from "../../libraries/common/cs/detect-browser.js";

  import "./style.css";

  const MORE_SETTINGS_HASH = "#moresettings";
  const ADDON_HASH_PREFIX = "#addon-";

  let moreSettingsModal = $state(null);
  let fuse = null;

  const searchMsg = msg("search");

  const themePath = $derived(S.theme ? chrome.runtime.getURL("images/icons/moon.svg") : chrome.runtime.getURL("images/icons/theme.svg"));

  const version = $derived(chrome.runtime.getManifest().version);
  const versionName = $derived(chrome.runtime.getManifest().version_name);

  const addonAmt = $derived(`${Math.floor(S.manifests.filter((a) => !a.tags.includes("easterEgg")).length / 5) * 5}+`);

  const selectedCategoryName = $derived(S.categories.find((c) => c.id === S.selectedCategory)?.name);

  const addonList = $derived.by(() => {
    if (!S.searchInput) {
      S.addonListObjs.forEach((obj) => {
        if (obj.group.id === "_iframeSearch") obj.matchesSearch = false;
        else obj.matchesSearch = true;
      });
      return S.addonListObjs.slice().sort((b, a) => b.naturalIndex - a.naturalIndex);
    }
    if (!fuse) return [];
    const addonListObjs = Object.values(
      S.addonListObjs.reduce((acc, cur) => {
        if (!acc[cur.manifest._addonId] || (acc[cur.manifest._addonId] && cur.group.id !== "featuredNew" && cur.group.id !== "new")) {
          acc[cur.manifest._addonId] = cur;
        }
        return acc;
      }, Object.create(null))
    );
    const fuseSearch = fuse.search(S.searchInput).sort((a, b) => {
      if ((a.score < 0.1) ^ (b.score < 0.1)) return a.score < 0.1 ? -1 : 1;
      return b.item._enabled - a.item._enabled;
    });
    const results = fuseSearch.map((r) => addonListObjs.find((o) => o.manifest._addonId === r.item._addonId));
    for (const obj of addonListObjs) obj.matchesSearch = results.includes(obj);
    return addonListObjs.sort((b, a) => results.indexOf(b) - results.indexOf(a));
  });

  const hasNoResults = $derived(!addonList.some((a) => a.matchesSearch && a.matchesCategory));

  function groupShownCount(group) {
    if (group.id === "_iframeSearch") return -1;
    return S.addonListObjs.filter((a) => a.group === group && a.matchesSearch && a.matchesCategory).length;
  }
  function groupMarginAbove(group) {
    const firstVisibleGroup = S.addonGroups.find((g) => groupShownCount(g) > 0);
    return group !== firstVisibleGroup;
  }

  function setTheme(mode) {
    setGlobalTheme(mode);
    S.theme = mode;
  }

  function sidebarToggle() {
    S.categoryOpen = !S.categoryOpen;
  }

  function clearSearch() {
    S.searchInputReal = "";
  }
  function clearAndFocusSearch() {
    clearSearch();
    document.querySelector("#searchBox")?.focus();
  }

  function openMoreSettings() {
    moreSettingsModal?.showModal();
    if (S.smallMode) S.categoryOpen = false;
    location.hash = "";
  }

  function backRelatedAddon() {
    const addon = S.relatedAddonsHistory.pop();
    if (S.relatedAddonsHistory.length === 0) {
      S.relatedAddonsOpen = false;
      S.selectedCategory = S.previousCategory;
    } else {
      openRelatedAddons(S.relatedAddonsHistory.at(-1), false);
    }
    blinkAddon(addon._addonId);
  }

  function openRelatedAddons(addonManifest, log = true) {
    S.relatedToAddonName = addonManifest.name;
    S.relatedAddons.length = 0;
    if (S.relatedAddonsHistory.length === 0) {
      S.previousCategory = S.selectedCategory;
      S.selectedCategory = "all";
      S.relatedAddonsOpen = true;
    }
    if (log) S.relatedAddonsHistory.push(addonManifest);
    for (const related of addonManifest._relatedAddons) S.relatedAddons.push(related);
  }

  function blinkAddon(addonId) {
    setTimeout(() => {
      const el = document.getElementById("addon-" + addonId);
      if (!el) return;
      el.scrollIntoView();
      el.classList.add("addon-blink");
      setTimeout(() => el.classList.remove("addon-blink"), 2001);
    }, 0);
  }

  function exportSettings() {
    serializeSettings().then((serialized) => {
      const blob = new Blob([serialized], { type: "application/json" });
      downloadBlob("scratch-addons-settings.json", blob);
    });
  }

  function viewSettings() {
    const w = window.open("about:blank");
    serializeSettings().then((serialized) => {
      const blob = new Blob([serialized], { type: "text/plain" });
      w.location.replace(URL.createObjectURL(blob));
    });
  }

  function importSettings() {
    const inputElem = Object.assign(document.createElement("input"), {
      hidden: true, type: "file", accept: "application/json",
    });
    inputElem.addEventListener("change", async () => {
      const file = inputElem.files[0];
      if (!file) {
        inputElem.remove();
        alert(chrome.i18n.getMessage("fileNotSelected"));
        return;
      }
      const text = await file.text();
      inputElem.remove();
      const confirmElem = document.getElementById("confirmImport");
      try {
        await deserializeSettings(text, S.manifests, confirmElem, {
          browserLevelPermissions: S.browserLevelPermissions,
        });
      } catch (e) {
        console.warn("Error when importing settings:", e);
        confirmElem.classList.add("hidden-button");
        alert(chrome.i18n.getMessage("importFailed"));
        return;
      }
      alert(chrome.i18n.getMessage("importSuccess"));
      chrome.runtime.reload();
    }, { once: true });
    document.body.appendChild(inputElem);
    inputElem.click();
  }

  function applyLanguageSettings() {
    alert(chrome.i18n.getMessage("importSuccess"));
    chrome.runtime.reload();
  }

  function openFullSettings() {
    window.open(
      `${chrome.runtime.getURL("webpages/settings/index.html")}${ADDON_HASH_PREFIX}${S.addonToEnable?._addonId ?? ""}`
    );
    setTimeout(() => window.parent.close(), 100);
  }

  function hidePopup() {
    S.showPopupModal = false;
  }

  $effect(() => {
    // Debounce searchInputReal -> searchInput
    const value = S.searchInputReal;
    if (value === "") {
      S.searchInput = value;
      return;
    }
    const timeout = setTimeout(() => {
      if (S.searchInputReal === value) S.searchInput = value;
    }, 150);
    return () => clearTimeout(timeout);
  });

  $effect(() => {
    const newValue = S.selectedCategory;
    S.addonListObjs.forEach((obj) => {
      const shouldHide = obj.manifest._categories[0] === "easterEgg" &&
        newValue !== "easterEgg" &&
        obj.manifest._wasEverEnabled === false;
      obj.matchesCategory = !shouldHide && (newValue === "all" || obj.manifest._categories.includes(newValue));
    });
    if (newValue === "forums") {
      const g = S.addonGroups.find((g) => g.id === "forums");
      if (g) g.expanded = true;
    }
  });

  $effect(() => {
    const newValue = S.forceEnglishSetting;
    const oldValue = S.forceEnglishSettingInitial;
    if (oldValue !== null && newValue !== null) {
      chrome.storage.local.set({ forceEnglish: newValue });
    }
  });

  function onOpenRelated(e) {
    const { addon } = e.detail;
    openRelatedAddons(addon);
    blinkAddon(e.detail.clickedAddon._addonId);
  }

  onMount(() => {
    document.title = chrome.i18n.getMessage("settingsTitle");

    // Autofocus search bar in iframe mode for both browsers
    if (S.isIframe || isFirefox()) setTimeout(() => document.getElementById("searchBox")?.focus(), 0);

    // Browser-level permissions setup
    const browserLevelPermissions = ["notifications"];
    if (isFirefox() && typeof Clipboard.prototype.write !== "function") {
      browserLevelPermissions.push("clipboardWrite");
    }
    S.browserLevelPermissions = browserLevelPermissions;
    const updateGranted = () => {
      chrome.permissions.getAll(({ permissions }) => {
        S.grantedOptionalPermissions = permissions.filter((p) => browserLevelPermissions.includes(p));
      });
    };
    updateGranted();
    chrome.permissions.onAdded?.addListener(updateGranted);
    chrome.permissions.onRemoved?.addListener(updateGranted);

    // Skeleton placeholders
    const exampleAddonListItem = {
      group: S.addonGroups[0],
      manifest: JSON.parse(JSON.stringify(exampleManifest)),
      matchesSearch: true,
      matchesCategory: true,
      naturalIndex: -1,
      headerAbove: false,
      footerBelow: false,
      duplicate: false,
    };
    setTimeout(() => {
      if (!S.loaded) {
        S.addonListObjs = Array(25).fill("").map(() => JSON.parse(JSON.stringify(exampleAddonListItem)));
      }
    }, 0);

    chrome.storage.local.get("forceEnglish", ({ forceEnglish }) => {
      S.forceEnglishSettingInitial = forceEnglish ?? false;
      S.forceEnglishSetting = forceEnglish ?? false;
    });

    const onHash = () => {
      if (location.hash === MORE_SETTINGS_HASH) {
        openMoreSettings();
      } else if (location.hash.startsWith(ADDON_HASH_PREFIX)) {
        const addonId = location.hash.substring(ADDON_HASH_PREFIX.length);
        const groupWithAddon = S.addonGroups.find((g) => g.addonIds.includes(addonId));
        if (!groupWithAddon) return;
        const addon = S.manifestsById[addonId];
        groupWithAddon.expanded = true;
        S.selectedCategory = addon?.tags.includes("easterEgg") ? "easterEgg" : "all";
        clearSearch();
        setTimeout(() => document.getElementById("addon-" + addonId)?.scrollIntoView(), 0);
      }
    };
    window.addEventListener("hashchange", onHash);

    // Load manifests + settings
    chrome.runtime.sendMessage("getSettingsInfo", async ({ manifests, addonsEnabled, addonSettings }) => {
      S.addonSettings = addonSettings;
      const cleanManifests = [];
      let iframeData;
      if (S.isIframe) iframeData = await getRunningAddons();
      const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
      for (const { manifest, addonId } of manifests) {
        manifest._categories = [];
        manifest._categories[0] = manifest.tags.includes("popup")
          ? "popup"
          : manifest.tags.includes("easterEgg")
            ? "easterEgg"
            : manifest.tags.includes("theme")
              ? "theme"
              : manifest.tags.includes("community")
                ? "community"
                : manifest.tags.includes("player")
                  ? "player"
                  : "editor";

        const addCategoryIfTag = (arr) => {
          let count = 0;
          for (const objOrString of arr) {
            const tagName = typeof objOrString === "object" ? objOrString.tag : objOrString;
            const categoryName = typeof objOrString === "object" ? objOrString.category : tagName;
            if (manifest.tags.includes(tagName)) {
              manifest._categories.push(categoryName);
              count++;
            }
          }
          return count;
        };
        if (manifest._categories[0] === "theme") {
          addCategoryIfTag([{ tag: "editor", category: "themesForEditor" }]) ||
            addCategoryIfTag([{ tag: "community", category: "themesForWebsite" }]) ||
            addCategoryIfTag([{ tag: "player", category: "themesForPlayer" }]);
        } else if (manifest._categories[0] === "editor") {
          const added = addCategoryIfTag(["codeEditor", "costumeEditor"]);
          if (added === 0) manifest._categories.push("editorOthers");
        } else if (manifest._categories[0] === "community") {
          const added = addCategoryIfTag(["profiles", "projectPage", "forums"]);
          if (added === 0) manifest._categories.push("communityOthers");
        }
        if (addonId === "cat-blocks") manifest._categories.push("easterEgg");
        manifest._icon = manifest._categories[0];
        manifest._enabled = addonsEnabled[addonId];
        manifest._wasEverEnabled = manifest._enabled;
        manifest._addonId = addonId;
        manifest._groups = [];

        if (manifest.versionAdded) {
          const [extMajor, extMinor] = version.split(".");
          const [addonMajor, addonMinor] = manifest.versionAdded.split(".");
          if (extMajor === addonMajor && extMinor === addonMinor) {
            manifest.tags.push("new");
            manifest._groups.push(manifest.tags.includes("recommended") || manifest.tags.includes("featured") ? "featuredNew" : "new");
          }
        }
        if (manifest.latestUpdate) {
          const [extMajor, extMinor] = version.split(".");
          const [addonMajor, addonMinor] = manifest.latestUpdate.version.split(".");
          if (extMajor === addonMajor && extMinor === addonMinor) {
            manifest.tags.push(manifest.latestUpdate.newSettings?.length ? "updatedWithSettings" : "updated");
            manifest._groups.push(manifest.latestUpdate.isMajor ? "featuredNew" : "new");
          }
        }
        const order = tags.map((obj) => obj.matchName);
        manifest.tags.sort((b, a) => order.indexOf(b) - order.indexOf(a));

        if (iframeData?.addonsCurrentlyOnTab.includes(addonId)) manifest._groups.push("runningOnTab");
        else if (iframeData?.addonsPreviouslyOnTab.includes(addonId)) manifest._groups.push("recentlyUsed");

        if (manifest._enabled) manifest._groups.push("enabled");
        else if (manifest.tags.includes("recommended")) manifest._groups.push("recommended");
        else if (manifest.tags.includes("featured")) manifest._groups.push("featured");
        else if (manifest.tags.includes("beta") || manifest.tags.includes("danger")) manifest._groups.push("beta");
        else if (manifest.tags.includes("forums")) manifest._groups.push("forums");
        else manifest._groups.push("others");

        for (const groupId of manifest._groups) {
          S.addonGroups.find((g) => g.id === groupId)?.addonIds.push(manifest._addonId);
        }
        cleanManifests.push(deepClone(manifest));
      }

      for (const { manifest } of manifests) {
        if (manifest.relatedAddons) {
          manifest._relatedAddons = manifest.relatedAddons.map(
            (relatedAddonId) => manifests.find(({ addonId }) => addonId === relatedAddonId)?.manifest
          ).filter(Boolean);
        }
      }

      for (const { manifest } of manifests) S.manifestsById[manifest._addonId] = manifest;
      S.manifests = manifests.map(({ manifest }) => manifest);

      fuse = new Fuse(cleanManifests, fuseOptions);

      const checkTag = (tagOrTags, A, B) => {
        const ts = Array.isArray(tagOrTags) ? tagOrTags : [tagOrTags];
        const aHas = ts.some((tag) => A.tags.includes(tag));
        const bHas = ts.some((tag) => B.tags.includes(tag));
        if (aHas ^ bHas) return bHas - aHas;
        if (aHas && bHas) return A.name.localeCompare(B.name);
        return null;
      };
      const orderArr = [["danger", "beta"], "editor", "player", "community", "popup"];
      S.addonGroups.forEach((group) => {
        group.addonIds = group.addonIds
          .map((id) => S.manifestsById[id])
          .sort((A, B) => {
            for (const tag of group.customOrder || orderArr) {
              const val = checkTag(tag, A, B);
              if (val !== null) return val;
            }
            return 0;
          })
          .map((addon) => addon._addonId);
      });

      if (S.isIframe) {
        const addonsInGroups = [];
        for (const group of S.addonGroups) group.addonIds.forEach((id) => addonsInGroups.push(id));
        const searchGroup = S.addonGroups.find((g) => g.id === "_iframeSearch");
        if (searchGroup) searchGroup.addonIds = Object.keys(S.manifestsById).filter((id) => !addonsInGroups.includes(id));
      }

      let naturalIndex = 0;
      const newObjs = [];
      for (const group of S.addonGroups) {
        group.addonIds.forEach((addonId, groupIndex) => {
          const obj = {
            manifest: S.manifestsById[addonId],
            group,
            matchesSearch: false,
            matchesCategory: !(S.manifestsById[addonId]._categories[0] === "easterEgg" && S.manifestsById[addonId]._enabled === false),
            naturalIndex,
            headerAbove: groupIndex === 0,
            footerBelow: groupIndex === group.addonIds.length - 1,
            duplicate: newObjs.some((a) => a.manifest._addonId === addonId),
          };
          newObjs.push(obj);
          naturalIndex++;
        });
      }
      S.addonListObjs = newObjs;
      S.loaded = true;

      setTimeout(onHash, 0);

      let binaryNum = "";
      manifests.forEach(({ addonId }) => (binaryNum += addonsEnabled[addonId] === true ? "1" : "0"));
      const addonsEnabledBase36 = BigInt(`0b${binaryNum}`).toString(36);
      S.sidebarUrls.feedback += `#_${addonsEnabledBase36}`;
    });

    // Keyboard shortcuts
    const onKey = (e) => {
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        document.querySelector("#searchBox")?.focus();
      } else if (e.key === "Escape") {
        if (document.activeElement === document.querySelector("#searchBox") && S.searchInputReal.length > 0) {
          e.preventDefault();
          S.searchInputReal = "";
        } else if (S.categoryOpen && S.smallMode) {
          S.categoryOpen = false;
        }
      }
    };
    window.addEventListener("keydown", onKey);

    // Responsive
    const resize = () => {
      if (window.innerWidth < 1100) {
        S.smallMode = true;
        S.categoryOpen = false;
      } else if (S.smallMode !== false) {
        S.smallMode = false;
        S.categoryOpen = true;
      }
    };
    window.addEventListener("resize", resize);
    resize();

    chrome.management.getSelf((info) => {
      if (info.installType === "development") S.devMode = true;
    });

    // Konami code
    let cursor = 0;
    const KONAMI_CODE = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
    const konami = (e) => {
      cursor = e.key.toLowerCase() === KONAMI_CODE[cursor] ? cursor + 1 : 0;
      if (cursor === KONAMI_CODE.length) {
        S.selectedCategory = "easterEgg";
        setTimeout(() => (S.searchInputReal = ""), 0);
      }
    };
    document.addEventListener("keydown", konami);

    document.addEventListener("sa:openRelated", onOpenRelated);

    if (!S.isIframe) chrome.runtime.sendMessage("checkPermissions");

    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
      document.removeEventListener("keydown", konami);
      document.removeEventListener("sa:openRelated", onOpenRelated);
    };
  });

  function getRunningAddons() {
    return new Promise((resolve) => {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        if (!tabs[0]?.id) return resolve({ addonsCurrentlyOnTab: [], addonsPreviouslyOnTab: [] });
        chrome.tabs.sendMessage(tabs[0].id, "getRunningAddons", { frameId: 0 }, (res) => {
          void chrome.runtime.lastError;
          const addonsCurrentlyOnTab = res ? [...res.userscripts, ...res.userstyles] : [];
          const addonsPreviouslyOnTab = res ? res.disabledDynamicAddons : [];
          resolve({ addonsCurrentlyOnTab, addonsPreviouslyOnTab });
        });
      });
    });
  }
</script>

<svelte:body class:light={S.theme} />

<div class="navbar">
  {#if S.smallMode}
    <button
      type="button"
      id="sidebar-toggle"
      class="header-button"
      class:sidebarToggleOpen={S.categoryOpen}
      title={msg("toggleSidebar")}
      onclick={sidebarToggle}
    >
      <img src={chrome.runtime.getURL("images/icons/menu.svg")} draggable="false" alt="" />
    </button>
  {/if}
  <img src={chrome.runtime.getURL("images/icon-transparent.svg")} class="logo" alt="Logo" draggable="false" />
  <h1>{msg("settings")}</h1>
  <button
    type="button"
    onclick={() => setTheme(!S.theme)}
    class="header-button header-end"
    title={msg(S.theme ? "switchDark" : "switchLight")}
  >
    <img class="theme-switch" src={themePath} draggable="false" alt="" />
  </button>
</div>

<div class="main">
  {#if !S.isIframe}
    <div
      class="categories-block"
      class:closed={!S.categoryOpen}
      class:smallMode={S.smallMode}
    >
      {#each S.categories as category (category.id)}
        <CategorySelector {category} />
      {/each}

      <a class="category" style="margin-top: auto" href={S.sidebarUrls.contributors} target="_blank">
        <img src={chrome.runtime.getURL("images/icons/users.svg")} draggable="false" alt="" />
        <span>{msg("credits")} <img src={chrome.runtime.getURL("images/icons/popout.svg")} draggable="false" alt="" /></span>
      </a>
      <a class="category" href="https://scratchaddons.com/translate" target="_blank">
        <img src={chrome.runtime.getURL("images/icons/translate.svg")} draggable="false" alt="" />
        <span>{msg("translate")} <img src={chrome.runtime.getURL("images/icons/popout.svg")} draggable="false" alt="" /></span>
      </a>
      <a class="category" href={S.sidebarUrls.feedback} target="_blank">
        <img src={chrome.runtime.getURL("images/icons/comment.svg")} draggable="false" alt="" />
        <span>{msg("feedback")} <img src={chrome.runtime.getURL("images/icons/popout.svg")} draggable="false" alt="" /></span>
      </a>
      <button type="button" class="category" style="margin-top: 12px; margin-bottom: 14px" onclick={openMoreSettings}>
        <img src={chrome.runtime.getURL("images/icons/wrench.svg")} draggable="false" alt="" />
        <span>{msg("moreSettings")}</span>
      </button>
    </div>

    {#if !S.smallMode}
      <button type="button" class="categories-shrink" onclick={sidebarToggle} title={msg("toggleSidebar")}>
        <img
          src={chrome.runtime.getURL("images/icons/left-arrow.svg")}
          class:flipped={S.categoryOpen === (direction() === "rtl")}
          draggable="false"
          alt=""
        />
      </button>
    {/if}
  {/if}

  <div class="addons-block">
    <div class="addons-block-header">
      {#if !S.isIframe}
        <div class="category-header-title">
          {#if S.relatedAddonsOpen}
            <div class="related-addons-header">
              <button type="button" class="arrow-button" title={msg("back")} onclick={backRelatedAddon}>
                <img src={chrome.runtime.getURL("images/icons/left-arrow.svg")} draggable="false" alt="" />
              </button>
              <span>{msg("relatedTo", S.relatedToAddonName)}</span>
            </div>
          {:else}
            <span>{selectedCategoryName}</span>
          {/if}
        </div>
      {/if}
      {#if !S.relatedAddonsOpen}
        <div class="search-box" class:smallMode={S.smallMode}>
          <input type="text" id="searchBox" placeholder={searchMsg} bind:value={S.searchInputReal} autofocus />
          {#if S.searchInput === ""}
            <button type="button" disabled>
              <img src={chrome.runtime.getURL("images/icons/search.svg")} class="search-icon" alt="" />
            </button>
          {:else}
            <button type="button" onclick={clearAndFocusSearch}>
              <img src={chrome.runtime.getURL("images/icons/x.svg")} class="search-icon" alt="" />
            </button>
          {/if}
        </div>
      {/if}
    </div>

    <div class="addons-container" class:placeholder={!S.loaded}>
      {#if S.searchInput && hasNoResults}
        <p id="search-not-found">{msg("searchNotFound")}</p>
      {/if}
      {#if S.relatedAddonsOpen}
        {#each S.relatedAddons as related, i (i)}
          <AddonBody visible={true} addon={related} groupId="enabled" groupExpanded={true} />
        {/each}
      {:else}
        {#each addonList as addon, i (i)}
          <div>
            {#if S.isIframe && addon.headerAbove && (hasNoResults || addon.group.id === "enabled") && S.searchInput === ""}
              <div id="iframe-fullscreen-suggestion">
                <span>{msg("exploreAllAddons", [addonAmt])}</span>
                <button type="button" class="large-button" onclick={openFullSettings}>{msg("openFullSettings")}</button>
              </div>
            {/if}
            {#if addon.headerAbove}
              <AddonGroupHeader group={addon.group} shownCount={groupShownCount(addon.group)} marginAbove={groupMarginAbove(addon.group)} />
            {/if}
            <AddonBody
              visible={addon.matchesSearch && addon.matchesCategory}
              addon={addon.manifest}
              groupId={addon.group.id}
              groupExpanded={addon.group.expanded}
            />
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>

<Modal bind:modalRef={moreSettingsModal} title={msg("moreSettings")}>
  <div class="addon-block settings-block">
    <div class="addon-body">
      <div class="addon-topbar">
        <img src={chrome.runtime.getURL("images/icons/theme.svg")} class="icon-type addon-icon" draggable="false" alt="" />
        <span class="addon-name-and-tags">{msg("scratchAddonsTheme")}</span>
      </div>
      <div class="addon-settings">
        <span class="addon-description-full">{msg("scratchAddonsThemeDescription")}</span>
        <div class="addon-setting">
          <div class="filter-selector">
            <div class="filter-text">{msg("theme")}</div>
            <div class="filter-options" role="radiogroup">
              <div>
                <input type="radio" name="theme-selector" id="theme-select-light" checked={S.theme === true} onchange={() => setTheme(true)} />
                <label for="theme-select-light" class="filter-option">{msg("light")}</label>
              </div>
              <div>
                <input type="radio" name="theme-selector" id="theme-select-dark" checked={S.theme === false} onchange={() => setTheme(false)} />
                <label for="theme-select-dark" class="filter-option">{msg("dark")}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="addon-body">
      <div class="addon-topbar">
        <img src={chrome.runtime.getURL("images/icons/import-export.svg")} class="icon-type addon-icon" class:dark={S.theme === false} draggable="false" alt="" />
        <span class="addon-name-and-tags">{msg("exportAndImportSettings")}</span>
      </div>
      <div class="addon-settings">
        <span class="addon-description-full">{msg("exportAndImportSettingsDescription")}</span>
        <span class="addon-description-full">{msg("useBrowserSync")}</span>
        <div class="addon-setting export-actions">
          <div class="export-actions-group">
            <button type="button" class="large-button" onclick={exportSettings}>{msg("export")}</button>
            <button type="button" class="large-button" onclick={importSettings}>{msg("import")}</button>
            <button type="button" class="large-button hidden-button" id="confirmImport">{msg("confirmImport")}</button>
          </div>
          <div class="export-actions-group">
            <button type="button" class="large-button" onclick={viewSettings}>{msg("viewSettings")}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="addon-body">
      <div class="addon-topbar">
        <img src={chrome.runtime.getURL("images/icons/translate.svg")} class="icon-type addon-icon" draggable="false" alt="" />
        <span class="addon-name-and-tags">{msg("language")}</span>
      </div>
      <div class="addon-settings">
        <div class="addon-setting" style="margin-top: 0">
          <input type="checkbox" class="switch" bind:checked={S.forceEnglishSetting} style="margin-inline-start: 0; margin-inline-end: 8px" />
          <span>Show addon names and descriptions in English</span>
          <div class="badge red">{msg("beta")}</div>
          {#if S.forceEnglishSetting !== null && S.forceEnglishSetting !== S.forceEnglishSettingInitial}
            <button type="button" class="large-button" id="applyLanguageSettingsButton" onclick={applyLanguageSettings} style="margin-inline-start: 16px">
              {msg("applySettings")}
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <p>
      {msg("extensionName")}
      <a href={S.sidebarUrls.changelog} title={msg("changelog")} target="_blank">v{version}</a>
    </p>
    <p>
      <a href="./licenses.html?libraries=icu-message-formatter,svelte,color-picker-web-component,comlink,Sora,fuse,idb,sortable,Roboto" target="_blank">{msg("libraryCredits")}</a>
    </p>
  </div>
</Modal>

{#if S.showPopupModal}
  <div class="popup">
    <div class="label">{msg("settingsPagePermission", S.addonToEnable ? S.addonToEnable.name : "")}</div>
    <div>
      <button type="button" class="large-button" onclick={openFullSettings}>{msg("openFullSettings")}</button>
      <button type="button" class="large-button" onclick={hidePopup}>{msg("skipOpenFullSettings")}</button>
    </div>
  </div>
{/if}
