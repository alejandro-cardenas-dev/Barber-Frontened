export default function BarberScheduleView({
  date,
  setDate,
  schedules,
  time,
  setTime,
  error
}) {

  return (
    <div className="flex flex-col gap-6 w-80 bg-neutral-900/95 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="
          w-full py-2 px-3 rounded-xl border border-neutral-700/50
          bg-neutral-800/60 text-white text-sm placeholder-neutral-400
          focus:outline-none focus:ring-2 focus:ring-white/50
          transition-all duration-200
        "
      />

      {schedules.length > 0 ? (
        <div className="flex flex-wrap gap-3 mt-4">
          {schedules.map((hour, index) => (
            <button
              key={index}
              onClick={() => setTime(hour)}
              className={`
                text-sm py-2 px-4 rounded-2xl font-medium transition-all duration-200
                border border-neutral-700/50
                ${time === hour
                  ? 'bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.25)]'
                  : 'text-white bg-neutral-800/60 hover:bg-white hover:text-black'}
              `}
            >
              {hour}
            </button>
          ))}
        </div>
      ) : error ? (
        <span className="text-red-500 text-sm mt-2">{error}</span>
      ) : (
        <span className="text-white text-sm mt-2">No schedules available</span>
      )}
    </div>
  )
}