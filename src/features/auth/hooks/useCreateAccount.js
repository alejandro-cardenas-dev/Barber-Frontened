'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUser } from "../services/create.service";
import { useAuthContext } from "@/features/auth/context/authContext";

export function useCreateAccount() {
  const { user } = useAuthContext()

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
    role: '',
    is_barber: false,
    is_customer: false
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()

      formData.append('first_name', form.first_name)
      formData.append('last_name', form.last_name)
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      formData.append('password', form.password)
      formData.append('password2', form.password2)
      formData.append('is_barber', form.role === 'barber')
      formData.append('is_customer', form.role === 'customer')
      formData.delete('role')

      await createUser(formData)
      router.push('/login')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { user, form, message, loading, handleChange, handleSubmit }
}