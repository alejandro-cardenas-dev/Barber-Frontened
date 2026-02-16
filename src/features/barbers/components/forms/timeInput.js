export default function TimeInput({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-neutral-200 font-semibold">{label}</label>
      <input
        type="time"
        value={value?.slice(0, 5)}
        onChange={onChange}
        required
        className="px-4 py-2 rounded-2xl border border-neutral-700/50 bg-neutral-800/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
      />
    </div>
  )
}