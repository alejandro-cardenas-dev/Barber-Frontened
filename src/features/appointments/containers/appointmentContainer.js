'use client'

import { useAuth } from "@/features/auth/context/authContext"
import { useAppointments } from "../hooks/useAppointments"
import AppointmentsView from "../views/appointmentsView"

export default function AppointmentContainer() {
  const { user } = useAuth()
  const hook = useAppointments()

  return <AppointmentsView {...hook} isBarber={user?.is_barber} />
}