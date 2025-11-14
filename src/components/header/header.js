'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuthContext } from '@/context/authContext'

export default function Header() {
  const pathname = usePathname()
  const { user } = useAuthContext()

  return (
    <header className="mb-12">

      <div className="relative h-[430px] w-full flex flex-col justify-end items-center">

        <Image
          src="/barbershop.png"
          alt="Barber shop"
          fill
          className="object-cover -z-10 opacity-90"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/70" />

        <h1 className="text-white text-5xl font-extrabold tracking-tight mb-14 drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
          ALEJO'S BARBER
        </h1>
      </div>


      <div
        className="
          flex justify-center items-center gap-2
          bg-neutral-900/85 mx-6 p-2 rounded-2xl
          shadow-[0_8px_30px_rgba(0,0,0,0.4)]
          backdrop-blur-xl border border-neutral-800
        "
      >

        {user.is_customer && (
          <Link
            href="/"
            className={`
              w-full px-4 py-2 rounded-xl text-center font-medium
              transition-all duration-200 text-sm
              ${
                pathname === "/" || pathname === "/create-appointment"
                  ? "bg-white text-black shadow-inner shadow-black/20"
                  : "text-neutral-300 hover:bg-neutral-800/50"
              }
            `}
          >
            Barbers
          </Link>
        )}

        <Link
          href="/appointments/"
          className={`
            w-full px-4 py-2 rounded-xl text-center font-medium
            transition-all duration-200 text-sm
            ${
              pathname === "/appointments"
                ? "bg-white text-black shadow-inner shadow-black/20"
                : "text-neutral-300 hover:bg-neutral-800/50"
            }
          `}
        >
          Get Appointments
        </Link>

        {!user.is_customer && (
          <Link
            href="/edit-schedules/"
            className={`
              w-full px-4 py-2 rounded-xl text-center font-medium
              transition-all duration-200 text-sm
              ${
                pathname === "/edit-schedules"
                  ? "bg-white text-black shadow-inner shadow-black/20"
                  : "text-neutral-300 hover:bg-neutral-800/50"
              }
            `}
          >
            Edit Schedules
          </Link>
        )}

      </div>
    </header>
  )
}