'use client'
import API from "@/API/api"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetch_user = async (access) => {
    try {
      const res = await fetch(API.GET_USER, {
        headers: { 'Authorization': `Bearer ${access}` }
      })

      if (!res.ok) {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
        console.log('error doing fetch user');
        return null
      }

      const userData = await res.json()

      if (userData.is_barber) {
        const resBarber = await fetch(API.EDIT_BARBER_SCHEDULE, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`,
          }
        })

        if (!resBarber.ok) {
          setUser(null)
          console.log('error fetchingbarber data');
          return false
        }

        const dataBarber = await resBarber.json()
        setUser(dataBarber)
        console.log('login exitosooo para barbero');
        return dataBarber
      }

      if (userData.is_customer) {
        setUser(userData)
        console.log('user data using state: ', userData);
        console.log('login exitosooo para usuario');
        setLoadingUser(false)
        return userData
      }
      console.log('finall error doing user fetch ');
      return null


    } catch (err) {
      console.log("Error fetching user:", err)
      return null
    }
  }

  const login = async (email, password) => {
    const res = await fetch(API.GET_ACCESS_TOKEN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!res.ok) return false

    const data = await res.json()
    await fetch_user(data.access)
    localStorage.setItem('token', data.access)
    setToken(data.access)

    return true
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('token')

    const validate = async () => {
      if (savedToken) {
        setToken(savedToken)
        await fetch_user(savedToken)
      }
      setLoading(false)
    }

    validate()
  }, [])

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading, loadingUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}