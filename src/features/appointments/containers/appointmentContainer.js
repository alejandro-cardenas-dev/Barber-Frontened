'use client'

import { useAuth } from "@/features/auth/context/authContext";
import AppointmentsView from "../views/appointmentsView";
import { UseAppointments } from "../hooks/useAppointments";
import { useState } from "react";

export default function AppointmentContainer() {
  const { token } = useAuth()
  const { appointments, setAppointments, error, loading } = UseAppointments(token)
  const [appointmentToCancel, setAppointmentToCancel] = useState(null)
  const [message, setMessage] = useState('')

  return (
    <AppointmentsView
      appointments={appointments}
      setAppointments={setAppointments}
      error={error}
      loading={loading}
      appointmentToCancel={appointmentToCancel}
      setAppointmentToCancel={setAppointmentToCancel}
      message={message}
      setMessage={setMessage}
    />
  )
}