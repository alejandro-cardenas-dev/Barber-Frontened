import API from "@/API/api";

export async function deleteAppointment(token, id) {
  const res = await fetch(`${API.DELETE_APPOINTMENT}${id}/`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!res.ok) throw new Error('Error deleting appointment')

  return true
}