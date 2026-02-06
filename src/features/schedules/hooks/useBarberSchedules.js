'use client'

import { useEffect, useState } from "react"
import { getBarberSchedules } from "../services/schedules.service"

export function UseBarberSchedules({
  barberId,
  date,
  token
}) {
  const [schedules, setSchedules] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const data = await getBarberSchedules({ barberId, date, token })

        if (!data.error) {
          setSchedules(data.available_times)
          setError('')
        } else {
          setSchedules([])
          setError(data.error)
        }

      } catch (error) {
        setSchedules([])
        setError('Error fetching schedules.')
      }
    }
    fetchSchedules()
  }, [barberId, date, token])

  return { schedules, error }
}