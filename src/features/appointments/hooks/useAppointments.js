'use client'

import { useEffect, useState } from "react"
import { useAuth } from "@/features/auth/context/authContext"
import { getAppointments } from "../api/getAppointments"

export function useAppointments() {
  const { token } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [appointmentToCancel, setAppointmentToCancel] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) return

    const fetchAppointments = async () => {
      setLoading(true)
      try {
        const data = await getAppointments(token)
        setAppointments(data)
        setError('')
      } catch (err) {
        setAppointments([])
        setError(err.message || 'Network error')
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [token])

  return {
    appointments,
    setAppointments,
    error,
    loading,
    appointmentToCancel,
    setAppointmentToCancel,
    message,
    setMessage,
  }
}