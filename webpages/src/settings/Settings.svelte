<script>
  import { msg } from "/src/lib/extension-api.js";
  import logo from "/src/assets/logo-transparent.svg";
  import ListView from "/src/components/ListView.svelte";
</script>

<nav class="shadow">
  <img src={logo} alt="Logo" class="logo" draggable="false" />
  <h1>{msg("Settings")}</h1>
</nav>

<main>
  <ListView />
</main>

<style>
  main {
    overflow-y: auto;
  }
</style>
