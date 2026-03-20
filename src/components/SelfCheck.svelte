<script lang="ts">
  /**
   * SelfCheck – persistent checkbox stored in localStorage.
   * Props:
   *   id       – unique identifier (e.g. "lekce-1-definice")
   *   label    – text shown next to the checkbox
   */

  interface Props {
    id: string;
    label: string;
  }

  let { id, label }: Props = $props();

  const STORAGE_KEY = `selfcheck:${id}`;

  let checked = $state(false);

  // Hydrate from localStorage on mount
  $effect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      checked = true;
    }
  });

  function toggle() {
    checked = !checked;
    localStorage.setItem(STORAGE_KEY, String(checked));
  }
</script>

<label
  class="flex items-center gap-3 cursor-pointer select-none rounded-lg border
         border-primary-200 bg-primary-50 px-4 py-3 transition-colors
         hover:border-primary-400 {checked ? 'border-success bg-green-50' : ''}"
>
  <input
    type="checkbox"
    {checked}
    onchange={toggle}
    class="h-5 w-5 rounded border-primary-300 text-success accent-success cursor-pointer"
  />
  <span class="text-sm font-medium text-primary-800">
    {label}
  </span>
  {#if checked}
    <span class="ml-auto text-xs font-semibold text-success">✓ Hotovo</span>
  {/if}
</label>
