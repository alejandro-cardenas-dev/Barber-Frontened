export default function RadioInput({ label, name, value, onChange }) {
  return (
    <div className="flex justify-around mt-2 mb-4">
      <label className="flex items-center gap-2 text-neutral-200 text-sm font-medium cursor-pointer">
        <input
          type="radio"
          name={name}
          value={value}
          onChange={onChange}
          className="accent-white"
        />
        {label}
      </label>
    </div>
  )
}