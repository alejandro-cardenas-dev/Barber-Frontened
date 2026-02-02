"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuthContext } from "@/context/authContext"
import Loader from "./loader"

const PUBLIC_ROUTES = ['/login', '/create-account']

export default function ProtectedRoute({ children }) {
  const { token, loading, user } = useAuthContext()
  const pathname = usePathname()
  const router = useRouter()

  const isPublic = PUBLIC_ROUTES.includes(pathname)

  useEffect(() => {
    if (loading) return

    if (!token && !isPublic) {
      router.replace('/login')
    }

    if (token && isPublic && user.is_customer) {
      console.log('customer since protected', user);

      router.replace('/services')
    }

    if (token && isPublic && !user.is_customer) {
      console.log('barber since protected', user);

      router.replace('/appointments')
    }


  }, [loading, token, pathname, router])

  if (loading) return <Loader />

  if (!token && !isPublic) return <Loader />

  return <>{children}</>
}