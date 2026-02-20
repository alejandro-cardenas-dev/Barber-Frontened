'use client'

import { useAuth } from "@/features/auth/context/authContext";
import { useState, useEffect  } from "react";
import { updateBarberSchedule } from "../services/updateSchedules.service";

export function useEditBarberSchedule() {
  const { token, user, setUser } = useAuth()

  const [form, setForm] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        workStart: user.work_start_time,
        workEnd: user.work_end_time,
        lunchStart: user.lunch_start_time,
        lunchEnd: user.lunch_end_time,
      })
    }
  }, [user])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({...prev, [field]: e.target.value}))
  }

  const reset = () => {
    setForm({
      workStart: "10:00",
      workEnd: "16:00",
      lunchStart: "12:00",
      lunchEnd: "14:00",
    })
  }

  const unchanged = () => {
    if (!user || !form) return true

    return (
      form.workStart === user.work_start_time &&
      form.workEnd === user.work_end_time &&
      form.lunchStart === user.lunch_start_time &&
      form.lunchEnd === user.lunch_end_time
    )
  }

  const submit = async (e) => {
    e.preventDefault()

    if (unchanged()) {
      setMessage('You did not change any fields')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    try {
      const data = await updateBarberSchedule(token, form)
      setUser(data)
      setMessage('chedules edited successfully')

    } catch {
      setMessage('An error has ocurred. Please try againnnnnnnnnnn!')
    } finally {
      setLoading(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return {
    form,
    message,
    loading,
    handleChange,
    reset,
    submit,
    user,
  }
}