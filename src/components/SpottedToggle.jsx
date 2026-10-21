export function SpottedToggle({ value, onChange, disabled = false }) {
  return (
    <button
      type="button"
      aria-pressed={value}
      disabled={disabled}
      onClick={() => onChange(!value)}
      className={`rounded-full border px-3 py-1 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
        value
          ? 'border-forest bg-forest text-white'
          : 'border-line bg-surface text-forest hover:bg-moss'
      }`}
    >
      {value ? 'Spotted' : 'Mark as spotted'}
    </button>
  )
}