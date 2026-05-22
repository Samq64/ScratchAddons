<script>
  let { element } = $props();
  let host = $state(null);

  $effect(() => {
    if (!host) return;
    if (!element) return;
    host.replaceChildren(element);
    return () => {
      try { host.removeChild(element); } catch {}
    };
  });
</script>

<div class="dom-element-renderer" bind:this={host}></div>

<style>
  .dom-element-renderer {
    display: contents;
  }
</style>
