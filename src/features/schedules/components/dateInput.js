export default function DateInput({
  date,
  onDateChange
}) {

  return (
    <input
      type="date"
      value={date}
      onChange={(e) => onDateChange(e.target.value)}
      required
      className="
        w-full py-2 px-3 rounded-xl border border-neutral-700/50
        bg-neutral-800/60 text-white text-sm placeholder-neutral-400
        focus:outline-none focus:ring-2 focus:ring-white/50
        transition-all duration-200
      "
    />
  )
}