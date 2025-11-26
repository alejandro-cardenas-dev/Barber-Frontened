import DeleteAppointment from "./deleteAppointment";

export default function DeleteConfirmation ({
    appointment_id,
    setAllAppointmets,
    setMessage,
    setCancelAppointment,
    setAppointmentToCancel
  }) {

  const handleCloseModal = () => {
    setCancelAppointment(false)
    setAppointmentToCancel(null)
  }

  return (
    <div className="
      fixed inset-0 z-100
      bg-black/60 backdrop-blur-sm
      flex items-center justify-center
      animate-fadeIn
    " >

      <div className="
        bg-neutral-900 text-white
        w-96 p-8 rounded-3xl
        shadow-[0_15px_60px_rgba(0,0,0,0.45)]
        animate-scaleIn
      " >

        <h2 className="text-xl font-semibold mb-4">Cancel Appointment</h2>
        <p className="text-neutral-300 mb-6 text-sm">
          Are you sure you want to cancel this appointment?
        </p>


        <div className="flex justify-end gap-4">
          <button onClick={() => handleCloseModal()}

              className="
              px-4 py-2 rounded-lg text-sm
              bg-neutral-700 hover:bg-neutral-600
              transition-all
            "
          >
              No
          </button>

          <DeleteAppointment
            setCancelAppointment={setCancelAppointment}
            setAppointmentToCancel={setAppointmentToCancel}
            appointment_id={appointment_id}
            setAllAppointmets={setAllAppointmets}
            setMessage={setMessage}
          />
        </div>
      </div>
    </div>
  )
}