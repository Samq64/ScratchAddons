import { mount } from "svelte";
import Popup from "./Popup.svelte";
import { initGlobalTheme } from "$lib/global-theme.svelte.js";
import { applyLanguage, checkUnsupported } from "$lib/page-init.js";

import "./popup.css";

applyLanguage();
checkUnsupported();
initGlobalTheme();

mount(Popup, { target: document.getElementById("app") });
