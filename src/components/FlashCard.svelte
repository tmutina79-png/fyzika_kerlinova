<script>
  let { cards = [] } = $props();
  let index = $state(0);
  let flipped = $state(false);

  function next() {
    flipped = false;
    setTimeout(() => { index = (index + 1) % cards.length; }, 150);
  }
  function prev() {
    flipped = false;
    setTimeout(() => { index = (index - 1 + cards.length) % cards.length; }, 150);
  }

  let card = $derived(cards[index]);
</script>

<div class="fc-wrapper">
  <div class="fc-header">
    <div class="fc-icon">🃏</div>
    <div>
      <h3 class="fc-title">Flashcards</h3>
      <p class="fc-sub">Klikni na kartičku pro otočení</p>
    </div>
    <span class="fc-counter">{index + 1} / {cards.length}</span>
  </div>

  <div class="fc-scene" onclick={() => flipped = !flipped} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && (flipped = !flipped)}>
    <div class="fc-card" class:fc-flipped={flipped}>
      <div class="fc-face fc-front">
        <span class="fc-face-label">Otázka</span>
        <p class="fc-face-text">{card?.question}</p>
        <span class="fc-hint">klikni pro odpověď →</span>
      </div>
      <div class="fc-face fc-back">
        <span class="fc-face-label">Odpověď</span>
        <p class="fc-face-text">{card?.answer}</p>
      </div>
    </div>
  </div>

  <div class="fc-nav">
    <button class="fc-nav-btn" onclick={prev}>← Předchozí</button>
    <button class="fc-nav-btn" onclick={next}>Další →</button>
  </div>
</div>

<style>
  .fc-wrapper {
    background: white;
    border-radius: 20px;
    padding: 28px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 6px 24px rgba(0,0,0,0.04);
    border: 1px solid #e5e7eb;
  }
  .fc-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;
  }
  .fc-icon {
    font-size: 32px;
    width: 52px; height: 52px;
    display: flex; align-items: center; justify-content: center;
    background: #ede9fe;
    border-radius: 14px;
  }
  .fc-title {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }
  .fc-sub {
    font-size: 13px;
    color: #6b7280;
    margin: 2px 0 0;
  }
  .fc-counter {
    margin-left: auto;
    font-size: 13px;
    font-weight: 600;
    color: #6b7280;
    background: #f3f4f6;
    padding: 4px 12px;
    border-radius: 99px;
  }

  .fc-scene {
    perspective: 800px;
    cursor: pointer;
    margin-bottom: 16px;
  }
  .fc-card {
    position: relative;
    width: 100%;
    min-height: 180px;
    transition: transform 0.5s ease;
    transform-style: preserve-3d;
  }
  .fc-flipped { transform: rotateY(180deg); }

  .fc-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .fc-front {
    background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
    border: 1px solid #c7d2fe;
  }
  .fc-back {
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    border: 1px solid #a7f3d0;
    transform: rotateY(180deg);
  }
  .fc-face-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
  }
  .fc-front .fc-face-label { color: #6366f1; }
  .fc-back .fc-face-label { color: #059669; }

  .fc-face-text {
    font-size: 17px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
    line-height: 1.5;
  }
  .fc-hint {
    font-size: 12px;
    color: #a5b4fc;
    margin-top: 14px;
  }

  .fc-nav {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  .fc-nav-btn {
    padding: 9px 20px;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;
  }
  .fc-nav-btn:hover { background: #e5e7eb; }
  .fc-nav-btn:active { transform: scale(0.96); }
</style>