'use client'

import { createContext, useCallback, useContext, useState } from "react"
import { getBarbers } from "../api/getBarbers"

const BarberContext = createContext()

export function BarberProvider ({ children }) {
    const [loading, setLoading] = useState(false)
    const [barbersData, setBarbersData] = useState([])

    const handleGetBarbers = useCallback(async (token) => {
      if (!token) return
      setLoading(true)

      try {
        const data = await getBarbers(token)
        setBarbersData(data)
      } finally {
        setLoading(false)
      }

    }, [])

  return (
    <BarberContext.Provider
      value={{
        barbersData,
        handleGetBarbers,
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