import API from "@/API/api";

export async function deleteAppointment(token, id) {
  const res = await fetch(`${API.DELETE_APPOINTMENT}${id}/cancel/`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.detail || 'Error canceling appointment')
  }

  return true
}