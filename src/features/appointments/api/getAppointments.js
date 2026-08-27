import API from "@/API/api";

export async function getAppointments(token) {
  const res = await fetch(API.GET_APPOINTMENTS, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })

  if (!res.ok) throw new Error('Failed to fetch appointments')
  return res.json()
}