<script>
  let { problems = [] } = $props();
  let current = $state(null);
  let showAnswer = $state(false);

  function generate() {
    const idx = Math.floor(Math.random() * problems.length);
    current = problems[idx];
    showAnswer = false;
  }

  // Start with one
  generate();
</script>

<div class="practice-zone">
  <div class="pz-header">
    <div class="pz-icon">🧩</div>
    <div>
      <h3 class="pz-title">Procvičování</h3>
      <p class="pz-sub">Vygeneruj si náhodný příklad a ověř své znalosti</p>
    </div>
  </div>

  {#if current}
    <div class="pz-card">
      <span class="pz-badge">{current.category}</span>
      <p class="pz-question">{current.question}</p>

      {#if showAnswer}
        <div class="pz-answer">
          <div class="pz-answer-label">✅ Řešení:</div>
          <p class="pz-answer-text">{current.answer}</p>
        </div>
      {/if}
    </div>
  {/if}

  <div class="pz-buttons">
    {#if !showAnswer}
      <button class="pz-btn pz-btn-reveal" onclick={() => showAnswer = true}>
        👁️ Zobrazit řešení
      </button>
    {/if}
    <button class="pz-btn pz-btn-new" onclick={generate}>
      🎲 Nový příklad
    </button>
  </div>
</div>

<style>
  .practice-zone {
    background: white;
    border-radius: 20px;
    padding: 28px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 6px 24px rgba(0,0,0,0.04);
    border: 1px solid #e5e7eb;
  }
  .pz-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;
  }
  .pz-icon {
    font-size: 32px;
    width: 52px; height: 52px;
    display: flex; align-items: center; justify-content: center;
    background: #fef3c7;
    border-radius: 14px;
  }
  .pz-title {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }
  .pz-sub {
    font-size: 13px;
    color: #6b7280;
    margin: 2px 0 0;
  }
  .pz-card {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    padding: 20px;
    margin-bottom: 16px;
  }
  .pz-badge {
    display: inline-block;
    background: #eef2ff;
    color: #4f46e5;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 3px 10px;
    border-radius: 99px;
    margin-bottom: 10px;
  }
  .pz-question {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
    line-height: 1.5;
  }
  .pz-answer {
    margin-top: 14px;
    padding: 14px;
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    border-radius: 10px;
    animation: fadeSlide 0.3s ease;
  }
  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .pz-answer-label {
    font-size: 12px;
    font-weight: 700;
    color: #065f46;
    margin-bottom: 4px;
  }
  .pz-answer-text {
    font-size: 15px;
    color: #064e3b;
    margin: 0;
    font-weight: 500;
  }
  .pz-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .pz-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s ease;
    font-family: inherit;
  }
  .pz-btn:active { transform: scale(0.96); }
  .pz-btn-reveal {
    background: #eef2ff;
    color: #4338ca;
  }
  .pz-btn-reveal:hover { background: #e0e7ff; }
  .pz-btn-new {
    background: #4f46e5;
    color: white;
  }
  .pz-btn-new:hover { background: #4338ca; }
</style>