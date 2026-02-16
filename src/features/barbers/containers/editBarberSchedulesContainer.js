'use client'

import { useEditBarberSchedule } from "../hooks/useEditBarberSchedules"
import EditBarberSchedulesView from "../views/editBarberSchedulesView"

export default function EditBarberSchedulesContainer() {
  const hook = useEditBarberSchedule()

  return <EditBarberSchedulesView {...hook} />
}