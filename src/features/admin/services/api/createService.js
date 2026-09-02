import API from "@/API/api"

export async function createService(token, data) {
  const res = await fetch(API.GET_SERVICES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create service")
  return res.json()
}