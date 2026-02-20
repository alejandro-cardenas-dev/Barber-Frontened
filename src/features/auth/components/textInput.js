export default function TextInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = true,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-neutral-200 text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        required={required}
        className="
          px-4 py-2 rounded-xl border border-neutral-700/50 bg-neutral-800/60
          text-white text-sm placeholder-neutral-400
          focus:outline-none focus:ring-2 focus:ring-white/50
          transition-all duration-200
        "
      />
    </div>
  )
}