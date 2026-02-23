import { useDeleteAppointment } from "../hooks/useDeleteAppointment";

export default function DeleteAppointmentButton({ appointmentId, ...stateHandlers }) {
  const { handleDeleteAppointment } = useDeleteAppointment(
    stateHandlers.setAppointmentToCancel,
    stateHandlers.setAppointments,
    stateHandlers.setMessage
  )

  return (
    <button
      onClick={() => handleDeleteAppointment(appointmentId)}
      className="
        px-4 py-2 rounded-lg text-sm
        bg-red-600 hover:bg-red-500
        text-white font-medium
        transition-all shadow-md
        cursor-pointer
      "
    >
      Cancel Appointment
    </button>
  )
}