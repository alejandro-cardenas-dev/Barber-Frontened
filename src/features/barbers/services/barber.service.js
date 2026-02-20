import API from "@/API/api"

export async function fetchBarbers(token) {
  const res = await fetch(API.GET_BARBERS, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })

  if (!res.ok) throw new Error("Failed to fetch barbers")

  return res.json()
}