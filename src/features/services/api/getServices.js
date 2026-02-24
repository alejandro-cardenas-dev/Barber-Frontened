import API from "@/API/api"

export async function getServices(token) {
  const res = await fetch(API.GET_SERVICES, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })

  if (!res.ok) throw new Error("Failed to fetch services")

  return res.json()
}