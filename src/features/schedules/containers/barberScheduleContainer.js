'use client'

import { useCreateAppointmentContext } from "@/features/appointments/context/createAppointmentContext"
import { useBarberSchedules } from "../hooks/useBarberSchedules"
import BarberScheduleView from "../views/barberScheduleView"

export default function BarberScheduleContainer() {
  const {
    barberToCreateAppointment,
    dateToCreateAppointment,
    setDateToCreateAppointment,
    timeToCreateAppointment,
    setTimeToCreateAppointment,
    refreshSchedules,
  } = useCreateAppointmentContext()

  const { schedules, error } = useBarberSchedules({
    barberId: barberToCreateAppointment?.id,
    date: dateToCreateAppointment,
    refreshTrigger: refreshSchedules,
  })

  const handleDateChange = (date) => setDateToCreateAppointment(date)
  const handleTimeChange = (time) => setTimeToCreateAppointment(time)

  return (
    <BarberScheduleView
      date={dateToCreateAppointment}
      onDateChange={handleDateChange}
      schedules={schedules}
      time={timeToCreateAppointment}
      onTimeChange={handleTimeChange}
      error={error}
    />
  )
}