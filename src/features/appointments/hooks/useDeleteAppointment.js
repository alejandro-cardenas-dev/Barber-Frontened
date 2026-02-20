'use client'

import { useAuth } from "@/features/auth/context/authContext"
import { deleteAppointmentRequest } from "../services/delete.service"

export function useDeleteAppointment(setAppointmentToCancel, setAppointments, setMessage) {
  const { token } = useAuth()

  const deleteAppointment = async (id) => {
    try {
      await deleteAppointmentRequest(token, id)
      setAppointments(prev => prev.filter(appointment => appointment.id != id))
      setMessage('Appointment successfully canceled')
      setAppointmentToCancel(null)

    } catch {
      setMessage('Error deleting, please try again!')
      setAppointmentToCancel(null)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return { deleteAppointment }
}