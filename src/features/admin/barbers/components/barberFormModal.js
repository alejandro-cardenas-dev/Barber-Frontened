'use client'
import { useState, useEffect } from "react"

const EMPTY_FORM = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  password2: '',
  work_start_time: '10:00',
  work_end_time: '16:00',
  lunch_start_time: '12:00',
  lunch_end_time: '14:00',
  is_active: true
}

export default function BarberFormModal({ open, onClose, onSubmit, initialData = null }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const isEditing = !!initialData

  useEffect(() => {
    if (initialData) {
      setForm({
        first_name: initialData.user?.first_name || '',
        last_name: initialData.user?.last_name || '',
        email: initialData.user?.email || '',
        phone: initialData.user?.phone || '',
        work_start_time: initialData.work_start_time || '10:00',
        work_end_time: initialData.work_end_time || '16:00',
        lunch_start_time: initialData.lunch_start_time || '12:00',
        lunch_end_time: initialData.lunch_end_time || '14:00',
        is_active: initialData.is_active ?? true,
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setError(null)
  }, [initialData, open])

  if (!open) return null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit(form)
      onClose()
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-700 rounded-3xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white tracking-tight uppercase">
            {isEditing ? 'Edit Barber' : 'New Barber'}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
            Personal Info
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                First Name
              </label>
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
                className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                placeholder="John"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                Last Name
              </label>
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
                className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
              placeholder="john@barber.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
              Phone
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
              placeholder="3001234567"
            />
          </div>

          {!isEditing && (
            <>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mt-2">
                Password
              </p>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                  Confirm Password
                </label>
                <input
                  name="password2"
                  type="password"
                  value={form.password2}
                  onChange={handleChange}
                  required
                  className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </>
          )}

          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mt-2">
            Schedule
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'work_start_time', label: 'Work Start' },
              { name: 'work_end_time', label: 'Work End' },
              { name: 'lunch_start_time', label: 'Lunch Start' },
              { name: 'lunch_end_time', label: 'Lunch End' },
            ].map(({ name, label }) => (
              <div key={name} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                  {label}
                </label>
                <input
                  name={name}
                  type="time"
                  value={form[name]}
                  onChange={handleChange}
                  required
                  className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="flex items-center gap-3 mt-1">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={form.is_active}
                onChange={handleChange}
                className="w-4 h-4 accent-white"
              />
              <label htmlFor="is_active" className="text-sm text-neutral-300">
                Active (visible and bookable)
              </label>
            </div>
          )}

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-neutral-700 text-neutral-400 py-3 rounded-full font-semibold text-sm uppercase tracking-widest hover:border-neutral-500 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-white text-black py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-neutral-200 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Barber'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}