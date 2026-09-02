import API from "@/API/api"

export async function updateService(token, id, data) {
  const res = await fetch(`${API.GET_SERVICES}${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update service")
  return res.json()
}