'use client'
import API from "@/API/api"
import { useAuthContext } from "@/context/authContext"
import { useEffect, useState } from "react"

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
    <div className="flex items-center gap-x-5" >
      {
        barbersData ?
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
                  <p>
                    Work Schedule:
                  </p>
                  {
                    barber.available_times.map((hour, index) => {
                      return (
                        <p key={index} >
                          {hour}
                        </p>
                      )
                    })
                  }
                </div>



              </div>
            )
          })
        : <div>There is any barber</div>

      }
    </div>
  )
}