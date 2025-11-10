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
    <div className="flex justify-center gap-x-20" >
      <span>{message}</span>

      <BarberDetail />

      <div className="flex flex-col gap-5" >
        <BarbersSchedules />

        <div className="flex justify-end" >
          <button onClick={handleSubmit} className={`flex justify-center items-center w-[104px] rounded-md ${timeToCreateAppointment ? 'bg-white text-black' : ''}`} >Create</button>
        </div>
      </div>
    </div>
  )
}