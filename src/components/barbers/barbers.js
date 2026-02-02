'use client'

import Image from "next/image"
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useBarberContext } from "@/context/barberContext"

export default function Barbers () {
  const { barbersData } = useBarberContext()
  return (
    <section className="w-full px-6 py-10">

      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {barbersData.length > 0 ? (
          barbersData.map((barber) => (
            <div
              key={barber.id}
              className="
                flex flex-col md:flex-row items-center
                bg-neutral-900
                "
            >

              <div className="relative w-full md:w-[280px] h-[260px]">
                <Image
                  src="/barber3.png"
                  alt="Barber photo"
                  fill
                  className="
                  object-cover
                  transition-all duration-500
                  "
                />

              </div>

              <div className="flex-1 px-8 py-8 flex flex-col gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Barber
                  </p>
                  <h2 className="text-3xl font-extrabold text-white leading-tight">
                    {barber.user.first_name}
                    <br />
                    {barber.user.last_name}
                  </h2>
                </div>

                <div className="flex flex-col gap-4 text-neutral-400">
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-neutral-500" />
                    <span className="text-sm">
                      {barber.user.phone}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MdEmail className="text-neutral-500" />
                    <span className="text-sm">
                      {barber.user.email}
                    </span>
                  </div>
                </div>

                {/* <button
                  className="
                    mt-4 w-fit
                    px-6 py-3
                    bg-neutral-200
                    text-black
                    font-semibold
                    tracking-wide
                    hover:bg-white
                    transition-colors
                  "
                >
                  SELECT BARBER
                </button> */}
              </div>

            </div>
          ))
        ) : (
          <p className="text-neutral-500 text-center">
            No barbers available
          </p>
        )}
      </div>
    </section>
  );
}