'use client'

import BarbersSchedules from "./barbersSchedules"
import Image from "next/image"
import { useBarberContext } from "@/context/barberContext"

export default function Barbers () {
  const { barbersData } = useBarberContext()

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

                  <div className="mask-b-from-20% mask-b-to-100%" >
                    <Image
                      src='/barber3.png'
                      alt='barber photo'
                      width={200}
                      height={200}
                      />
                  </div>

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