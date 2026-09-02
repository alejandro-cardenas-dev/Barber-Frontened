import API from "@/API/api";

export async function getAppointments(token, filters = {}) {
  const params = new URLSearchParams()

  if (filters.status && filters.status !== 'all') {
    params.set('status', filters.status);
  }

  if (filters.date) {
    params.set('date', filters.date);
  }

  const queryString = params.toString();

  const url = queryString
    ? `${API.GET_APPOINTMENTS}?${queryString}`
    : API.GET_APPOINTMENTS

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })

  if (!res.ok) throw new Error('Failed to fetch appointments')
  return res.json()
}