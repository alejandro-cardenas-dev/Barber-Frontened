'use client'

import { useBarberContext } from "@/context/barberContext"
import BarbersView from "../views/barbersView"

export default function BarbersContainer() {
  const { barbersData } = useBarberContext()

  if (!barbersData || barbersData.length === 0) {
    return <div className="text-neutral-400 p-6" >No barbers available</div>
  }

  return <BarbersView barbers={barbersData} />
}