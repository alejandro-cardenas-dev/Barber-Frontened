'use client'

import { useState, useEffect } from 'react'
import API from '@/API/api'
import { useAuthContext } from '@/context/authContext'
import { useBarberContext } from '@/context/barberContext'

export default function BarbersSchedules() {
  const [barberSchedules, setBarberSchedules] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const {
    barberToCreateAppointment,
    timeToCreateAppointment,
    setTimeToCreateAppointment,
    dateToCreateAppointment,
    setDateToCreateAppointment,
    reloadBarberSchedules
  } = useBarberContext()

  const { token } = useAuthContext()
  useEffect(() => {
    const fetchBarberSchedules = async () => {
      if (!dateToCreateAppointment || !barberToCreateAppointment) return

      try {
        const res = await fetch(
          `${API.GET_BARBERS_AVAILABLE_TIMES_SPECIFIC_DATE}${barberToCreateAppointment}/available-times/?date=${dateToCreateAppointment}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          }
        )

        const data = await res.json()

        if (!data.error) {
          setBarberSchedules(data.available_times)
          setErrorMessage('')
        } else {
          setErrorMessage(data.error)
          setBarberSchedules([])
        }
      } catch (error) {
        console.error('Error fetching schedules:', error)
        setErrorMessage('Error fetching schedules.')
      }
    }

    fetchBarberSchedules()
  }, [reloadBarberSchedules, dateToCreateAppointment, barberToCreateAppointment, token])

  return (
    <div className="flex flex-col gap-6 w-80 bg-neutral-900/95 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300">

      <input
        type="date"
        value={dateToCreateAppointment}
        onChange={(e) => setDateToCreateAppointment(e.target.value)}
        required
        className="
          w-full py-2 px-3 rounded-xl border border-neutral-700/50
          bg-neutral-800/60 text-white text-sm placeholder-neutral-400
          focus:outline-none focus:ring-2 focus:ring-white/50
          transition-all duration-200
        "
      />

      {barberSchedules.length > 0 ? (
        <div className="flex flex-wrap gap-3 mt-4">
          {barberSchedules.map((hour, index) => (
            <button
              key={index}
              onClick={() => setTimeToCreateAppointment(hour)}
              className={`
                text-sm py-2 px-4 rounded-2xl font-medium transition-all duration-200
                border border-neutral-700/50
                ${timeToCreateAppointment === hour
                  ? 'bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.25)]'
                  : 'text-white bg-neutral-800/60 hover:bg-white hover:text-black'}
              `}
            >
              {hour}
            </button>
          ))}
        </div>
      ) : errorMessage ? (
        <span className="text-red-500 text-sm mt-2">{errorMessage}</span>
      ) : (
        <span className="text-white text-sm mt-2">No schedules available</span>
      )}
    </div>
  )
}
