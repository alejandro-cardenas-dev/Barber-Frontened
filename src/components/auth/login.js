'use client'

import { useAuthContext } from "@/context/authContext"
import { useState } from "react"

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuthContext()


  const handleSubmit = async (e) => {
    console.log('before');
    console.log('email', email);
    console.log('password', password);



    e.preventDefault()

    try {
      const success = await login(email, password)
      console.log('successs:', success);

      if (success) {
        console.log('login success');

      } else {
        console.log('error doing login');

      }

    } catch (error) {
      console.log('errorrrrrrrrr:', error);

    }


  }

  return (
    <div className="flex justify-center" >
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center border border-mainColorText p-6 gap-y-3" >
        <h2 className="text-3xl font-bold" >LOGIN</h2>

        <div className="flex flex-col" >
          <label>Email</label>
          <input
            className="border border-mainColorText p-1.5 rounded-sm"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col" >
          <label>Password</label>
          <input
            className="border border-mainColorText p-1.5 rounded-sm"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="bg-[#cea36f99] p-2 text-black w-full" >
          LOGIN
        </button>
      </form>
    </div>
  )
}