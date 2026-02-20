'use client'

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import API from "@/API/api"
import { useAuth } from "../features/auth/context/authContext"

const BarberContext = createContext()

export function BarberProvider ({ children }) {
    const [barbersData, setBarbersData] = useState([])
    const { token, user } = useAuth()

    const getBarbers = useCallback(async () => {
      if (!token || !user || !user.is_customer) return

      const res = await fetch(API.GET_BARBERS, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })

      const data = await res.json()
      setBarbersData(data)

    }, [token, user])


    useEffect(() => {
      getBarbers()
    }, [getBarbers])


  return (
    <BarberContext.Provider
      value={{
        barbersData,
        getBarbers,
      }}
    >
      { children }
    </BarberContext.Provider>
  )
}

export function useBarberContext () {
  return useContext(BarberContext)
}