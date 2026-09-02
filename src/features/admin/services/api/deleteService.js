import API from "@/API/api"

export async function deleteService(token, id) {
  const res = await fetch(`${API.GET_SERVICES}${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!res.ok) throw new Error("Failed to deactivate service")
  return true
}