import { mount } from "svelte";
import Settings from "./Settings.svelte";
import { initGlobalTheme, themeState } from "$lib/global-theme.svelte.js";
import { initS, S } from "$lib/settings/S.svelte.js";
import { applyLanguage, checkUnsupported } from "$lib/page-init.js";

applyLanguage();
checkUnsupported();
await initGlobalTheme();

const isIframe = window.parent !== window;
if (isIframe) document.body.classList.add("iframe");

initS({ isIframe });
S.theme = themeState.light;

mount(Settings, { target: document.getElementById("app") });
