'use client'

import { useState } from "react"
import { FaCheckCircle } from "react-icons/fa";
import API from "@/API/api"
import { useAuthContext } from "@/context/authContext"
import { useBarberContext } from "@/context/barberContext"
import BarberDetail from "../barbers/barberDetail"
import BarbersSchedules from "../barbers/barbersSchedules"

export default function CreateAppointmen () {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { token } = useAuthContext()

  const {
    timeToCreateAppointment,
    barberToCreateAppointment,
    dateToCreateAppointment,
    reloadBarberSchedules,
    setReloadBarberSchedules,
    setTimeToCreateAppointment
  } = useBarberContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch(API.CREATE_APPOINTMENT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        barber: barberToCreateAppointment,
        appointment_date: dateToCreateAppointment,
        appointment_start_time: timeToCreateAppointment,
      })
    })
    const data = await res.json()

    if (res.ok) {
      setLoading(false)
      setReloadBarberSchedules(!reloadBarberSchedules)
      setTimeout(() => setMessage(''), 3000)
      setTimeToCreateAppointment(null)

    } else {
      const error = Object.values(data).find(data => Array.isArray(data))?.[0]
      setMessage(error)
      setLoading(false)
      setTimeToCreateAppointment(null)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center md:items-start gap-12 py-10">

      {message && (
        <div className="
          flex items-center gap-3
          fixed bottom-6 right-6
          px-5 py-3
          rounded-2xl
          bg-white text-black
          shadow-[0_4px_15px_rgba(0,0,0,0.25)]
          font-semibold
          z-50
          animate-fadeIn
        ">
          <span className="text-lg">
            <FaCheckCircle />
          </span>
          <span>{message}</span>
        </div>
      )}

      <BarberDetail />

      <div className="flex flex-col items-center gap-6 w-80">

        <BarbersSchedules />

        <div className="flex justify-end w-full">
          <button
            onClick={handleSubmit}
            disabled={!timeToCreateAppointment}
            className={`
              flex justify-center items-center w-[120px] py-2 rounded-2xl font-semibold transition-all
              ${timeToCreateAppointment
                ? 'bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.35)]'
                : 'bg-neutral-700 text-neutral-400 cursor-not-allowed'}
            `}
          >
            Create
            {loading &&
              <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
            }
          </button>
        </div>
      </div>
    </div>
  )
}