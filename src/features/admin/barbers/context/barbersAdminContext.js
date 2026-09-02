'use client'
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { getBarbers } from "@/features/barbers/api/getBarbers"
import { createBarber } from "../api/createBarber"
import { updateBarber } from "../api/updateBarber"
import { deleteBarber } from "../api/deleteBarber"
import { useAuth } from "@/features/auth/context/authContext"

const BarbersAdminContext = createContext(null)

export function BarbersAdminProvider({ children }) {
  const { token } = useAuth()
  const [barbers, setBarbers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchBarbers = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setError(null)
    try {
      const data = await getBarbers(token)
      setBarbers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (token) fetchBarbers()
  }, [token, fetchBarbers])

  const handleCreate = useCallback(async (data) => {
    const newBarber = await createBarber(token, data)
    // CHECK THIS LATER
    // Re-fetch to get the full barber object with nested user data
    await fetchBarbers()
    return newBarber
  }, [token, fetchBarbers])

  const handleUpdate = useCallback(async (id, data) => {
    await updateBarber(token, id, data)
    await fetchBarbers()
  }, [token, fetchBarbers])

  const handleDelete = useCallback(async (id) => {
    await deleteBarber(token, id)
    setBarbers(prev => prev.map(b => b.id === id ? { ...b, is_active: false } : b))
  }, [token])

  return (
    <BarbersAdminContext.Provider
      value={{
        barbers,
        loading,
        error,
        fetchBarbers,
        handleCreate,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </BarbersAdminContext.Provider>
  )
}

export function useBarbersAdmin() {
  return useContext(BarbersAdminContext)
}