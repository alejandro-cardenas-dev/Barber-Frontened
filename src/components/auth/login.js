'use client'
import { useAuthContext } from "@/context/authContext"
import Link from "next/link"
import { useState } from "react"

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuthContext()
  const [message, SetMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const success = await login(email, password)
    console.log('successs:', success);

    if (success) {
      SetMessage('Login successful')
      setLoading(false)
    } else {
      setLoading(false)
      SetMessage('Password does not match or account does not exist')
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

        {message && (
          <p className={`text-sm text-center
            ${message.includes('successful') ? 'text-green-700': 'text-red-600'}`}
          >
            {message}
          </p>
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
            flex justify-center items-center w-full py-2 rounded-2xl
            bg-white text-black font-semibold cursor-pointer
            hover:bg-neutral-300
            "
        >
          LOGIN
          {loading &&
              <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
          }
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