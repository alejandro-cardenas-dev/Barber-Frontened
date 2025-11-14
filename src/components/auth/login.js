'use client'
import { useAuthContext } from "@/context/authContext"
import Link from "next/link"
import { useState } from "react"

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuthContext()
  const [errorMessage, SetErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    console.log('before');
    console.log('email', email);
    console.log('password', password);
    e.preventDefault()

    try {
      const success = await login(email, password)
      console.log('successs:', success);

      if (success.ok) {
        console.log('login success');

      } else {
        const data = await success.json()
        const error = Object.values(data).find(data => Array.isArray(data))?.[0]
        SetErrorMessage(error)
        console.log('error doing login', errorMessage);
      }

    } catch {
      const error = 'This account does not exist'
      SetErrorMessage(error)
      // console.log('errorrrrrrrrr:', error);
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
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">LOGIN</h2>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

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

        <button
          type="submit"
          className="
            mt-4 w-full py-2 rounded-2xl bg-white text-black font-semibold
            shadow-[0_4px_12px_rgba(0,0,0,0.25)]
            hover:shadow-[0_6px_15px_rgba(0,0,0,0.35)]
            transition-all duration-300
          "
        >
          LOGIN
        </button>

        <Link
          href="/create-account/"
          className="text-sm text-neutral-400 mt-2 text-center hover:text-white transition-colors duration-200"
        >
          Create account
        </Link>
      </form>
    </div>
  )
}