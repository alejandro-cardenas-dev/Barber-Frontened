'use client'

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { getServices } from "../api/getServices"
import { useAuth } from "@/features/auth/context/authContext"

const ServiceContext = createContext(null)

export function ServiceProvider({ children }) {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [servicesData, setServicesData] = useState([])
  const [error, setError] = useState(null)

  const handleGetServices = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getServices(token)
      setServicesData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    handleGetServices()
  }, [token, handleGetServices])

  return (
    <ServiceContext.Provider
      value={{
        servicesData,
        loading,
        error,
        handleGetServices,
      }}
    >
      {children}
    </ServiceContext.Provider>
  )
}

export function useService() {
  return useContext(ServiceContext)
}