<script>
  // Embedded settings panel shown inside the main popup tab.
  // Mounts the standalone settings page in an iframe is not desired (per project goals),
  // so we re-mount the Settings component directly here with isIframe=true.
  import { onMount } from "svelte";
  import Settings from "../../settings/Settings.svelte";
  import { initS, S } from "$lib/settings/S.svelte.js";

  initS({ isIframe: true });
  // Mark body for iframe-style layout adjustments coming from settings/style.css.
  onMount(() => {
    document.body.classList.add("iframe");
    return () => document.body.classList.remove("iframe");
  });
</script>

<Settings />
