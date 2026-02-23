'use client'

import { useCreateAppointmentContext } from "@/features/appointments/context/createAppointmentContext";
import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service }) {
  const { setServiceToCreateAppointment } = useCreateAppointmentContext()

  return(
    <div
      className="
        group flex flex-col justify-between
        bg-neutral-900/50 border border-neutral-800
        p-6 rounded-3xl transition-all duration-500
        hover:border-neutral-600 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50
      "
    >
      <div className="flex gap-5 mb-6">
        <div className="relative shrink-0">
          <Image
            src="/barber3.png"
            alt={service.name}
            width={100}
            height={100}
            className="rounded-2xl"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-bold text-white tracking-tight uppercase">
            {service.name}
          </h3>
          <p className="text-sm text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-800">
        <span className="text-2xl font-light text-white">
          ${service.price}
        </span>

        <Link
          href="/book-appointment"
          onClick={() => setServiceToCreateAppointment(service)}
          className="
            bg-white text-black px-6 py-2 rounded-full
            font-bold text-sm uppercase tracking-widest
            hover:bg-neutral-200 transition-colors
          "
        >
          Book
        </Link>
      </div>
    </div>
  )
}