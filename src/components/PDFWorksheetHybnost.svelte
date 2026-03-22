<script>
  let showPdf = $state(false);
  let selectedProblems = $state([]);

  const problems = [
    {
      id: 1,
      title: 'Hybnost automobilu',
      text: 'Automobil o hmotnosti 1200 kg jede rychlostí 90 km/h. Vypočítej jeho hybnost.',
      answer: 'p = m·v = 1200 · 25 = 30 000 kg·m/s'
    },
    {
      id: 2,
      title: 'Porovnání hybností',
      text: 'Kamion o hmotnosti 8000 kg jede rychlostí 54 km/h. Osobní auto (1000 kg) jede 108 km/h. Které vozidlo má větší hybnost?',
      answer: 'Kamion: p₁ = 8000·15 = 120 000 kg·m/s. Auto: p₂ = 1000·30 = 30 000 kg·m/s. Kamion má 4× větší hybnost.'
    },
    {
      id: 3,
      title: 'Zákon zachování hybnosti',
      text: 'Kulička A (m₁ = 0,5 kg, v₁ = 4 m/s) narazí do stojící kuličky B (m₂ = 0,5 kg). Po pružné srážce se A zastaví. Jaká je rychlost B po srážce?',
      answer: 'm₁·v₁ = m₂·v₂\' → 0,5·4 = 0,5·v₂\' → v₂\' = 4 m/s'
    },
    {
      id: 4,
      title: 'Impuls síly',
      text: 'Na těleso o hmotnosti 2 kg působí síla 50 N po dobu 0,1 s. O kolik se změní hybnost tělesa? Jaká je výsledná rychlost, pokud těleso bylo v klidu?',
      answer: 'Δp = F·Δt = 50·0,1 = 5 kg·m/s. v = Δp/m = 5/2 = 2,5 m/s'
    },
    {
      id: 5,
      title: 'Nepružná srážka',
      text: 'Vagón o hmotnosti 20 t jedoucí rychlostí 3 m/s narazí do stojícího vagónu o hmotnosti 30 t a spojí se s ním. Jakou rychlostí se pohybují po srážce?',
      answer: 'm₁·v₁ = (m₁+m₂)·v\' → 20000·3 = 50000·v\' → v\' = 1,2 m/s'
    },
    {
      id: 6,
      title: 'Airbag a síla nárazu',
      text: 'Řidič (75 kg) jede 50 km/h a narazí do zdi. Bez airbagu trvá náraz 0,02 s, s airbagem 0,15 s. Vypočítej sílu na řidiče v obou případech.',
      answer: 'Δp = 75·13,9 = 1042 kg·m/s. Bez: F = 1042/0,02 = 52 100 N. S airbagem: F = 1042/0,15 = 6 947 N. Airbag snižuje sílu ~7,5×.'
    }
  ];

  function toggleProblem(id) {
    if (selectedProblems.includes(id)) {
      selectedProblems = selectedProblems.filter(p => p !== id);
    } else {
      selectedProblems = [...selectedProblems, id];
    }
  }

  function selectAll() {
    selectedProblems = problems.map(p => p.id);
  }

  function generatePdf() {
    const selected = problems.filter(p => selectedProblems.includes(p.id));
    if (selected.length === 0) { alert('Vyber alespoň jeden příklad!'); return; }

    const content = selected.map((p, i) => `
      <div class="problem">
        <h3>Příklad ${i + 1}: ${p.title}</h3>
        <p>${p.text}</p>
        <div class="workspace">
          <p class="ws-label">Místo pro výpočet:</p>
          <div class="ws-lines">${'<div class="line"></div>'.repeat(8)}</div>
        </div>
      </div>
    `).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Hybnost – Příklady</title>
    <style>
      @page{size:A4;margin:2cm}
      body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;line-height:1.6}
      h1{text-align:center;color:#1e3a8a;font-size:22px;margin-bottom:5px}
      .subtitle{text-align:center;color:#64748b;font-size:13px;margin-bottom:25px}
      .problem{page-break-inside:avoid;margin-bottom:30px;border:1px solid #e2e8f0;border-radius:8px;padding:16px}
      h3{color:#1e3a8a;font-size:15px;margin:0 0 8px 0;border-bottom:2px solid #dbeafe;padding-bottom:6px}
      p{margin:0 0 8px 0;font-size:14px}
      .workspace{margin-top:10px}
      .ws-label{font-size:11px;color:#94a3b8;margin-bottom:4px}
      .line{border-bottom:1px dotted #cbd5e1;height:28px}
      .footer{text-align:center;font-size:10px;color:#94a3b8;margin-top:30px;border-top:1px solid #e2e8f0;padding-top:8px}
    </style></head><body>
    <h1>⚛️ Hybnost – Příklady k procvičení</h1>
    <p class="subtitle">Fyzika – Kvinta | ${new Date().toLocaleDateString('cs-CZ')}</p>
    ${content}
    <div class="footer">Studijní portál – Fyzika Kvinta | Vygenerováno ${new Date().toLocaleDateString('cs-CZ')}</div>
    </body></html>`;

    const w = window.open('', '_blank');
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 500);
  }
</script>

<div class="pdf-gen">
  <div class="pdf-header">
    <div class="pdf-icon">🖨️</div>
    <div>
      <h3 class="pdf-title">Vygeneruj PDF s příklady</h3>
      <p class="pdf-sub">Vyber příklady a vytiskni si je na papír</p>
    </div>
  </div>

  <div class="pdf-list">
    {#each problems as p}
      <label class="pdf-item" class:selected={selectedProblems.includes(p.id)}>
        <input type="checkbox" checked={selectedProblems.includes(p.id)} onchange={() => toggleProblem(p.id)} />
        <span class="pdf-item-title">{p.title}</span>
        <span class="pdf-item-text">{p.text}</span>
      </label>
    {/each}
  </div>

  <div class="pdf-actions">
    <button class="pdf-btn pdf-btn-all" onclick={selectAll}>☑️ Vybrat vše</button>
    <button class="pdf-btn pdf-btn-gen" onclick={generatePdf}>🖨️ Vygenerovat PDF ({selectedProblems.length})</button>
  </div>
</div>

<style>
  .pdf-gen {
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 14px;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  .pdf-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
  .pdf-icon { font-size: 2rem; }
  .pdf-title { font-size: 1.1rem; font-weight: 700; color: #1e3a8a; margin: 0; }
  .pdf-sub { font-size: 0.8rem; color: #64748b; margin: 0; }
  .pdf-list { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
  .pdf-item {
    display: flex; align-items: flex-start; gap: 0.75rem;
    padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 8px;
    background: white; cursor: pointer; transition: all 0.15s;
  }
  .pdf-item:hover { border-color: #93c5fd; }
  .pdf-item.selected { border-color: #3b82f6; background: #eff6ff; }
  .pdf-item input[type="checkbox"] { margin-top: 3px; accent-color: #3b82f6; }
  .pdf-item-title { font-weight: 700; color: #1e3a8a; font-size: 0.9rem; white-space: nowrap; }
  .pdf-item-text { font-size: 0.8rem; color: #64748b; }
  .pdf-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .pdf-btn {
    padding: 0.6rem 1.2rem; border-radius: 8px; border: none;
    font-weight: 700; font-size: 0.9rem; cursor: pointer;
    font-family: inherit; transition: all 0.15s;
  }
  .pdf-btn-all { background: #e2e8f0; color: #334155; }
  .pdf-btn-all:hover { background: #cbd5e1; }
  .pdf-btn-gen { background: #3b82f6; color: white; }
  .pdf-btn-gen:hover { background: #2563eb; }
</style>
