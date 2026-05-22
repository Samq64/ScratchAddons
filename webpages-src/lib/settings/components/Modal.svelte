<script>
  import { msg } from "../S.svelte.js";

  let { title, children, modalRef = $bindable() } = $props();
  let dialogEl = $state(null);

  $effect(() => {
    if (modalRef !== undefined) {
      modalRef = {
        showModal: () => dialogEl?.showModal(),
        close: () => dialogEl?.close(),
        el: () => dialogEl,
      };
    }
  });

  function closeModal() {
    dialogEl?.close();
  }
</script>

<dialog bind:this={dialogEl} closedby="any" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h1>{title}</h1>
      <button type="button" onclick={closeModal} class="close" title={msg("close")}>
        <img src={chrome.runtime.getURL("images/icons/close.svg")} draggable="false" alt="" />
      </button>
    </div>
    {@render children?.()}
  </div>
</dialog>

<style>
  .modal {
    background-color: var(--page-background);
    border: none;
    padding: 20px;
    width: 50rem;
    max-width: 75%;
    border-radius: 10px;
    height: 75%;
  }
  .modal::backdrop {
    background-color: var(--modal-overlay);
    backdrop-filter: blur(2px);
  }
  .modal-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .modal-header {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .close {
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .close > img {
    filter: var(--content-icon-filter);
    user-select: none;
  }
  @media (max-width: 700px) {
    .modal {
      width: 100%;
      max-width: none;
      height: 100%;
      max-height: 100%;
      box-sizing: border-box;
      border-radius: 0;
    }
  }
</style>
