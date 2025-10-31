'use client'

import API from "@/API/api"
import { useAuthContext } from "@/context/authContext"
import { useState } from "react"

export default function CreateAppointmen () {
  const [message, SetMessage] = useState('')
  const [barber, setBarber] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const { token } = useAuthContext()



  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('tokennnn', token);
    console.log('before::::');


    const formData = new FormData()
    formData.append('barber', barber)
    formData.append('customer', token)
    formData.append('appointment_date', appointmentDate)
    formData.append('appointment_start_time', appointmentTime)

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
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center border border-mainColorText p-6 gap-y-3" >
        <h2 className="text-3xl font-bold" >CREATE ACCOUNT</h2>

        <p>{message}</p>
        <div className="flex flex-col" >

        <label>Barber</label>
          <input
            className="border border-mainColorText p-1.5 rounded-sm"
            type="number"
            placeholder="barber"
            value={barber}
            onChange={(e) => setBarber(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col" >

        <label>Appointment Date</label>
          <input
            className="border border-mainColorText p-1.5 rounded-sm"
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col" >

        <label>Appointment Time</label>
          <input
            className="border border-mainColorText p-1.5 rounded-sm"
            type="text"
            placeholder="Time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="bg-[#cea36f99] p-2 text-black w-full" >
          CREATE APPOINTMEN
        </button>
      </form>
    </div>
  )
}