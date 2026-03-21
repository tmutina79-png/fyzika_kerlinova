<script>
  // @ts-ignore
  const baseUrl = typeof __BASE_URL__ !== 'undefined' ? __BASE_URL__ : '';
  
  let { url = '', title = 'QR kód' } = $props();
  let open = $state(false);

  function onKey(e) {
    if (!open) return;
    if (e.key === 'Escape') open = false;
  }

  // Generování QR kódu pomocí Google Charts API (jako záloha) nebo inline SVG
  // Pro jednoduchost použijeme API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  const qrUrlLarge = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}`;
</script>

<svelte:window onkeydown={onKey} />

<button class="qr-btn" onclick={() => open = true} aria-label="Zobrazit QR kód" title={title}>
  <img src={qrUrl} alt="QR kód" class="qr-small" />
  <div class="qr-hint">
    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
      <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm11 0h3v3h-3v-3zm0-5h3v3h-3v-3zm-3 3h3v3h-3v-3zm3 5h3v3h-3v-3z"/>
    </svg>
    <span>📱</span>
  </div>
</button>

{#if open}
  <div class="modal-backdrop" role="dialog" aria-modal="true" onclick={() => open = false}>
    <div class="modal-content" onclick={(e) => e.stopPropagation()}>
      <button class="modal-close" onclick={() => open = false} aria-label="Zavřít">✕</button>
      <h3 class="modal-title">📱 Naskenuj QR kód</h3>
      <img src={qrUrlLarge} alt="QR kód" class="qr-large" />
      <p class="modal-url">{url}</p>
      <p class="modal-hint">Namiř fotoaparát mobilu na QR kód</p>
    </div>
  </div>
{/if}

<style>
  .qr-btn {
    all: unset;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: white;
    border: 2px solid #e2e8f0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    vertical-align: middle;
    margin-left: 12px;
  }
  .qr-btn:hover {
    transform: scale(1.1);
    border-color: #3b82f6;
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
  }
  .qr-small {
    width: 32px;
    height: 32px;
    border-radius: 4px;
  }
  .qr-hint {
    position: absolute;
    bottom: -6px;
    right: -6px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background: #3b82f6;
    color: white;
    border-radius: 50%;
    font-size: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .modal-content {
    background: white;
    border-radius: 20px;
    padding: 32px;
    text-align: center;
    max-width: 90vw;
    position: relative;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
  .modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border: none;
    background: #f1f5f9;
    color: #64748b;
    font-size: 20px;
    font-weight: bold;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  .modal-close:hover {
    background: #e2e8f0;
    color: #1e293b;
  }
  .modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 20px 0;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }
  .qr-large {
    width: 280px;
    height: 280px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  .modal-url {
    margin-top: 16px;
    font-size: 0.85rem;
    color: #3b82f6;
    word-break: break-all;
    font-family: monospace;
    background: #f1f5f9;
    padding: 8px 16px;
    border-radius: 8px;
  }
  .modal-hint {
    margin-top: 12px;
    font-size: 0.9rem;
    color: #64748b;
  }
</style>
