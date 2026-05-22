<script>
  import { onMount } from "svelte";
  import { on, closeDropdowns, closePickers, updateSettings } from "../S.svelte.js";

  let { value, addon, setting, no_alpha = false, disabled = false, addonSettings } = $props();

  let isOpen = $state(false);
  let color = $state(value);
  let loadColorPicker = $state(false);
  let pickrEl = $state(null);

  const formats = $derived(no_alpha ? "hex,rgb,hsv,hsl" : "hex,hex8,rgb,hsv,hsl");

  const self = {};

  // Lazy-load the color-picker-web-component the first time the user hovers/clicks.
  $effect(() => {
    if (loadColorPicker && pickrEl) {
      const onInput = (e) => {
        color = "#" + e.detail.value;
        if (value !== color && pickrEl.hex8) {
          addonSettings[setting.id] = "#" + pickrEl.hex8;
          updateSettings(addon, { wait: 250, settingId: setting.id });
        }
      };
      pickrEl.addEventListener("input", onInput);
      return () => pickrEl.removeEventListener("input", onInput);
    }
  });

  $effect(() => {
    return on("close-pickers", (except) => {
      if (isOpen && self !== except) {
        toggle(false, { callCloseDropdowns: false, callClosePickers: false });
      }
    });
  });

  $effect(() => {
    color = value;
    pickrEl?._valueChanged?.();
  });

  $effect(() => {
    // refresh on isOpen
    void isOpen;
    pickrEl?._valueChanged?.();
  });

  function toggle(value2 = !isOpen, { callCloseDropdowns = true, callClosePickers = true } = {}) {
    if (!loadColorPicker) {
      loadColorPicker = true;
      // wait for next tick to mount picker, then re-enter
      queueMicrotask(() => toggle(value2, { callCloseDropdowns, callClosePickers }));
      return;
    }
    isOpen = value2;
    if (callClosePickers) closePickers(null, self, { callCloseDropdowns: false });
    if (callCloseDropdowns) closeDropdowns();
    pickrEl?._valueChanged?.();
    if (pickrEl?.hex8) {
      color = "#" + pickrEl.hex8;
      if (value !== color) {
        addonSettings[setting.id] = "#" + pickrEl.hex8;
        updateSettings(addon, { wait: 250, settingId: setting.id });
      }
    }
  }

  onMount(() => {
    import("../../../../libraries/thirdparty/color-picker.js").catch(() => {});
  });

  function onClick(e) {
    e.preventDefault();
    loadColorPicker = true;
    queueMicrotask(() => toggle());
  }
</script>

<div
  class="color-container"
  onclick={() => (loadColorPicker = true)}
  onmouseover={() => (loadColorPicker = true)}
  onfocus={() => (loadColorPicker = true)}
  role="presentation"
>
  <button
    type="button"
    style:background-color={color}
    class="setting-input color"
    class:action-disabled={!addon._enabled}
    class:open={isOpen}
    {disabled}
    onclick={onClick}
  ></button>
  {#if loadColorPicker}
    <color-picker
      bind:this={pickrEl}
      value={value ?? setting.default}
      id="picker"
      style:display={isOpen ? "" : "none"}
      formats={formats}
      no_alpha={String(no_alpha)}
      dir="ltr"
    ></color-picker>
  {/if}
</div>
