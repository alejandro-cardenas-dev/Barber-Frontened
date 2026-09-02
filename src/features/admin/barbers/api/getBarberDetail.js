import API from "@/API/api"

export async function getBarberDetail(token, id) {
  const res = await fetch(`${API.GET_BARBERS}${id}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!res.ok) throw new Error("Failed to fetch barber detail")
  return res.json()
}