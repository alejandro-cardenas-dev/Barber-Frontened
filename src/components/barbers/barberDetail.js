'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { useBarberContext } from "@/context/barberContext"

export default function BarberDetail () {
  const [barber, SetBarber] = useState({})
  const { barbersData, barberToCreateAppointment } = useBarberContext()

  const barberDetailData = barbersData.filter(barber => barber.id == barberToCreateAppointment)

  useEffect(() => {
    SetBarber(barberDetailData[0])
  }, [barberToCreateAppointment])

  return (
    <>
      {barber.user ? (
        <div className="flex justify-center flex-wrap gap-8">
          <div
            className="
              w-80 flex flex-col items-center
              bg-neutral-900/95 rounded-3xl border border-neutral-800/60
              shadow-[0_12px_45px_rgba(0,0,0,0.35)]
              backdrop-blur-xl overflow-hidden transition-all duration-300
              hover:shadow-[0_18px_60px_rgba(0,0,0,0.50)] hover:-translate-y-2
            "
          >

            <div className="px-6 pt-7 pb-3">
              <p className="text-white text-2xl font-extrabold text-center tracking-tight">
                {barber.user.first_name} {barber.user.last_name}
              </p>
            </div>

            <div className="w-full flex justify-center mb-5">
              <Image
                src="/barber3.png"
                alt="Barber photo"
                width={180}
                height={180}
                className="
                  rounded-2xl shadow-lg shadow-black/40
                  transition-all duration-300
                  hover:scale-105
                "
              />
            </div>

            <div className="flex flex-col items-center gap-2 text-neutral-300 mb-6">
              <span className="text-sm font-medium">{barber.phone}</span>
              <span className="text-sm font-medium">{barber.email}</span>
            </div>

            <div className="w-full h-px bg-neutral-800/60"></div>

            <div
              className="
                w-full px-6 py-5 flex flex-col gap-2 justify-center items-center
                bg-neutral-800/40 text-neutral-200
              "
            >
              <span className="text-sm font-semibold tracking-wide">
                Work Schedule
              </span>

              <p className="text-xs text-neutral-300">
                Monday – Saturday
              </p>

              <div className="text-xs text-neutral-300 space-y-1">
                <p>{barber.work_start_time} – {barber.lunch_start_time}</p>
                <p>{barber.lunch_end_time} – {barber.work_end_time}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-neutral-400 text-center">Barber not available</p>
      )}
    </>
  )
}