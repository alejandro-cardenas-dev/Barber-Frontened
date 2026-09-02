'use client'

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { getAppointments } from "@/features/appointments/api/getAppointments"
import { useAuth } from "@/features/auth/context/authContext"

const AppointmentsAdminContext = createContext(null)

export function AppointmentsAdminProvider({ children }) {
  const { token } = useAuth()

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDate, setFilterDate] = useState('')

  const fetchAppointments = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setError(null)
    try {
      const data = await getAppointments(token, {
        status: filterStatus,
        date: filterDate,
      })
      setAppointments(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token, filterStatus, filterDate])

  useEffect(() => {
    if (token) fetchAppointments()
  }, [token, fetchAppointments])

  return (
    <AppointmentsAdminContext.Provider
      value={{
        appointments,
        total: appointments.length,
        loading,
        error,
        filterStatus,
        setFilterStatus,
        filterDate,
        setFilterDate,
      }}
    >
      {children}
    </AppointmentsAdminContext.Provider>
  )
}

export function useAppointmentsAdmin() {
  return useContext(AppointmentsAdminContext)
}