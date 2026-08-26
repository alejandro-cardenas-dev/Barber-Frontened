import API from "@/API/api";

export async function getBarberSchedules({ barberId, date, token }) {
  const res = await fetch(
    `${API.GET_BARBERS_AVAILABLE_TIMES_SPECIFIC_DATE}${barberId}/available-times/?date=${date}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
  )

  if (!res.ok) throw new Error('Failed to fetch schedules')
  return res.json()
}