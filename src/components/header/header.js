'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthContext } from '@/context/authContext'

export default function Header() {
  const pathname = usePathname()
  const { user } = useAuthContext()

  const cleanPath = pathname.replace(/\/$/, '')

  const isActive = (path) => cleanPath === path

  return (
    <header className="relative mb-12">
      <div className="relative h-[380px] sm:h-[430px] w-full flex flex-col justify-center px-6 sm:px-8">
        <Image
          src="/barbershop.png"
          alt="Barber shop"
          fill
          priority
          className="object-cover -z-10 opacity-90"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/70" />

        <div className="max-w-2xl">
          <h1 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] mb-3">
            ALEJO'S BARBER
          </h1>
          <p className="text-neutral-400 sm:text-lg leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
            Alejo's Barber offers you the experience of improving your physical
            appearance with excellent service and haircut advice.
          </p>
        </div>
      </div>

      <nav
        className="
          flex justify-center items-center gap-2
          bg-neutral-900/85 mx-2.5 p-1.5 rounded-2xl
          shadow-[0_8px_30px_rgba(0,0,0,0.4)]
          backdrop-blur-xl border border-neutral-800
        "
      >
        {user?.is_customer && (
          <Link
            href="/"
            aria-current={isActive('') ? 'page' : undefined}
            className={`w-full px-4 py-2 rounded-xl text-center font-medium text-sm transition
              ${
                isActive('') || isActive('/create-appointment')
                  ? 'bg-white text-black shadow-inner shadow-black/20'
                  : 'text-neutral-300 hover:bg-neutral-800/50'
              }`}
          >
            Barbers
          </Link>
        )}

        <Link
          href="/appointments"
          aria-current={isActive('/appointments') ? 'page' : undefined}
          className={`w-full px-4 py-2 rounded-xl text-center font-medium text-sm transition
            ${
              isActive('/appointments')
                ? 'bg-white text-black shadow-inner shadow-black/20'
                : 'text-neutral-300 hover:bg-neutral-800/50'
            }`}
        >
          Get Appointments
        </Link>

        {!user?.is_customer && (
          <Link
            href="/edit-schedules"
            aria-current={isActive('/edit-schedules') ? 'page' : undefined}
            className={`w-full px-4 py-2 rounded-xl text-center font-medium text-sm transition
              ${
                isActive('/edit-schedules')
                  ? 'bg-white text-black shadow-inner shadow-black/20'
                  : 'text-neutral-300 hover:bg-neutral-800/50'
              }`}
          >
            Edit Schedules
          </Link>
        )}
      </nav>

      <div className="absolute top-6 right-6">
        <Link
          href="/logout"
          className="
            px-4 py-2 rounded-2xl text-sm font-medium border border-white text-white
            hover:bg-white hover:text-black transition-all duration-200
          "
        >
          Logout
        </Link>
      </div>
    </header>
  )
}