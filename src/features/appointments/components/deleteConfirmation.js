import { useDeleteAppointment } from "../hooks/useDeleteAppointment"

export default function DeleteConfirmation({
  appointmentId,
  setAppointmentToCancel,
  setAppointments,
  setMessage,
}) {
  const { handleDeleteAppointment } = useDeleteAppointment()

  const handleConfirm = async () => {
    try {
      const deletedId = await handleDeleteAppointment(appointmentId)
      setAppointments(prev => prev.map(a =>
        a.id === deletedId ? { ...a, status: 'cancelled' } : a
      ))
      setMessage('Appointment successfully canceled')
      setAppointmentToCancel(null)
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(error.message)
      setAppointmentToCancel(null)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div className="
      fixed inset-0 z-100
      bg-black/60 backdrop-blur-sm
      flex items-center justify-center
      animate-fadeIn
    ">
      <div className="
        bg-neutral-900 text-white
        w-96 p-8 rounded-3xl
        shadow-[0_15px_60px_rgba(0,0,0,0.45)]
        animate-scaleIn
      ">
        <h2 className="text-xl font-semibold mb-4">Cancel Appointment</h2>
        <p className="text-neutral-300 mb-6 text-sm">
          Are you sure you want to cancel this appointment?
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setAppointmentToCancel(null)}
            className="
              px-4 py-2 rounded-lg text-sm
              bg-neutral-700 hover:bg-neutral-600
              transition-all cursor-pointer
            "
          >
            No
          </button>
          <button
            onClick={handleConfirm}
            className="
              px-4 py-2 rounded-lg text-sm
              bg-red-600 hover:bg-red-500
              text-white font-medium
              transition-all shadow-md cursor-pointer
            "
          >
            Cancel Appointment
          </button>
        </div>
      </div>
    </div>
  )
}