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
      {barber.user ? (
        <div className="flex justify-center flex-wrap gap-8">
          <div
            className="
              w-80 flex flex-col items-center
              bg-neutral-900/95 rounded-3xl border border-neutral-800/50
              shadow-[0_10px_40px_rgba(0,0,0,0.35)]
              backdrop-blur-xl overflow-hidden transition-all duration-300
              hover:shadow-[0_15px_50px_rgba(0,0,0,0.45)] hover:-translate-y-1
            "
          >
            <div className="px-6 pt-6">
              <p className="text-white text-2xl font-extrabold text-center tracking-tight">
                {barber.user.first_name} {barber.user.last_name}
              </p>
            </div>

            <div className="w-full flex justify-center mt-4 mb-6">
              <Image
                src="/barber3.png"
                alt="Barber photo"
                width={180}
                height={180}
                className="rounded-2xl shadow-lg shadow-black/30"
              />
            </div>

            <div className="flex flex-col items-center gap-1 text-neutral-200 mb-4">
              <span className="text-sm font-medium">{barber.phone}</span>
              <span className="text-sm font-medium">{barber.email}</span>
            </div>

            <div className="w-full px-6 pb-6 flex flex-col gap-1 bg-neutral-800/40 rounded-b-3xl text-neutral-200">
              <span className="text-sm font-semibold">Work Schedule:</span>
              <p className="text-xs">
                Monday - Saturday
              </p>
              <p className="text-xs">
                {barber.work_start_time} - {barber.lunch_start_time}
              </p>
              <p className="text-xs">
                {barber.lunch_end_time} - {barber.work_end_time}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-neutral-400 text-center">Barber not available</p>
      )}
    </>
  )
}