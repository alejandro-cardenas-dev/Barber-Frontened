'use client'

import { useAuth } from "@/features/auth/context/authContext"
import { deleteAppointment } from "../api/deleteAppointments"

export function useDeleteAppointment(setAppointmentToCancel, setAppointments, setMessage) {
  const { token } = useAuth()

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteAppointment(token, id)
      setAppointments(prev => prev.filter(appointment => appointment.id != id))
      setMessage('Appointment successfully canceled')
      setAppointmentToCancel(null)

    } catch {
      setMessage('Error deleting, please try again!')
      setAppointmentToCancel(null)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return { handleDeleteAppointment }
}