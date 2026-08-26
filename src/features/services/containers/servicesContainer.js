'use client'

import { useService } from "../context/servicesContext"
import { useCreateAppointmentContext } from "@/features/appointments/context/createAppointmentContext"
import ServicesView from "../views/servicesView"
import Loader from "@/shared/ui/loader"

export default function ServicesContainer() {
  const { servicesData, loading, error } = useService()
  const { setServiceToCreateAppointment } = useCreateAppointmentContext()

  if (loading) return <Loader />
  if (error) return <div className="text-red-400 p-6">{error}</div>
  if (!servicesData || servicesData.length === 0) {
    return <div className="text-neutral-400 p-6">No services available</div>
  }

  return (
    <ServicesView
      services={servicesData}
      onBook={setServiceToCreateAppointment}
    />
  )
}