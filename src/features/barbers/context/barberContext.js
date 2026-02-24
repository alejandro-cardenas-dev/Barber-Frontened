'use client'

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { getBarbers } from "../api/getBarbers"
import { useAuth } from "@/features/auth/context/authContext"

const BarberContext = createContext()

export function BarberProvider ({ children }) {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [barbersData, setBarbersData] = useState([])

  const handleGetBarbers = useCallback(async () => {
    if (!token) return
    setLoading(true)

    try {
      const data = await getBarbers(token)
      setBarbersData(data)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (token) {
      handleGetBarbers()
    }
  }, [token, handleGetBarbers])

  return (
    <BarberContext.Provider
      value={{
        barbersData,
        loading,
      }}
    >
      { children }
    </BarberContext.Provider>
  )
}

export function useBarber() {
  return useContext(BarberContext)
}