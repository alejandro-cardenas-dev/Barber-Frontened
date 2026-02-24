'use client'

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { getServices } from "../api/getServices"
import { useAuth } from "@/features/auth/context/authContext"

const ServiceContext = createContext(null)

export function ServiceProvider({ children }) {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [servicesData, setServicesData] = useState([])

  const handleGetServices = useCallback(async () => {
    if (!token) return
    setLoading(true)

    try {
      const data = await getServices(token)
      setServicesData(data)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (token) {
      handleGetServices()
    }
  }, [token, handleGetServices])

  return (
    <ServiceContext.Provider
      value={{
        servicesData,
        loading,
      }}
    >
      {children}
    </ServiceContext.Provider>
  )
}

export function useService() {
  return useContext(ServiceContext)
}