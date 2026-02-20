'use client'

import { createContext, useCallback, useContext, useState } from "react"
import { fetchBarbers } from "@/features/barbers/services/barber.service"

const BarberContext = createContext()

export function BarberProvider ({ children }) {
    const [loading, setLoading] = useState(false)
    const [barbersData, setBarbersData] = useState([])

    const getBarbers = useCallback(async (token) => {
      if (!token) return
      setLoading(true)

      try {
        const data = await fetchBarbers(token)
        setBarbersData(data)
      } finally {
        setLoading(false)
      }

    }, [])

  return (
    <BarberContext.Provider
      value={{
        barbersData,
        getBarbers,
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