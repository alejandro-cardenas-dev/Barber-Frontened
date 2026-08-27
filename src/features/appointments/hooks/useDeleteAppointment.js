'use client'

import { useAuth } from "@/features/auth/context/authContext"
import { deleteAppointment } from "../api/deleteAppointments"

export function useDeleteAppointment() {
  const { token } = useAuth()

  const handleDeleteAppointment = async (id) => {
    await deleteAppointment(token, id)
    return id
  }

  return { handleDeleteAppointment }
}