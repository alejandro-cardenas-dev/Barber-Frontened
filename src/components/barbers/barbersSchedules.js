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
    setDateToCreateAppointment
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
  }, [dateToCreateAppointment, barberToCreateAppointment, token])

  return (
<div className="flex flex-col gap-y-5 w-80">
  <input
    className="border border-mainColorText py-1 rounded-sm"
    type="date"
    value={dateToCreateAppointment}
    onChange={(e) => setDateToCreateAppointment(e.target.value)}
    required
  />

  {barberSchedules.length > 0 ? (
    <div
      className="
        flex flex-wrap
        justify-between
        gap-y-2
      "
    >
      {barberSchedules.map((hour, index) => (
        <button
          key={index}
          onClick={() => setTimeToCreateAppointment(hour)}
          className={`
            border border-mainColor
            py-1
            rounded-md
            text-sm
            flex-1
            basis-[30%]
            text-center
            transition
            hover:bg-white hover:text-black
            ${timeToCreateAppointment === hour ? 'bg-white text-black font-semibold border-black' : ''}
          `}
        >
          {hour}
        </button>
      ))}
    </div>
  ) : (
    <span className="text-red-500">{errorMessage}</span>
  )}
</div>

  )
}
