'use client'

import BarbersSchedules from "./barbersSchedules"
import Image from "next/image"
import { useBarberContext } from "@/context/barberContext"
import Link from "next/link"

export default function Barbers () {
  const { barbersData, setBarberToCreateAppointment } = useBarberContext()

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

                  <Link href='/create-appointment/' onClick={() => setBarberToCreateAppointment(barber.id)} >Create Appointment</Link>
                </div>
              )
            })
          : <div>There is any barber</div>
        }
      </div>
    </div>
  )
}