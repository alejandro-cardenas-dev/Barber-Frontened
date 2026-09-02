'use client'

import { useAppointmentsAdmin } from "../context/appointmentsAdminContext"
import AppointmentsAdminView from "../views/appointmentsAdminView"
import Loader from "@/shared/ui/loader"

export default function AppointmentsAdminContainer() {
  const {
    appointments,
    total,
    loading,
    error,
    filterStatus,
    setFilterStatus,
    filterDate,
    setFilterDate,
  } = useAppointmentsAdmin()

  if (loading) return <Loader />
  if (error) return <div className="text-red-400 p-6">{error}</div>

  return (
    <AppointmentsAdminView
      appointments={appointments}
      total={total}
      filterStatus={filterStatus}
      setFilterStatus={setFilterStatus}
      filterDate={filterDate}
      setFilterDate={setFilterDate}
    />
  )
}