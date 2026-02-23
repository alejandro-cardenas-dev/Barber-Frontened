'use client'

import { createContext, useContext, useEffect, useState } from "react"
import API from "@/API/api"
import { useAuth } from "@/features/auth/context/authContext"

const ServiceContext = createContext(null)

export function ServiceProvider ({ children }) {
  const [servicesData, setServicesData] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    if (!token) return

    const getServices = async () => {
      const res = await fetch(API.GET_SERVICES, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })

      const data = await res.json()
      setServicesData(data)
    }

    getServices()
  }, [token])

  return (
    <ServiceContext.Provider
      value={{
        servicesData
      }}
    >
      { children }
    </ServiceContext.Provider>
  )
}

export function useServiceContext () {
  return useContext(ServiceContext)
}