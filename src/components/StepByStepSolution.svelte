<script>
  let { title = '', steps = [] } = $props();
  let visibleCount = $state(0);

  function showNext() {
    if (visibleCount < steps.length) visibleCount++;
  }

  function hideLast() {
    if (visibleCount > 0) visibleCount--;
  }

  function reset() {
    visibleCount = 0;
  }
</script>

<div class="step-solution">
  <h4 class="step-title">{title}</h4>
  <div class="steps">
    {#each steps as step, i}
      <div class="step" class:revealed={i < visibleCount} class:current={i === visibleCount - 1} class:locked={i >= visibleCount}>
        {#if i < visibleCount}
          <div class="step-header revealed-header">
            <span class="step-num done">{i + 1}</span>
            <span class="step-label">{step.label}</span>
            {#if i === visibleCount - 1}
              <span class="step-badge">aktuální</span>
            {:else}
              <span class="step-check">✓</span>
            {/if}
          </div>
          <div class="step-content" class:current-content={i === visibleCount - 1}>
            {@html step.content}
          </div>
        {:else}
          <div class="step-header locked-header">
            <span class="step-num">{i + 1}</span>
            <span class="step-label-locked">{i === visibleCount ? 'Další krok…' : `Krok ${i + 1}`}</span>
            <span class="step-lock">{i === visibleCount ? '👆' : '🔒'}</span>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="controls">
    {#if visibleCount === 0}
      <button class="btn btn-next" onclick={showNext}>
        ▶ Zobrazit 1. krok
      </button>
    {:else if visibleCount < steps.length}
      <button class="btn btn-back" onclick={hideLast}>
        ◀ Zpět
      </button>
      <span class="progress">{visibleCount} / {steps.length}</span>
      <button class="btn btn-next" onclick={showNext}>
        Další krok ▶
      </button>
    {:else}
      <button class="btn btn-back" onclick={hideLast}>
        ◀ Zpět
      </button>
      <span class="progress complete">✅ Hotovo – {steps.length} / {steps.length}</span>
      <button class="btn btn-reset" onclick={reset}>
        ↺ Od začátku
      </button>
    {/if}
  </div>
</div>

<style>
  .step-solution {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.25rem;
    margin: 1rem 0;
  }
  .step-title {
    font-size: 1rem;
    font-weight: 700;
    color: #1e3a8a;
    margin: 0 0 0.75rem 0;
  }
  .steps { display: flex; flex-direction: column; gap: 0.5rem; }
  .step {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .step.current { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.15); }
  .step.revealed { border-color: #93c5fd; }
  .step.locked { opacity: 0.5; }

  .step-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    font-family: inherit;
    font-size: 0.9rem;
    text-align: left;
  }
  .revealed-header { background: white; }
  .locked-header { background: #f1f5f9; }

  .step-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #e2e8f0;
    color: #94a3b8;
    font-weight: 700;
    font-size: 0.8rem;
    flex-shrink: 0;
    transition: all 0.3s;
  }
  .step-num.done { background: #3b82f6; color: white; }
  .step-label { flex: 1; font-weight: 600; color: #334155; }
  .step-label-locked { flex: 1; font-weight: 500; color: #94a3b8; font-style: italic; }
  .step-check { color: #22c55e; font-size: 1rem; }
  .step-lock { font-size: 0.9rem; }
  .step-badge {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: #3b82f6;
    color: white;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
  }

  .step-content {
    padding: 0.75rem 1rem 1rem 3.5rem;
    background: #f0f9ff;
    border-top: 1px solid #e2e8f0;
    font-size: 0.88rem;
    line-height: 1.7;
    color: #334155;
    animation: fadeSlide 0.3s ease;
  }
  .step-content.current-content {
    background: #eff6ff;
    border-left: 3px solid #3b82f6;
  }
  .step-content :global(strong) { color: #1e3a8a; }
  .step-content :global(.result) {
    display: inline-block;
    background: #dbeafe;
    color: #1e3a8a;
    font-weight: 700;
    padding: 0.15rem 0.5rem;
    border-radius: 6px;
    margin-top: 0.25rem;
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 1rem;
    padding-top: 0.75rem;
    border-top: 1px solid #e2e8f0;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-next {
    background: #3b82f6;
    color: white;
  }
  .btn-next:hover { background: #2563eb; transform: translateY(-1px); box-shadow: 0 2px 8px rgba(37,99,235,0.3); }
  .btn-back {
    background: #e2e8f0;
    color: #475569;
  }
  .btn-back:hover { background: #cbd5e1; }
  .btn-reset {
    background: #fef3c7;
    color: #92400e;
  }
  .btn-reset:hover { background: #fde68a; }
  .progress {
    font-size: 0.8rem;
    font-weight: 600;
    color: #64748b;
  }
  .progress.complete { color: #16a34a; }

  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
