import DateInput from "../components/dateInput";
import ScheduleTimeSlots from "../components/scheduleTimeSlots";

export default function BarberScheduleView({
  date,
  onDateChange,
  schedules,
  time,
  onTimeChange,
  error,
}) {

  return (
    <div className="flex flex-col gap-6 w-80 bg-neutral-900/95 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300">

      <DateInput
        date={date}
        onDateChange={onDateChange}
      />

      <ScheduleTimeSlots
        schedules={schedules}
        time={time}
        onTimeChange={onTimeChange}
        error={error}
      />
    </div>
  )
}