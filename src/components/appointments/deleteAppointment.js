import API from "@/API/api";
import { useAuthContext } from "@/context/authContext";

export default function DeleteAppointment ({ appointment_id }) {
    const { token } = useAuthContext()

    const deleteAppointment = async (appointment_id) => {
      console.log(appointment_id);

      const res = await fetch(`${API.DELETE_APPOINTMENT}${appointment_id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      console.log('daticaaa', data);

      if (res.ok){
        console.log('deleted');
        // const data = await res.json()
        // console.log('data ok ', data);


      } else {
        // const data = await res
        console.log('error deleting');
        // console.log('data not ok ', data);
      }

    }

  return (
    <button onClick={() => deleteAppointment(appointment_id)} >
      x
    </button>
  )
}