'use client'

import { useEffect } from "react"
import { useBarber } from "@/features/barbers/context/barberContext"
import { useAuth } from "@/features/auth/context/authContext"
import BarbersView from "../views/barbersView"
import Loader from "@/shared/ui/loader"

export default function BarbersContainer() {
  const { token } = useAuth()
  const { barbersData, handleGetBarbers, loading } = useBarber()

  useEffect(() => {
    if (!token) return
    handleGetBarbers(token)
  }, [token, handleGetBarbers])

  if (loading) return <Loader />
  if (barbersData.length === 0) {
    return <div className="text-neutral-400 p-6">No barbers available</div>
  }

  return <BarbersView barbers={barbersData} />
}