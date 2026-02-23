'use client'

import { useAuth } from "@/features/auth/context/authContext";
import { useCreateAppointmentContext } from "@/features/appointments/context/createAppointmentContext";
import { useState } from "react";
import { createAppointment } from "../api/createAppointments";

export function useCreateAppointment() {
  const { token } = useAuth()
  const {
    barberToCreateAppointment,
    dateToCreateAppointment,
    timeToCreateAppointment,
    setTimeToCreateAppointment,
    serviceToCreateAppointment,
  } = useCreateAppointmentContext()

  const [loading, setLoading] = useState(false)

  const handleCreateAppointment = async () => {
    setLoading(true)

    try {
      await createAppointment(token, {
        service: serviceToCreateAppointment.id,
        barber: barberToCreateAppointment.id,
        appointment_date: dateToCreateAppointment,
        appointment_start_time: timeToCreateAppointment,
      })

      setTimeToCreateAppointment(null)
    } finally {
      setLoading(false)
    }
  }

  return { handleCreateAppointment, loading }
}