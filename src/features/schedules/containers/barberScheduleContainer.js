'use client'

import { useAuth } from "@/features/auth/context/authContext";
import { useCreateAppointmentContext } from "@/features/appointments/context/createAppointmentContext";
import { useBarberSchedules } from "../hooks/useBarberSchedules";
import BarberScheduleView from "../views/barberScheduleView";

export default function BarberScheduleContainer() {
  const {
    barberToCreateAppointment,
    dateToCreateAppointment,
    setDateToCreateAppointment,
    timeToCreateAppointment,
    setTimeToCreateAppointment,
    refreshSchedules,
  } = useCreateAppointmentContext()

  const { token } = useAuth()

  const { schedules, error } = useBarberSchedules({
    barberId: barberToCreateAppointment?.id,
    date: dateToCreateAppointment,
    token: token,
    refreshTrigger: refreshSchedules
  })

  return (
    <BarberScheduleView
      date={dateToCreateAppointment}
      setDate={setDateToCreateAppointment}
      schedules={schedules}
      time={timeToCreateAppointment}
      setTime={setTimeToCreateAppointment}
      error={error}
    />
  )
}