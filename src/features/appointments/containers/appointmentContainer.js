'use client'

import { useAuthContext } from "@/context/authContext";
import AppointmentsView from "../views/appointmentsView";
import { UseAppointments } from "../hooks/useAppointments";
import { useState } from "react";

export default function AppointmentContainer() {
  const { token } = useAuthContext()
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