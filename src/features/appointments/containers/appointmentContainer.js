'use client'

import { useAuthContext } from "@/context/authContext";
import AppointmentsView from "../views/appointmentsView";
import { UseAppointments } from "../hooks/useAppointments";

export default function AppointmentContainer() {
  const { token } = useAuthContext()
  const { appointments, error, loading } = UseAppointments(token)

  return (
    <AppointmentsView
      appointments={appointments}
      error={error}
      loading={loading}
    />
  )
}