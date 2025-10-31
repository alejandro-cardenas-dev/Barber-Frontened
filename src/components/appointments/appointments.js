'use client'

import API from "@/API/api"
import { useAuthContext } from "@/context/authContext"
import { useEffect, useState } from "react"

export default function Appointments () {
  const [AllAppointments, setAllAppointmets] = useState([])
  const { token } = useAuthContext()

  useEffect(() => {
    const get_appointments = async () => {
      const res = await fetch(API.GET_BARBER_APPOINTMENTS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })

      const data = await res.json()

      if (res.ok) {
        setAllAppointmets(data)
        console.log('success', data);

      } else {
        console.log('error', data);
      }


    }
    get_appointments()
  }, [token])


  return (
    <div>
      {
        AllAppointments.length > 0 ?
          AllAppointments.map((appointment) => {
            return (
              <div key={appointment.id} className="border border-mainColorText" >
                <p>Date: {appointment.appointment_date}</p>
                <p>Hour: {appointment.appointment_start_time}</p>
                <p>Customer: {appointment.customer.user.first_name} {appointment.customer.user.last_name}</p>
              </div>
            )
          })
        : <div>You don't have any appointment yet</div>
      }
    </div>
  )
}