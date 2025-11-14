'use client'

import BarbersSchedules from "./barbersSchedules"
import Image from "next/image"
import { useBarberContext } from "@/context/barberContext"
import Link from "next/link"

export default function Barbers () {
  const { barbersData, setBarberToCreateAppointment } = useBarberContext()



  return (
    <div className="flex flex-col items-center gap-10 py-10">
      <span className="text-3xl font-extrabold text-white tracking-tight">
        BARBERS
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {barbersData.length > 0 ? (
          barbersData.map((barber) => (
            <div
              key={barber.id}
              className="
                flex flex-col items-center bg-neutral-900/95 border border-neutral-800/50
                rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                backdrop-blur-xl p-6 transition-all duration-300
                hover:shadow-[0_15px_50px_rgba(0,0,0,0.45)] hover:-translate-y-1
              "
            >
              <p className="text-white text-2xl font-extrabold text-center mb-4">
                {barber.user.first_name} {barber.user.last_name}
              </p>

              <div className="mb-4 w-full flex justify-center">
                <Image
                  src="/barber3.png"
                  alt="Barber photo"
                  width={160}
                  height={160}
                  className="rounded-2xl shadow-lg shadow-black/30"
                />
              </div>

              <div className="flex flex-col items-center gap-1 text-neutral-200 mb-4">
                <span className="text-sm font-medium">{barber.user.phone}</span>
                <span className="text-sm font-medium">{barber.user.email}</span>
              </div>

              <Link
                href="/create-appointment/"
                onClick={() => setBarberToCreateAppointment(barber.id)}
                className="
                  px-5 py-2 rounded-xl bg-neutral-800/60 text-neutral-200 font-medium
                  shadow-[0_2px_8px_rgba(0,0,0,0.25)]
                  hover:bg-black hover:text-white transition-all duration-300
                "
              >
                Create Appointment
              </Link>
            </div>
          ))
        ) : (
          <div className="text-neutral-400 text-center col-span-full">
            There are no barbers available
          </div>
        )}

      </div>
    </div>
  )
}