'use client'

import { useBarberContext } from "@/context/barberContext"
import Image from "next/image"
import { useEffect, useState } from "react"
import BarbersSchedules from "./barbersSchedules"

export default function BarberDetail () {
  const [barber, SetBarber] = useState({})
  const { barbersData, barberToCreateAppointment } = useBarberContext()

  const barberDetailData = barbersData.filter(barber => barber.id == barberToCreateAppointment)

  useEffect(() => {
    SetBarber(barberDetailData[0])

  }, [barberToCreateAppointment])

  console.log(barber)

  return (
    <>
      {
        barber.user ?
          <div className="flex justify-center w-80" >
            <div>
              <p className="text-3xl" >
                {barber.user.first_name} {barber.user.last_name}
              </p>

              <div className="mask-b-from-20% mask-b-to-100%" >
                <Image
                  src='/barber3.png'
                  alt='barber photo'
                  width={200}
                  height={200}
                  />
              </div>

              <div className="flex flex-col justify-center items-center" >
                <span>{barber.phone}</span>
                <span>{barber.email}</span>
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
            </div>
          </div>

          : <p>Barber not available</p>
      }
    </>
  )
}