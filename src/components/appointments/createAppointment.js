'use client'

import API from "@/API/api"
import { useAuthContext } from "@/context/authContext"
import { useBarberContext } from "@/context/barberContext"
import { useState } from "react"
import BarberDetail from "../barbers/barberDetail"
import BarbersSchedules from "../barbers/barbersSchedules"

export default function CreateAppointmen () {
  const [message, SetMessage] = useState('')
  const { timeToCreateAppointment, barberToCreateAppointment, dateToCreateAppointment  } = useBarberContext()
  const { token } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('appoint:', barberToCreateAppointment, timeToCreateAppointment, dateToCreateAppointment);

    const formData = new FormData()
    formData.append('barber', barberToCreateAppointment)
    formData.append('customer', token)
    formData.append('appointment_date', dateToCreateAppointment)
    formData.append('appointment_start_time', timeToCreateAppointment)

    const res = await fetch(API.CREATE_APPOINTMENT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    })
    const data = await res.json()

    if (res.ok) {
      SetMessage('Appointment Created Succesfull')
      console.log('appointment created succesfull', data);
    } else {
      const error = Object.values(data).find(data => Array.isArray(data))?.[0]
      SetMessage(error)
      console.log('data', data);
      console.log('error', error);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-12 py-10">

      {message && <span className="text-white text-lg font-semibold">{message}</span>}

      <BarberDetail />

      <div className="flex flex-col gap-6">

        <BarbersSchedules />

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!timeToCreateAppointment}
            className={`
              w-[120px] py-2 rounded-2xl font-semibold transition-all duration-200
              ${timeToCreateAppointment
                ? 'bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.35)]'
                : 'bg-neutral-700 text-neutral-400 cursor-not-allowed'}
            `}
          >
            Create
          </button>
        </div>

      </div>

    </div>
  )
}