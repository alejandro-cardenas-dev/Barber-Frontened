export default function AppointmentCard({ appointment, setAppointmentToCancel }) {
  return (
    <div
      className="
        w-full max-w-sm rounded-3xl bg-neutral-900/95
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
        border border-neutral-800/60 backdrop-blur-xl
        transition-all duration-300
        hover:shadow-[0_15px_50px_rgba(0,0,0,0.45)]
        hover:-translate-y-1.5
      "
    >

      <div className="px-6 py-4 border-b border-neutral-800/40">
        <p className="text-white font-semibold text-lg tracking-tight">
          {appointment.appointment_date}
        </p>
      </div>

      <div className="px-6 py-6 flex flex-col gap-7">

        <div className="bg-black rounded-2xl py-5 shadow-inner shadow-black/40 flex items-center justify-center">
          <span className="text-white text-4xl font-semibold tracking-tight">
            {appointment.appointment_start_time.slice(0, 5)}
          </span>
        </div>

        <div className="bg-neutral-100 rounded-2xl px-5 py-4 shadow-sm shadow-black/10">
          <p className="text-neutral-900 text-[17px] font-semibold">
            {appointment.customer.user.first_name} {appointment.customer.user.last_name}
          </p>
          <p className="text-neutral-600 mt-1 text-sm font-medium">
            Barber: {appointment.barber.user.first_name} {appointment.barber.user.last_name}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mt-4">
          <span className="text-neutral-500 text-xs tracking-wide">
            © 2025 Alejo’s Barber
          </span>

          <span
            onClick={() => setAppointmentToCancel(appointment.id)}
            className="
              text-[13px] font-medium
              px-5 py-2 rounded-xl
              border border-neutral-700/50
              text-neutral-200
              hover:text-white
              bg-neutral-900/60
              hover:bg-neutral-800
              transition-all duration-300
              shadow-[0_2px_8px_rgba(0,0,0,0.25)]
              cursor-pointer
            "
          >
            Cancel Appointment
          </span>
        </div>
      </div>
    </div>
  )
}