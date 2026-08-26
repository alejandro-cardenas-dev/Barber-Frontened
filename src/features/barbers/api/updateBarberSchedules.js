import API from "@/API/api";

export async function updateBarberSchedule(token, form) {
  const res = await fetch(API.EDIT_BARBER_SCHEDULE, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      work_start_time: form.workStart,
      work_end_time: form.workEnd,
      lunch_start_time: form.lunchStart,
      lunch_end_time: form.lunchEnd,
    }),
  })

  if (!res.ok) throw new Error('Failed to update schedule')
  return res.json()
}