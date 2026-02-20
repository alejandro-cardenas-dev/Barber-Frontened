'use client'

import Link from "next/link"
import { useAuth } from "@/features/auth/context/authContext"

export default function Logout () {
  const { logout } = useAuth()

  const handleSubmit = () => {
    logout()
  }

  return (
    <div className="flex justify-center items-center h-screen px-6 bg-black">
      <div className="flex flex-col items-center bg-neutral-900/80 backdrop-blur-xl p-10 w-96 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.45)]">

        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-neutral-800 mb-6">
          <span className="text-4xl text-white">⎋</span>
        </div>

        <h2 className="text-white text-2xl font-semibold mb-1">You're leaving?</h2>
        <p className="text-neutral-400 mb-6 text-center">
          Are you sure you want to log out?
        </p>

        <div className="flex flex-col gap-3 w-full">
          <Link
            href="/"
            className="text-center py-3 rounded-2xl bg-white text-black font-medium
                       shadow-[0_2px_10px_rgba(255,255,255,0.25)] hover:bg-neutral-200
                       transition-all duration-200"
          >
            Nah, go back
          </Link>

          <button
            onClick={handleSubmit}
            className="py-3 rounded-2xl border border-white text-white font-medium
                       hover:bg-white hover:text-black transition-all duration-200"
          >
            Yes, log me out
          </button>
        </div>
      </div>
    </div>
  )
}