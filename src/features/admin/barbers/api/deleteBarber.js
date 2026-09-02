import API from "@/API/api"

export async function deleteBarber(token, id) {
  const res = await fetch(`${API.GET_BARBERS}${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!res.ok) throw new Error("Failed to deactivate barber")
  return true
}