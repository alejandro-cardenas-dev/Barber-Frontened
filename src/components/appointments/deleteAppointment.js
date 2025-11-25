import API from "@/API/api";
import { useAuthContext } from "@/context/authContext";

export default function DeleteAppointment ({ appointment_id, setAllAppointmets, setMessage }) {
    const { token } = useAuthContext()

    const deleteAppointment = async (appointment_id) => {
      console.log(appointment_id);

      const res = await fetch(`${API.DELETE_APPOINTMENT}${appointment_id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (res.ok){
        setAllAppointmets(prev => prev.filter(appointment => appointment.id !== appointment_id))
        setMessage('Appointment successfully canceled')
        console.log('deleted');
        setTimeout(() => setMessage(''), 3000)
      } else {
        console.log('error deleting');
      }

    }

    return (
      <button
        onClick={() => deleteAppointment(appointment_id)}
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
        "
      >
        Cancel Appointment
      </button>
    );



}