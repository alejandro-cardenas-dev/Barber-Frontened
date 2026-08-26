'use client'

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { getBarbers } from "../api/getBarbers"
import { useAuth } from "@/features/auth/context/authContext"

const BarberContext = createContext()

export function BarberProvider({ children }) {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [barbersData, setBarbersData] = useState([])
  const [error, setError] = useState(null)

  const handleGetBarbers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getBarbers(token)
      setBarbersData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    handleGetBarbers()
  }, [token, handleGetBarbers])

  return (
    <BarberContext.Provider
      value={{
        barbersData,
        loading,
        error,
        handleGetBarbers,
      }}
    >
      {children}
    </BarberContext.Provider>
  )
}

export function useBarber() {
  return useContext(BarberContext)
}