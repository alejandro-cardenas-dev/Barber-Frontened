'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header>
      <div className="relative h-[450px] w-full flex flex-col justify-center items-center mask-b-from-20% mask-b-to-90%">
        <Image
          src="/barbershop.png"
          alt="Barber shop"
          fill
          className="object-cover -z-10"
        />
        <h1 className="text-5xl font-black ml-5">ALEJO'S BARBER</h1>
      </div>

      <div className="flex justify-center items-center bg-neutral-800 p-1 mx-4 rounded-xl">
        <Link
          href="/"
          className={`flex justify-center w-full p-1 rounded-lg ${
            pathname === '/' || pathname === '/create-appointment' ? 'bg-black text-white' : 'hover:bg-neutral-700'
          }`}
        >
          Barbers
        </Link>

        <Link
          href="/appointments/"
          className={`flex justify-center w-full p-1 rounded-lg ${
            pathname === '/appointments' ? 'bg-black text-white' : 'hover:bg-neutral-700'
          }`}
        >
          Get Appointments
        </Link>
      </div>
    </header>
  )
}