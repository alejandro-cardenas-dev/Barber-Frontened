'use client'

import { useBarber } from "@/features/barbers/context/barberContext"
import BarbersView from "../views/barbersView"
import Loader from "@/shared/ui/loader"

export default function BarbersContainer() {
  const { barbersData, loading, error } = useBarber()

  if (loading) return <Loader />
  if (error) return <div className="text-red-400 p-6">{error}</div>
  if (barbersData.length === 0) return <div className="text-neutral-400 p-6">No barbers available</div>

  return <BarbersView barbers={barbersData} />
}