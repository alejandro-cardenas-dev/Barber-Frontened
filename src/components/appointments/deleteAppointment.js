import API from "@/API/api";
import { useAuthContext } from "@/context/authContext";

export default function DeleteAppointment ({
    appointment_id,
    setAllAppointmets,
    setMessage,
    setAppointmentToCancel,
    setCancelAppointment
  }) {

  const { token } = useAuthContext()

  const deleteAppointment = async (appointment_id) => {

    const res = await fetch(`${API.DELETE_APPOINTMENT}${appointment_id}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })

    if (res.ok){
      setAllAppointmets(prev => prev.filter(appointment => appointment.id !== appointment_id))
      setMessage('Appointment successfully canceled')
      setCancelAppointment(false)
      setAppointmentToCancel(null)
      setTimeout(() => setMessage(''), 3000)
    } else {
      setMessage('Error deleting, please try again!')
    }
  }

  return (
    <button
      onClick={() => deleteAppointment(appointment_id)}
      className="
        px-4 py-2 rounded-lg text-sm
        bg-red-600 hover:bg-red-500
        text-white font-medium
        transition-all shadow-md
      "
    >
      Cancel Appointment
    </button>
  )
}