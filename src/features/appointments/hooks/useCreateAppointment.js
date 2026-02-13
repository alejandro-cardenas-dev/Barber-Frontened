'use client'

import { useAuthContext } from "@/context/authContext";
import { useCreateAppointmentContext } from "@/context/createAppointmentContext";
import { useState } from "react";
import { createAppointmentRequest } from "../services/create.service";

export function useCreateAppointment() {
  const { token } = useAuthContext()
  const {
    barberToCreateAppointment,
    dateToCreateAppointment,
    timeToCreateAppointment,
    setTimeToCreateAppointment,
    serviceToCreateAppointment,
  } = useCreateAppointmentContext()

  const [loading, setLoading] = useState(false)

  const createAppointment = async () => {
    setLoading(true)

    try {
      await createAppointmentRequest(token, {
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

  return { createAppointment, loading }
}