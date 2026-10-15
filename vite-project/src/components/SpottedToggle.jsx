export function SpottedToggle({ value, onChange }) {
  return (
    <button
      type="button"
      aria-pressed={value}
      onClick={() => onChange(!value)}
      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
        value
          ? 'border-forest bg-forest text-white'
          : 'border-line bg-surface text-forest hover:bg-moss'
      }`}
    >
      {value ? 'Spotted' : 'Mark as spotted'}
    </button>
  )
}