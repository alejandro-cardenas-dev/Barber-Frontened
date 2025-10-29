'use client'
import API from "@/API/api"
import { useRouter } from "next/navigation"
import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [token, setToken] = useState('')
  const router = useRouter()

  const login = async (email, password) => {
    const res = await fetch(API.GET_ACCESS_TOKEN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      const data = await res.json()
      console.log('data access:, ', data.access);
      setToken(data.access)
      router.push('/')
      localStorage.setItem('token', data.access)
      return true
    }
  }

  return (
    <AuthContext.Provider value={{ token, login }}>
      { children }
    </AuthContext.Provider >
  )
}


export function useAuthContext() {
  return useContext(AuthContext)
}
