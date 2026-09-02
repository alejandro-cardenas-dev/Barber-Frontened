import API from "@/API/api"
import extractErrorMessage from "@/shared/utils/messageError"

export async function updateBarber(token, id, data) {
  const res = await fetch(`${API.GET_BARBERS}${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(extractErrorMessage(json))
  return json
}