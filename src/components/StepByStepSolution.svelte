<script>
  let { steps = [], hint = "" } = $props();
  let currentStep = $state(0);
  let showHint = $state(false);
  let isOpen = $state(false);

  function toggleHint() {
    showHint = !showHint;
  }

  function toggleOpen() {
    isOpen = !isOpen;
    if (!isOpen) {
      currentStep = 0;
    }
  }

  function nextStep() {
    if (currentStep < steps.length) {
      currentStep++;
    }
  }

  function resetSteps() {
    currentStep = 0;
  }
</script>

<div class="sbs-wrapper">
  <!-- Nápověda (hint) -->
  {#if hint}
    <button class="hint-toggle" onclick={toggleHint}>
      <span class="hint-icon">💡</span>
      <span class="hint-label">Nápověda</span>
      <span class="hint-arrow" class:hint-arrow-open={showHint}>▶</span>
    </button>
    {#if showHint}
      <div class="hint-box">
        {@html hint}
      </div>
    {/if}
  {/if}

  <!-- Postup řešení (steps) -->
  <button class="steps-toggle" onclick={toggleOpen}>
    <span class="steps-icon">📝</span>
    <span class="steps-label">Postup řešení</span>
    <span class="steps-counter">({currentStep}/{steps.length} kroků)</span>
    <span class="steps-arrow" class:steps-arrow-open={isOpen}>▶</span>
  </button>

  {#if isOpen}
    <div class="steps-container">
      {#each steps as step, i}
        {#if i < currentStep}
          <div class="step-item" class:step-last={i === currentStep - 1 && currentStep < steps.length}>
            <div class="step-number">{i + 1}</div>
            <div class="step-content">
              {@html step}
            </div>
          </div>
        {/if}
      {/each}

      {#if currentStep === steps.length}
        <div class="step-complete">
          ✅ Kompletní řešení
        </div>
      {/if}

      <div class="step-controls">
        {#if currentStep < steps.length}
          <button class="btn-next" onclick={nextStep}>
            Další krok
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        {/if}

        {#if currentStep > 0}
          <button class="btn-reset" onclick={resetSteps}>
            ↩️ Od začátku
          </button>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .sbs-wrapper {
    margin: 1rem 0 1.5rem 0;
  }

  /* ── Hint toggle button ── */
  .hint-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.7rem 1rem;
    background: #fffbeb;
    border: 1px solid #fcd34d;
    border-radius: 10px;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.92rem;
    font-weight: 600;
    color: #92400e;
    transition: all 0.2s;
    text-align: left;
    margin-bottom: 0.4rem;
  }
  .hint-toggle:hover {
    background: #fef3c7;
    border-color: #f59e0b;
  }
  .hint-icon { font-size: 1.1rem; }
  .hint-label { flex: 1; }
  .hint-arrow {
    font-size: 0.7rem;
    transition: transform 0.25s ease;
    color: #b45309;
  }
  .hint-arrow-open {
    transform: rotate(90deg);
  }

  /* ── Hint box ── */
  .hint-box {
    background: #fffbeb;
    border: 1px solid #fcd34d;
    border-top: none;
    border-radius: 0 0 10px 10px;
    padding: 0.85rem 1.1rem;
    margin-top: -0.55rem;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    line-height: 1.65;
    color: #78350f;
    animation: fadeIn 0.2s ease;
  }
  .hint-box :global(strong) { color: #92400e; }

  /* ── Steps toggle button ── */
  .steps-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.7rem 1rem;
    background: #eff6ff;
    border: 1px solid #93c5fd;
    border-radius: 10px;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.92rem;
    font-weight: 600;
    color: #1e3a8a;
    transition: all 0.2s;
    text-align: left;
  }
  .steps-toggle:hover {
    background: #dbeafe;
    border-color: #3b82f6;
  }
  .steps-icon { font-size: 1.1rem; }
  .steps-label { flex: 1; }
  .steps-counter {
    font-size: 0.8rem;
    font-weight: 500;
    color: #3b82f6;
  }
  .steps-arrow {
    font-size: 0.7rem;
    transition: transform 0.25s ease;
    color: #2563eb;
  }
  .steps-arrow-open {
    transform: rotate(90deg);
  }

  /* ── Steps container ── */
  .steps-container {
    background: #f8faff;
    border: 1px solid #93c5fd;
    border-top: none;
    border-radius: 0 0 10px 10px;
    padding: 0.85rem 1rem;
    margin-top: -0.15rem;
    animation: fadeIn 0.2s ease;
  }

  /* ── Individual step ── */
  .step-item {
    display: flex;
    gap: 0.75rem;
    padding: 0.6rem 0;
    border-bottom: 1px solid #e2e8f0;
    animation: slideIn 0.3s ease;
  }
  .step-item.step-last {
    border-bottom: none;
  }
  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    min-width: 28px;
    border-radius: 50%;
    background: #3b82f6;
    color: white;
    font-weight: 700;
    font-size: 0.8rem;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }
  .step-content {
    flex: 1;
    font-size: 0.9rem;
    line-height: 1.7;
    color: #334155;
  }
  .step-content :global(strong) { color: #1e3a8a; }
  .step-content :global(.result) {
    display: inline-block;
    background: #dbeafe;
    color: #1e3a8a;
    font-weight: 700;
    padding: 0.2rem 0.65rem;
    border-radius: 6px;
    margin-top: 0.25rem;
  }

  /* ── Complete badge ── */
  .step-complete {
    text-align: center;
    padding: 0.6rem;
    margin-top: 0.5rem;
    background: #f0fdf4;
    border: 1px solid #86efac;
    border-radius: 8px;
    color: #166534;
    font-weight: 700;
    font-size: 0.9rem;
  }

  /* ── Controls ── */
  .step-controls {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 0.75rem;
    padding-top: 0.6rem;
    border-top: 1px solid #e2e8f0;
  }
  .btn-next {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.5rem 1.1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-next:hover {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
  }
  .btn-reset {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.45rem 0.9rem;
    background: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-family: inherit;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-reset:hover {
    background: #e2e8f0;
    color: #1e293b;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
