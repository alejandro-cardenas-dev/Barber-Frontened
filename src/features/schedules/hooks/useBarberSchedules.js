'use client'

import { useEffect, useState } from "react"
import { getBarberSchedules } from "../api/getBarberSchedules"

export function useBarberSchedules({ barberId, date, token, refreshTrigger } = {}) {
  const [schedules, setSchedules] = useState([])
  const [error, setError] = useState('')

  const handleGetSchedules = async () => {
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

  useEffect(() => {
    if (barberId && date && token) {
      handleGetSchedules()
    }
  }, [barberId, date, token, refreshTrigger])

  return { schedules, error, refetch: handleGetSchedules }
}