'use client'
import API from "@/API/api"
import { useAuthContext } from "@/context/authContext"
import { useState } from "react"

export default function BarbersSchedules ({ barber_id }) {
  const [appointmentDate, setAppointmentDate] = useState('')
  const [barberSchedules, setBarberSchedules] = useState([])
  const [errorMessage, SetErrorMessage] = useState('')
  const { token } = useAuthContext()


  const handleBarberSchedule = async (e) => {
    console.log('appointment data:', appointmentDate);

    e.preventDefault()
    const res = await fetch(`${API.GET_BARBERS_AVAILABLE_TIMES_SPECIFIC_DATE}${barber_id}/available-times/?date=${appointmentDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }, [barberSchedules])

    const data = await res.json()

    if (!data.error) {
      setBarberSchedules(data.available_times)
    } else {
      SetErrorMessage(data.error)
      console.log('error:', data);
    }
  }

  return (
    <div>
      <form onSubmit={handleBarberSchedule} >
        <span>Get Barber Available Time</span>
        <div>

        <label>Date</label>
          <input
            className="border border-mainColorText p-1.5 rounded-sm"
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" >
          Get Barber Schedules
        </button>
      </form>

      {
        barberSchedules.length > 0 ?
          <div>
            {
              barberSchedules.map((hour, index) => {
                return (
                  <p key={index} >
                    {hour}
                  </p>
                )
              })
            }
            <span onClick={() => setBarberSchedules([])}>Close</span>
          </div>
        : <span>{errorMessage}</span>
      }
    </div>
  )
}