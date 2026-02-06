'use client'

import { useAuthContext } from "@/context/authContext";
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

  const { token } = useAuthContext()

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