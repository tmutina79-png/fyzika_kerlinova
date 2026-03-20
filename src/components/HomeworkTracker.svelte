<script>
  let { homework = [] } = $props();
  let items = $state(homework.map(h => ({ ...h })));

  function toggle(id) {
    items = items.map(h => h.id === id ? { ...h, done: !h.done } : h);
  }

  let doneCount = $derived(items.filter(h => h.done).length);
  let totalCount = $derived(items.length);
  let progress = $derived(totalCount > 0 ? Math.round(doneCount / totalCount * 100) : 0);
</script>

<div class="hw-wrap">
  <div class="hw-header">
    <div class="hw-header-left">
      <div class="hw-icon-box">📝</div>
      <div>
        <h3 class="hw-title">Domácí úkoly</h3>
        <p class="hw-sub">{doneCount} z {totalCount} splněno</p>
      </div>
    </div>
    <div class="hw-progress-ring">
      <svg viewBox="0 0 36 36" class="hw-ring-svg">
        <path class="hw-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
        <path class="hw-ring-fill" stroke-dasharray="{progress}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
      </svg>
      <span class="hw-ring-text">{progress}%</span>
    </div>
  </div>

  <ul class="hw-list">
    {#each items as hw (hw.id)}
      <li class="hw-item" class:hw-done={hw.done}>
        <button class="hw-check" onclick={() => toggle(hw.id)} aria-label={hw.done ? 'Označit jako nesplněné' : 'Označit jako splněné'}>
          {#if hw.done}
            <svg viewBox="0 0 20 20" fill="currentColor" class="hw-check-icon"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
          {:else}
            <div class="hw-check-empty"></div>
          {/if}
        </button>
        <div class="hw-item-body">
          <div class="hw-item-top">
            <span class="hw-item-icon">{hw.icon}</span>
            <span class="hw-item-subject">{hw.subject}</span>
            {#if hw.urgent && !hw.done}
              <span class="hw-badge-urgent">⚡ Urgentní</span>
            {/if}
          </div>
          <p class="hw-item-title">{hw.title}</p>
          <span class="hw-item-due">Odevzdat: {hw.dueLabel}</span>
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .hw-wrap{background:#fff;border-radius:20px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,.05),0 6px 24px rgba(0,0,0,.04);border:1px solid #e5e7eb}
  .hw-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
  .hw-header-left{display:flex;align-items:center;gap:12px}
  .hw-icon-box{font-size:28px;width:48px;height:48px;display:flex;align-items:center;justify-content:center;background:#fef3c7;border-radius:14px}
  .hw-title{font-size:17px;font-weight:700;color:#111827;margin:0}
  .hw-sub{font-size:12px;color:#6b7280;margin:2px 0 0}

  .hw-progress-ring{position:relative;width:52px;height:52px}
  .hw-ring-svg{width:100%;height:100%;transform:rotate(-90deg)}
  .hw-ring-bg{fill:none;stroke:#e5e7eb;stroke-width:3}
  .hw-ring-fill{fill:none;stroke:#10b981;stroke-width:3;stroke-linecap:round;transition:stroke-dasharray .5s ease}
  .hw-ring-text{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#059669}

  .hw-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px}
  .hw-item{display:flex;align-items:flex-start;gap:12px;padding:12px;border-radius:14px;border:1px solid #f3f4f6;transition:all .15s;background:#fafafa}
  .hw-item:hover{border-color:#e5e7eb;background:#f9fafb}
  .hw-done{opacity:.55}
  .hw-done .hw-item-title{text-decoration:line-through}

  .hw-check{all:unset;cursor:pointer;margin-top:2px;flex-shrink:0}
  .hw-check-empty{width:22px;height:22px;border:2px solid #d1d5db;border-radius:6px;transition:border-color .15s}
  .hw-check:hover .hw-check-empty{border-color:#6366f1}
  .hw-check-icon{width:22px;height:22px;color:#10b981}

  .hw-item-body{flex:1;min-width:0}
  .hw-item-top{display:flex;align-items:center;gap:6px;margin-bottom:4px}
  .hw-item-icon{font-size:14px}
  .hw-item-subject{font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.04em}
  .hw-badge-urgent{font-size:10px;font-weight:700;color:#dc2626;background:#fef2f2;padding:2px 8px;border-radius:99px;margin-left:auto}
  .hw-item-title{font-size:14px;font-weight:600;color:#1f2937;margin:0;line-height:1.4}
  .hw-item-due{font-size:11px;color:#9ca3af;margin-top:2px;display:inline-block}
</style>