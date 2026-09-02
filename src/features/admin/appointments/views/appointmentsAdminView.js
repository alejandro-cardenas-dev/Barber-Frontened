const STATUS_COLORS = {
  confirmed: 'text-neutral-500 border-neutral-800 bg-neutral-900/30',
  completed: 'text-green-400 border-green-900/30 bg-green-950/10',
  cancelled: 'text-red-400 border-red-900/30 bg-red-950/10',
}

const STATUS_OPTIONS = ['all', 'confirmed', 'cancelled', 'completed']

function AppointmentRow({ appointment }) {

  return (
    <div className="
      flex flex-col sm:flex-row sm:items-center justify-between
      bg-neutral-950 border border-neutral-900 rounded-2xl
      px-5 py-4 gap-4 hover:border-neutral-700 transition-all duration-300
    ">
      <div className="flex flex-col gap-1">
        <p className="text-white font-bold text-sm uppercase tracking-tight">
          {appointment.customer?.user?.first_name} {appointment.customer?.user?.last_name}
        </p>
        <div className="flex flex-wrap items-center gap-x-2 text-neutral-500 text-[11px] font-light">
          <span className="text-neutral-300 font-medium">Barber: {appointment.barber?.user?.first_name}</span>
          <span className="hidden sm:inline">•</span>
          <span>{appointment.appointment_date}</span>
          <span>at {appointment.appointment_start_time?.slice(0, 5)}</span>
        </div>
      </div>

      <div className={`
        self-start sm:self-center px-3 py-1 rounded-full border
        text-[10px] font-black uppercase tracking-[0.15em] ${STATUS_COLORS[appointment.status]}
      `}>
        {appointment.status}
      </div>
    </div>
  )
}

export default function AppointmentsAdminView({
  appointments,
  total,
  filterStatus,
  setFilterStatus,
  filterDate,
  setFilterDate,
}) {
  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto min-h-screen bg-black">

      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
            Appointments
          </h1>
          <p className="text-neutral-600 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">
            {appointments.length} of {total} records
          </p>
        </div>

        <div className="flex items-center gap-3 bg-neutral-900/50 p-2 rounded-xl border border-neutral-800">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="bg-transparent text-white text-xs focus:outline-none appearance-none cursor-pointer"
          />
          {filterDate && (
            <button
              onClick={() => setFilterDate('')}
              className="text-neutral-500 hover:text-white text-[10px] font-bold uppercase"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex overflow-x-auto pb-4 sm:pb-0 gap-2 no-scrollbar outline-none">
          {STATUS_OPTIONS.map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`
                whitespace-nowrap px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300
                ${filterStatus === status
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'border border-neutral-800 text-neutral-500 hover:text-white hover:border-neutral-600'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-neutral-900 rounded-4xl">
          <p className="text-neutral-700 text-sm font-medium italic">Sin citas para estos criterios</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {appointments.map(appt => (
            <AppointmentRow key={appt.id} appointment={appt} />
          ))}
        </div>
      )}
    </div>
  )
}