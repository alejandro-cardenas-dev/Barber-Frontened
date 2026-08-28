export default function AppointmentCard({ appointment, setAppointmentToCancel, isBarber }) {
  const canCancel = !isBarber && appointment.status == 'confirmed'
  const customerName = `${appointment.customer.user.first_name} ${appointment.customer.user.last_name}`
  const barberName = `${appointment.barber.user.first_name} ${appointment.barber.user.last_name}`
  const appointmentStatusColor = {
    'confirmed': 'text-neutral-500',
    'cancelled': 'text-red-500',
    'completed': 'text-green-500',
  }

  return (
    <div
      className="
        w-full rounded-3xl bg-neutral-950
        shadow-[0_15px_35px_rgba(0,0,0,0.4)]
        border border-neutral-800/50 overflow-hidden
        transition-all duration-300 group
        hover:border-neutral-700
      "
    >

      <div className="px-6 pt-6 pb-3 flex justify-between items-start">
        <div>
          <span className="text-neutral-500 uppercase tracking-[0.2em] text-[10px] font-bold block mb-0.5">
            Date
          </span>
          <p className="text-white font-medium text-base tracking-tight">
            {appointment.appointment_date}
          </p>
        </div>

        <div className={`flex px-2 py-0.5 rounded-full border ${appointment.status === 'completed' ? 'border-green-900/50 bg-green-950/20' : 'border-neutral-800 bg-neutral-900/50'}`}>
          <span className={`text-[9px] uppercase tracking-widest font-bold ${ appointmentStatusColor[appointment.status] }`}>
            { appointment.status }
          </span>
        </div>
      </div>

      <div className="px-6 pb-6 flex flex-col gap-4">
        <div className="flex items-center gap-4 bg-neutral-900/30 border border-neutral-900 rounded-xl p-3">
          <div className="flex flex-col items-center border-r border-neutral-800 pr-4">
             <span className="text-neutral-500 text-[10px] uppercase tracking-tighter">Time</span>
             <span className="text-white text-2xl font-black tracking-tighter">
                {appointment.appointment_start_time.slice(0, 5)}
             </span>
          </div>
          <div className="min-w-0">
            <span className="text-neutral-500 text-[10px] uppercase tracking-widest block">Customer</span>
            <p className="text-white text-sm font-bold truncate tracking-tight uppercase">
              {customerName}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center px-1">
          <div>
            <span className="text-neutral-600 text-[10px] uppercase tracking-widest block">Barber</span>
            <p className="text-neutral-400 text-xs font-light">{barberName}</p>
          </div>
        </div>

        {canCancel && (
          <button
            onClick={() => setAppointmentToCancel(appointment.id)}
            className="
              w-full py-2 rounded-lg
              text-[10px] font-bold uppercase tracking-[0.15em]
              border border-neutral-800 text-neutral-500
              hover:bg-neutral-100 hover:text-black hover:border-white
              transition-all duration-300 mt-2
            "
          >
            Cancell Appointment
          </button>
        )}
      </div>
    </div>
  )
}