<script>
  let { questions = [], title = 'Kvíz', passingScore = 80 } = $props();
  let current = $state(0);
  let answers = $state({});
  let submitted = $state(false);
  let score = $state(0);

  function select(qi, ai) {
    if (submitted) return;
    answers = { ...answers, [qi]: ai };
  }

  function submit() {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    score = Math.round((correct / questions.length) * 100);
    submitted = true;
  }

  function reset() {
    answers = {};
    submitted = false;
    score = 0;
    current = 0;
  }

  function next() { if (current < questions.length - 1) current++; }
  function prev() { if (current > 0) current--; }
</script>

<div class="quiz">
  <div class="quiz-header">
    <h3 class="quiz-title">{title}</h3>
    <span class="quiz-count">{Object.keys(answers).length}/{questions.length}</span>
  </div>

  {#if !submitted}
    <div class="quiz-progress">
      {#each questions as _, i}
        <button
          class="quiz-dot"
          class:active={i === current}
          class:answered={answers[i] !== undefined}
          onclick={() => current = i}
        >{i + 1}</button>
      {/each}
    </div>

    <div class="quiz-question">
      <p class="quiz-q-text"><strong>Otázka {current + 1}:</strong> {questions[current].question}</p>
      <div class="quiz-options">
        {#each questions[current].options as opt, oi}
          <button
            class="quiz-option"
            class:selected={answers[current] === oi}
            onclick={() => select(current, oi)}
          >
            <span class="quiz-opt-letter">{String.fromCharCode(65 + oi)}</span>
            {opt}
          </button>
        {/each}
      </div>
    </div>

    <div class="quiz-nav">
      <button class="quiz-btn" onclick={prev} disabled={current === 0}>← Předchozí</button>
      {#if Object.keys(answers).length === questions.length}
        <button class="quiz-btn quiz-btn-submit" onclick={submit}>✅ Vyhodnotit</button>
      {/if}
      <button class="quiz-btn" onclick={next} disabled={current === questions.length - 1}>Další →</button>
    </div>
  {:else}
    <div class="quiz-result" class:pass={score >= passingScore} class:fail={score < passingScore}>
      <div class="quiz-score">{score} %</div>
      <p class="quiz-verdict">
        {#if score >= passingScore}
          🎉 Výborně! Kvíz jsi splnil/a!
        {:else}
          😕 Bohužel, potřebuješ alespoň {passingScore} %. Zkus to znovu!
        {/if}
      </p>

      <div class="quiz-review">
        {#each questions as q, i}
          <div class="review-item" class:correct={answers[i] === q.correct} class:wrong={answers[i] !== q.correct}>
            <span class="review-icon">{answers[i] === q.correct ? '✅' : '❌'}</span>
            <div>
              <p class="review-q">{q.question}</p>
              <p class="review-a">Tvá odpověď: <strong>{q.options[answers[i]] || '—'}</strong></p>
              {#if answers[i] !== q.correct}
                <p class="review-correct">Správně: <strong>{q.options[q.correct]}</strong></p>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <button class="quiz-btn quiz-btn-retry" onclick={reset}>🔄 Zkusit znovu</button>
    </div>
  {/if}
</div>

<style>
  .quiz { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 14px; padding: 1.5rem; margin: 1.5rem 0; }
  .quiz-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
  .quiz-title { margin: 0; font-size: 1.1rem; color: #1e3a8a; }
  .quiz-count { font-size: 0.85rem; color: #64748b; font-weight: 600; }
  .quiz-progress { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1rem; }
  .quiz-dot {
    width: 32px; height: 32px; border-radius: 50%; border: 2px solid #cbd5e1;
    background: white; font-size: 0.8rem; font-weight: 700; cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: all 0.15s;
    font-family: inherit; color: #64748b;
  }
  .quiz-dot.active { border-color: #3b82f6; color: #3b82f6; }
  .quiz-dot.answered { background: #dbeafe; border-color: #3b82f6; color: #1e3a8a; }
  .quiz-question { margin-bottom: 1rem; }
  .quiz-q-text { font-size: 0.95rem; color: #1e293b; margin-bottom: 0.75rem; }
  .quiz-options { display: flex; flex-direction: column; gap: 0.5rem; }
  .quiz-option {
    display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem;
    border: 1.5px solid #e2e8f0; border-radius: 8px; background: white;
    cursor: pointer; font-family: inherit; font-size: 0.9rem; text-align: left;
    transition: all 0.15s; color: #334155;
  }
  .quiz-option:hover { border-color: #93c5fd; background: #f0f9ff; }
  .quiz-option.selected { border-color: #3b82f6; background: #eff6ff; }
  .quiz-opt-letter {
    width: 28px; height: 28px; border-radius: 50%; background: #e2e8f0;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 0.8rem; color: #475569; flex-shrink: 0;
  }
  .quiz-option.selected .quiz-opt-letter { background: #3b82f6; color: white; }
  .quiz-nav { display: flex; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap; }
  .quiz-btn {
    padding: 0.55rem 1.1rem; border-radius: 8px; border: 1px solid #cbd5e1;
    background: white; font-weight: 600; font-size: 0.85rem; cursor: pointer;
    font-family: inherit; transition: all 0.15s; color: #334155;
  }
  .quiz-btn:hover:not(:disabled) { background: #f1f5f9; border-color: #94a3b8; }
  .quiz-btn:disabled { opacity: 0.4; cursor: default; }
  .quiz-btn-submit { background: #3b82f6; color: white; border-color: #3b82f6; }
  .quiz-btn-submit:hover { background: #2563eb; }
  .quiz-btn-retry { background: #3b82f6; color: white; border-color: #3b82f6; margin-top: 1rem; }
  .quiz-result { text-align: center; }
  .quiz-score { font-size: 3rem; font-weight: 800; margin-bottom: 0.25rem; }
  .quiz-result.pass .quiz-score { color: #059669; }
  .quiz-result.fail .quiz-score { color: #dc2626; }
  .quiz-verdict { font-size: 1rem; color: #334155; margin-bottom: 1.25rem; }
  .quiz-review { text-align: left; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
  .review-item { display: flex; gap: 0.75rem; padding: 0.75rem; border-radius: 8px; }
  .review-item.correct { background: #ecfdf5; }
  .review-item.wrong { background: #fef2f2; }
  .review-icon { font-size: 1.2rem; flex-shrink: 0; margin-top: 2px; }
  .review-q { font-weight: 600; font-size: 0.85rem; color: #1e293b; margin: 0 0 0.25rem 0; }
  .review-a { font-size: 0.8rem; color: #475569; margin: 0; }
  .review-correct { font-size: 0.8rem; color: #059669; margin: 0.15rem 0 0 0; }
</style>
