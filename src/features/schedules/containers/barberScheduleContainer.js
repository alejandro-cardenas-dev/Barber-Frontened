'use client'

import { useAuth } from "@/features/auth/context/authContext";
import { useCreateAppointmentContext } from "@/context/createAppointmentContext";
import { UseBarberSchedules } from "../hooks/useBarberSchedules";
import BarberScheduleView from "../views/barberScheduleView";

export default function BarberScheduleContainer() {
  const {
    barberToCreateAppointment,
    dateToCreateAppointment,
    setDateToCreateAppointment,
    timeToCreateAppointment,
    setTimeToCreateAppointment,
  } = useCreateAppointmentContext()

  const { token } = useAuth()

  const { schedules, error } = UseBarberSchedules({
    barberId: barberToCreateAppointment?.id,
    date: dateToCreateAppointment,
    token: token
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