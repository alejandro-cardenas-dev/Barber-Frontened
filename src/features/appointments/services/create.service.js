import API from "@/API/api";

export async function createAppointmentRequest(token, payload) {
  const res = await fetch(API.CREATE_APPOINTMENT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload)
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(
      Object.values(data).find(v => Array.isArray(v))?.[0] ||
      'Error creating appointment'
    )
  }

  return data
}