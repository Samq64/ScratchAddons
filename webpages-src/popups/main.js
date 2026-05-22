import { mount } from "svelte";
import Standalone from "./Standalone.svelte";
import { initGlobalTheme } from "$lib/global-theme.svelte.js";
import { applyLanguage } from "$lib/page-init.js";

document.documentElement.classList.add("fullscreen");
document.body.classList.add("fullscreen");

applyLanguage();
initGlobalTheme();

mount(Standalone, { target: document.getElementById("app") });
