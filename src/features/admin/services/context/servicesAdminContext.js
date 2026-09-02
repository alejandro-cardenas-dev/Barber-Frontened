'use client'
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { useAuth } from "@/features/auth/context/authContext"
import { getServices } from "@/features/services/api/getServices"
import { createService } from "../api/createService"
import { updateService } from "../api/updateService"
import { deleteService } from "../api/deleteService"

const ServicesAdminContext = createContext(null)

export function ServicesAdminProvider({ children }) {
  const { token } = useAuth()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchServices = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setError(null)
    try {
      const data = await getServices(token)
      setServices(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (token) fetchServices()
  }, [token, fetchServices])

  const handleCreate = useCallback(async (data) => {
    const newService = await createService(token, data)
    setServices(prev => [...prev, newService])
    return newService
  }, [token])

  const handleUpdate = useCallback(async (id, data) => {
    const updated = await updateService(token, id, data)
    setServices(prev => prev.map(s => s.id === id ? updated : s))
    return updated
  }, [token])

  const handleDelete = useCallback(async (id) => {
    await deleteService(token, id)
    setServices(prev => prev.map(s => s.id === id ? { ...s, is_active: false } : s))
  }, [token])

  return (
    <ServicesAdminContext.Provider
      value={{
        services,
        loading,
        error,
        fetchServices,
        handleCreate,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </ServicesAdminContext.Provider>
  )
}

export function useServicesAdmin() {
  return useContext(ServicesAdminContext)
}