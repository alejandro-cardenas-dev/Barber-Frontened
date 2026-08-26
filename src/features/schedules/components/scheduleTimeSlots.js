export default function ScheduleTimeSlots({
  schedules,
  time,
  onTimeChange,
  error,
}) {

  if (schedules.length > 0) {
    return (
      <div className="flex flex-wrap gap-3 mt-4">
        {schedules.map((hour, index) => (
          <button
            key={index}
            onClick={() => onTimeChange(hour)}
            className={`
              text-sm py-2 px-4 rounded-2xl font-medium transition-all duration-200
              border border-neutral-700/50
              ${
                time === hour
                  ? "bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
                  : "text-white bg-neutral-800/60 hover:bg-white hover:text-black"
              }
            `}
          >
            {hour}
          </button>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <span className="text-red-500 text-sm mt-2">
        {error}
      </span>
    )
  }

  return (
    <span className="text-white text-sm mt-2">
      No schedules available
    </span>
  )
}