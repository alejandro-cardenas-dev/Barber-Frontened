'use client'

import { useEffect, useState } from "react"
import { useAuth } from "@/features/auth/context/authContext"
import { getBarberSchedules } from "../api/getBarberSchedules"

export function useBarberSchedules({ barberId, date, refreshTrigger } = {}) {
  const { token } = useAuth()
  const [schedules, setSchedules] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!barberId || !date || !token) return

    const fetchSchedules = async () => {
      try {
        const data = await getBarberSchedules({ barberId, date, token })
        if (!data.error) {
          setSchedules(data.available_times)
          setError('')
        } else {
          setSchedules([])
          setError(data.error)
        }
      } catch {
        setSchedules([])
        setError('Error fetching schedules.')
      }
    }

    fetchSchedules()
  }, [barberId, date, token, refreshTrigger])

  return { schedules, error }
}