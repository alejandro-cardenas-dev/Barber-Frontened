import API from "@/API/api";

export async function updateBarberSchedule(token, form) {
  const formData = new FormData()

  const map = {
    workStart: "work_start_time",
    workEnd: "work_end_time",
    lunchStart: "lunch_start_time",
    lunchEnd: "lunch_end_time",
  }

  Object.entries(form).forEach(([key, value]) => {
    if (value) formData.append(map[key], value)
  })

  const res = await fetch(API.EDIT_BARBER_SCHEDULE, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!res.ok) throw new Error('Failed to update schedule')

  return res.json()
}