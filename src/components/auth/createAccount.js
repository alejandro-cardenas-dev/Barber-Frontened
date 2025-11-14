'use client'

import API from "@/API/api"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateAccount () {
  const [email, setEmail] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [is_barber, setIs_barber] = useState(false)
  const [is_customer, setIs_customer] = useState(false)
  const [errorMessage, SetErrorMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('first_name', first_name)
    formData.append('last_name', last_name)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('password', password)
    formData.append('password2', password2)
    formData.append('is_barber', is_barber)
    formData.append('is_customer', is_customer)

    try {
      const res = await fetch(API.CREATE_USER, {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (res.ok) {
        console.log('done', data);
        router.push('/login/')
      } else {
        const error = Object.values(data).find(data => Array.isArray(data))?.[0]
        SetErrorMessage(error)
      }
    } catch (error) {
      console.error("catch error:", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-900/90 p-6">
      <form
        onSubmit={handleSubmit}
        className="
          flex flex-col w-80 bg-neutral-900/95 border border-neutral-800/50
          rounded-3xl p-8 gap-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          backdrop-blur-xl transition-all duration-300
          hover:shadow-[0_15px_50px_rgba(0,0,0,0.45)]
        "
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">CREATE ACCOUNT</h2>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-neutral-200 text-sm font-medium">First Name</label>
          <input
            type="text"
            placeholder="first name"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            required
            className="
              px-4 py-2 rounded-xl border border-neutral-700/50 bg-neutral-800/60
              text-white text-sm placeholder-neutral-400
              focus:outline-none focus:ring-2 focus:ring-white/50
              transition-all duration-200
            "
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-neutral-200 text-sm font-medium">Last Name</label>
          <input
            type="text"
            placeholder="last name"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
            required
            className="
              px-4 py-2 rounded-xl border border-neutral-700/50 bg-neutral-800/60
              text-white text-sm placeholder-neutral-400
              focus:outline-none focus:ring-2 focus:ring-white/50
              transition-all duration-200
            "
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-neutral-200 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              px-4 py-2 rounded-xl border border-neutral-700/50 bg-neutral-800/60
              text-white text-sm placeholder-neutral-400
              focus:outline-none focus:ring-2 focus:ring-white/50
              transition-all duration-200
            "
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-neutral-200 text-sm font-medium">Phone</label>
          <input
            type="phone"
            placeholder="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="
              px-4 py-2 rounded-xl border border-neutral-700/50 bg-neutral-800/60
              text-white text-sm placeholder-neutral-400
              focus:outline-none focus:ring-2 focus:ring-white/50
              transition-all duration-200
            "
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-neutral-200 text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              px-4 py-2 rounded-xl border border-neutral-700/50 bg-neutral-800/60
              text-white text-sm placeholder-neutral-400
              focus:outline-none focus:ring-2 focus:ring-white/50
              transition-all duration-200
            "
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-neutral-200 text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            placeholder="confirm password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            className="
              px-4 py-2 rounded-xl border border-neutral-700/50 bg-neutral-800/60
              text-white text-sm placeholder-neutral-400
              focus:outline-none focus:ring-2 focus:ring-white/50
              transition-all duration-200
            "
          />
        </div>

        <div className="flex justify-around mt-2 mb-4">
          <label className="flex items-center gap-2 text-neutral-200 text-sm font-medium cursor-pointer">
            <input
              type="radio"
              name="role"
              checked={is_barber}
              onChange={() => {
                setIs_barber(true);
                setIs_customer(false);
              }}
              className="accent-white"
            />
            Barber
          </label>

          <label className="flex items-center gap-2 text-neutral-200 text-sm font-medium cursor-pointer">
            <input
              type="radio"
              name="role"
              checked={is_customer}
              onChange={() => {
                setIs_customer(true);
                setIs_barber(false);
              }}
              className="accent-white"
            />
            Customer
          </label>
        </div>

        <button
          type="submit"
          className="
            w-full py-2 rounded-2xl bg-white text-black font-semibold
            shadow-[0_4px_12px_rgba(0,0,0,0.25)]
            hover:shadow-[0_6px_15px_rgba(0,0,0,0.35)]
            transition-all duration-300
          "
        >
          SIGN UP
        </button>
      </form>
    </div>
  )
}