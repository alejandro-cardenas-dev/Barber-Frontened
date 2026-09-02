'use client'

import { useState } from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const cleanPath = pathname.replace(/\/$/, '')
  const isActive = (path) => cleanPath === path

  const navLinks = [
    { name: 'Services', href: '/admin/services' },
    { name: 'Barbers', href: '/admin/barbers' },
    { name: 'Appointments', href: '/admin/appointments' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-neutral-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <div className="flex items-center gap-4">
          <Link href="/admin/appointments">
            <h1 className="text-white font-black tracking-tighter text-xl">
              ALEJO'S <span className="text-neutral-700">ADMIN</span>
            </h1>
          </Link>

          <nav className="hidden md:flex gap-2 ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[10px] uppercase transition-colors px-3 py-1 rounded-md tracking-widest ${
                  isActive(link.href) ? 'text-white bg-neutral-900' : 'text-neutral-500 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/logout"
            className="hidden md:block text-[10px] tracking-widest font-black text-neutral-500 hover:text-white transition-colors uppercase"
          >
            Logout
          </Link>

          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      <div className={`
        absolute top-full left-0 w-full bg-black/95 border-b border-neutral-800 transition-all duration-300 ease-in-out md:hidden
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
      `}>
        <nav className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-bold tracking-tight ${
                isActive(link.href) ? 'text-white pl-2 border-l-2 border-white' : 'text-neutral-500 pl-2 border-l-2 border-transparent'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px w-full bg-neutral-900 my-2" />
          <Link
            href="/logout"
            className="text-neutral-500 text-sm font-bold uppercase tracking-widest pl-2"
          >
            Logout
          </Link>
        </nav>
      </div>
    </header>
  )
}