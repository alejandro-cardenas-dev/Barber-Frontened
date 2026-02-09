import API from "@/API/api";

export async function getAppointments(token) {
  const res = await fetch(API.GET_APPOINTMENTS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })

  return await res.json()
}