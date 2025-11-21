"use client"

import { useAuthContext } from "@/context/authContext"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import Loader from "./loader"

const PUBLIC_ROUTES = ['/login', '/create-account']

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuthContext()
  const pathname = usePathname()
  const router = useRouter()

  const isPublic = PUBLIC_ROUTES.includes(pathname)

  useEffect(() => {
    if (loading) return

    if (!token && !isPublic) {
      router.replace('/login')
    }

    if (token && isPublic) {
      router.replace('/')
    }
  }, [loading, token, pathname, router])

  if (loading) return <Loader />

  if (!token && !isPublic) return <Loader />

  return <>{children}</>
}