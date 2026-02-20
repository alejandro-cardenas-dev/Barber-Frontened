'use client'

import { useState } from 'react'
import { useAuth } from '@/features/auth/context/authContext'
import LoginView from '../views/loginView'

export default function LoginContainer() {
  const { login } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    const success = await login(form.email, form.password)

    if (success) {
      setMessage('Login successful')
      setLoading(false)
    } else {
      setMessage('Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <LoginView
      form={form}
      loading={loading}
      message={message}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  )
}