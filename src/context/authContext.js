'use client'
import API from "@/API/api"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [user, setUser] = useState({})
  const [token, setToken] = useState('')
  const router = useRouter()

  const fetch_user = async (access) => {
    const res = await fetch(API.GET_USER, {
      headers: { 'Authorization': `Bearer ${access}` }
    })

    if (!res.ok) {
      console.log('error fetching userrrrrrrr');
      return
    }

    const userData = await res.json()

    if (userData.is_barber) {
      const resBarber = await fetch(API.EDIT_BARBER_SCHEDULE, {
        method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`,
          },
        })

      if (resBarber.ok) {
        const dataBarber = await resBarber.json()
        setUser(dataBarber)
        console.log('barber user successsssssss', dataBarber);
        router.push('/appointments')
        return
      }
      console.log('Error fetching barber data')
      return
    }

    else if (userData.is_customer) {
      setUser(userData)
      console.log('userrrr', userData);
      router.push('/')
    }
  }

  const login = async (email, password) => {
    const res = await fetch(API.GET_ACCESS_TOKEN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      const data = await res.json()
      localStorage.setItem('token', data.access)
      setToken(data.access)
      console.log('data access:, ', data.access);
      await fetch_user(data.access)
      return true
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    router.push('/login')
  }

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    const validateToken = async () => {
      if (savedToken) {
        setToken(savedToken);
        try {
          await fetch_user(savedToken)
        } catch (err) {
          console.error("Error validando token:", err)
          localStorage.removeItem("token")
          setToken(null)
          setUser(null)
        }
      }
    };

    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, user, logout }}>
      { children }
    </AuthContext.Provider >
  )
}


export function useAuthContext() {
  return useContext(AuthContext)
}
