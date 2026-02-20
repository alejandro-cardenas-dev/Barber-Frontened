'use client'

import { useAuthProvider } from "@/features/auth/hooks/useAuthProvider"
import { createContext, useContext } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const auth = useAuthProvider()

  return (
    <AuthContext.Provider value={ auth }>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}