'use client'

import { useEffect, useState } from "react";
import { getAppointments } from "../api/getAppointments";

export function UseAppointments(token) {
  const [appointments, setAppointments] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true)
      try {
        const data = await getAppointments(token)
        setAppointments(data)
        setError('')
        setLoading(false)
      } catch (error) {
        setAppointments([])
        setError(error || 'Network error')
        setLoading(false)
      }
    }
    fetchAppointments()

  }, [token])

  return { appointments, setAppointments, error, loading }
}
