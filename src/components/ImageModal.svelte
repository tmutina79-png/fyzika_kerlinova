<script>
  let { src, alt = '' } = $props();
  let open = $state(false);

  function onKey(e) {
    if (!open) return;
    if (e.key === 'Escape') open = false;
  }
</script>

<svelte:window onkeydown={onKey} />

<button class="img-btn" onclick={() => open = true} aria-label="Zvětšit obrázek">
  <img {src} {alt} class="img-preview" />
  <div class="zoom-hint">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/><line x1="8" y1="11" x2="14" y2="11"/><line x1="11" y1="8" x2="11" y2="14"/></svg>
    <span>Zvětšit</span>
  </div>
</button>

{#if open}
  <div class="modal-backdrop" onclick={() => open = false} role="dialog" aria-modal="true">
    <div class="modal-wrap" onclick={(e) => e.stopPropagation()}>
      <button class="modal-close" onclick={() => open = false} aria-label="Zavřít">✕</button>
      <img {src} {alt} class="modal-img" />
    </div>
  </div>
{/if}

<style>
  .img-btn {
    all: unset;
    cursor: zoom-in;
    display: block;
    width: 100%;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .img-btn:hover {
    transform: scale(1.01);
    box-shadow: 0 6px 24px rgba(59, 130, 246, 0.2);
  }
  .img-preview {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 12px;
  }
  .zoom-hint {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(15, 23, 42, 0.75);
    color: #e2e8f0;
    font-size: 12px;
    font-weight: 600;
    font-family: 'Segoe UI', system-ui, sans-serif;
    padding: 5px 10px;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }
  .img-btn:hover .zoom-hint { opacity: 1; }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: fadeIn 0.2s ease;
    cursor: zoom-out;
  }
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

  .modal-wrap {
    position: relative;
    max-width: min(95vw, 1100px);
    max-height: 92vh;
    animation: scaleIn 0.25s ease;
    cursor: default;
  }
  @keyframes scaleIn { from { transform: scale(0.9); opacity: 0 } to { transform: scale(1); opacity: 1 } }

  .modal-img {
    display: block;
    max-width: 100%;
    max-height: 90vh;
    border-radius: 14px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  .modal-close {
    all: unset;
    cursor: pointer;
    position: absolute;
    top: -14px;
    right: -14px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #1e293b;
    color: #94a3b8;
    font-size: 16px;
    border: 1px solid #334155;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    z-index: 1;
  }
  .modal-close:hover {
    background: #7f1d1d;
    color: #fecaca;
    border-color: #ef4444;
  }
</style>
