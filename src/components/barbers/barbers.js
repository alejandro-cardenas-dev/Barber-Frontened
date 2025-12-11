'use client'

import Image from "next/image"
import Link from "next/link"
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useBarberContext } from "@/context/barberContext"

export default function Barbers () {
  const { barbersData, setBarberToCreateAppointment } = useBarberContext()

  return (
    <div className="flex flex-col items-center justify-center gap-10 pb-10">
      <span className="text-3xl font-extrabold text-white tracking-tight">
        BARBERS
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {barbersData.length > 0 ? (
          barbersData.map((barber) => (
            <div
              key={barber.id}
              className="
                group relative flex flex-col items-center
                bg-neutral-900/95 border border-neutral-800/60
                rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                backdrop-blur-xl p-7 transition-all duration-300
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)]
                hover:-translate-y-2 hover:border-neutral-700/80
              "
            >
              <p className="text-white text-2xl font-extrabold text-center mb-5 tracking-tight">
                {barber.user.first_name} {barber.user.last_name}
              </p>

              <div className="mb-5 w-full flex justify-center">
                <Image
                  src="/barber3.png"
                  alt="Barber photo"
                  width={160}
                  height={160}
                  className="
                    rounded-2xl shadow-lg shadow-black/40
                    group-hover:scale-105 transition-all duration-300
                  "
                />
              </div>

              <div className="flex flex-col gap-3 text-neutral-300 w-full mb-6">
                <div className="flex items-center gap-3">
                  <FaPhone className="text-neutral-400" />
                  <span className="text-sm font-medium">{barber.user.phone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MdEmail className="text-neutral-400" />
                  <span className="text-sm font-medium">{barber.user.email}</span>
                </div>
              </div>

              <Link
                href="/create-appointment/"
                onClick={() => setBarberToCreateAppointment(barber.id)}
                className="
                  w-full text-center px-5 py-2.5
                  rounded-xl bg-neutral-800/60 text-neutral-200 font-medium
                  shadow-[0_2px_8px_rgba(0,0,0,0.25)]
                  transition-all duration-300
                  hover:bg-black hover:text-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]
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