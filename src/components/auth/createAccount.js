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
    <div className="flex justify-center" >
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center border border-mainColorText p-6 gap-y-3" >
        <h2 className="text-3xl font-bold" >CREATE ACCOUNT</h2>

        <p>{errorMessage}</p>
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

        <label>First Name</label>
          <input
            className="border border-mainColorText p-1.5 rounded-sm"
            type="text"
            placeholder="first_name"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col" >

        <label>Last Name</label>
          <input
            className="border border-mainColorText p-1.5 rounded-sm"
            type="text"
            placeholder="last_name"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col" >

        <label>Phone</label>
          <input
            className="border border-mainColorText p-1.5 rounded-sm"
            type="phone"
            placeholder="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

        <div className="flex flex-col" >

        <label>Password Confirmation</label>
          <input
            className="border border-mainColorText p-1.5 rounded-sm"
            type="password"
            placeholder="password 2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-between" >
          <label>
          <input
            type="radio"
            name="role"
            checked={is_barber}
            onChange={() => {
              setIs_barber(true)
              setIs_customer(false)
            }}
          />
            Barber
          </label>

          <label>
            <input
              type="radio"
              name="role"
              checked={is_customer}
              onChange={() => {
                setIs_customer(true)
                setIs_barber(false)
              }}
              />
            Customer
          </label>
        </div>

        <button type="submit" className="bg-[#cea36f99] p-2 text-black w-full" >
          SIGN UP
        </button>
      </form>
    </div>
  )
}