import API from "@/API/api";
import { useAuthContext } from "@/context/authContext";

export default function DeleteAppointment ({ appointment_id, setAllAppointmets }) {
    const { token } = useAuthContext()

    const deleteAppointment = async (appointment_id) => {
      console.log(appointment_id);

      const res = await fetch(`${API.DELETE_APPOINTMENT}${appointment_id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (res.ok){
        setAllAppointmets(prev => prev.filter(appointment => appointment.id !== appointment_id))
        console.log('deleted');
      } else {
        console.log('error deleting');
      }

    }

  return (
    <button onClick={() => deleteAppointment(appointment_id)} >
      x
    </button>
  )
}