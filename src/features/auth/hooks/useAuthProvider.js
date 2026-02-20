

import { useState, useEffect } from 'react'
import { getAccessToken, getBarber, getUser } from '../services/auth.service'

export function useAuthProvider() {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async (access) => {
    try {
      const userData = await getUser(access)

      if (!userData) {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
        return null
      }

      if (userData.is_barber) {
        const barberData = await getBarber(access)
        setUser(barberData)
        return barberData
      }

      if (userData.is_customer) {
        setUser(userData)
        setLoadingUser(false)
        return userData
      }

      return null
    } catch {
      return null
    }
  }

  const login = async (email, password) => {
    const data = await getAccessToken(email, password)
    if (!data) return false

    await fetchUser(data.access)

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
    const validate = async () => {
      const savedToken = localStorage.getItem('token')

      if (savedToken) {
        setToken(savedToken)
        await fetchUser(savedToken)
      }
      setLoading(false)
    }

    validate()
  }, [])

  return {
    token,
    user,
    login,
    logout,
    loading,
    loadingUser,
  }
}