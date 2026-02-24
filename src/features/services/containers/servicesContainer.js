'use client'

import { useService } from "../context/servicesContext"
import ServicesView from "../views/servicesView"
import Loader from "@/shared/ui/loader"

export default function ServicesContainer() {
  const { servicesData, loading } = useService()

  if (loading) return <Loader />
  if (!servicesData || servicesData.length === 0) {
    return <div className="text-neutral-400 p-6" >No services available</div>
  }

  return <ServicesView services={servicesData} />
}