'use client'
import API from "@/API/api"
import { useAuthContext } from "@/context/authContext"
import { useEffect, useState } from "react"
import BarbersSchedules from "./barbersSchedules"

export default function Barbers () {
  const [barbersData, setBarbersData] = useState([])
  const { token } = useAuthContext()


  useEffect(() => {
    const get_barbers = async () => {
      const res = await fetch(API.GET_BARBERS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      const data = await res.json()
      console.log('dataaaaaaaa', data);

      setBarbersData(data)
    }
    get_barbers()
  }, [token])

  console.log('after', barbersData);


  return (
    <div className="flex flex-col items-center gap-y-5" >
      <span className="text-3xl font-bold" >BARBERS</span>

      <div className="flex" >
        {
          barbersData.length > 0 ?
            barbersData.map((barber, id) => {
              return (
                <div key={id} className="flex flex-col border border-mainColorText items-center p-3.5 gap-y-5" >
                  <p className="text-3xl" >
                    {barber.user.first_name} {barber.user.last_name}
                  </p>

                  <div className="flex flex-col justify-center items-center" >
                    <span>{barber.user.phone}</span>
                    <span>{barber.user.email}</span>
                  </div>

                  <div>
                    <span>Work Schedule:</span>
                    <p>Monday - Saturday</p>
                    <p>
                      {barber.work_start_time} - {barber.lunch_start_time}
                    </p>

                    <p>
                      {barber.lunch_end_time} - {barber.work_end_time}
                    </p>
                  </div>

                  < BarbersSchedules barber_id={barber.id} />
                </div>
              )
            })
          : <div>There is any barber</div>
        }
      </div>
    </div>
  )
}