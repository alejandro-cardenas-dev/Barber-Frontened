import { useState } from "react"
import API from "@/API/api"
import { useAuthContext } from "@/context/authContext"
import { useBarberContext } from "@/context/barberContext"

export default function CreateConfirmation({ setCreateAppointment, setMessage }) {
  const [loading, setLoading] = useState(false)
  const { token } = useAuthContext()
  const {
    timeToCreateAppointment,
    barberToCreateAppointment,
    dateToCreateAppointment,
    reloadBarberSchedules,
    setReloadBarberSchedules,
    setTimeToCreateAppointment
  } = useBarberContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch(API.CREATE_APPOINTMENT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        barber: barberToCreateAppointment.id,
        appointment_date: dateToCreateAppointment,
        appointment_start_time: timeToCreateAppointment,
      })
    })
    const data = await res.json()

    if (res.ok) {
      setLoading(false)
      setMessage('Appointment successfully created')
      setReloadBarberSchedules(!reloadBarberSchedules)
      setTimeToCreateAppointment(null)
      setCreateAppointment(false)
      setTimeout(() => setMessage(''), 3000)
    } else {
      const error = Object.values(data).find(v => Array.isArray(v))?.[0]
      setMessage(error)
      setLoading(false)
      setMessage('Error creating, please try again!')
      setTimeToCreateAppointment(null)
      setCreateAppointment(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleCloseModal = () => {
    setTimeToCreateAppointment(null)
    setCreateAppointment(false)
  }

  return (
    <div className="
      fixed inset-0 z-100
      flex justify-center items-center
      backdrop-blur-sm bg-black/40
      animate-fadeIn
    ">
      <div className="
        w-[90%] max-w-md p-6
        bg-neutral-900 border border-neutral-700
        rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.3)]
        text-white
        animate-scaleIn
      ">
        <h2 className="text-xl font-semibold mb-4">
          Confirm your appointment
        </h2>

        <div className="
          bg-neutral-800/60 border border-neutral-700
          rounded-2xl p-4 mb-6 backdrop-blur-sm
          shadow-[0_6px_20px_rgba(0,0,0,0.25)]
        ">
          <h3 className="text-lg font-semibold mb-3">
            Appointment Details
          </h3>

          <div className="flex flex-col gap-2 text-sm text-neutral-300">

            <div className="flex justify-between">
              <span>Barber:</span>
              <span className="font-medium text-white">
                {`${barberToCreateAppointment.user.first_name} ` || "Not selected"}

                {barberToCreateAppointment.user.last_name  || "Not selected"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-medium text-white">
                {dateToCreateAppointment || "Not selected"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Time:</span>
              <span className="font-medium text-white">
                {timeToCreateAppointment || "Not selected"}
              </span>
            </div>

          </div>
        </div>

        <p className="mb-6 text-neutral-300">
          Your appointment is almost ready. Please confirm to continue.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleCloseModal}
            className="
              px-4 py-2 rounded-xl
              bg-neutral-700 hover:bg-neutral-600
              transition-all
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              px-4 py-2 rounded-xl font-semibold
              bg-white text-black
              shadow-[0_4px_12px_rgba(0,0,0,0.25)]
              hover:shadow-[0_6px_18px_rgba(0,0,0,0.35)]
              transition-all
              flex items-center
            "
          >
            Confirm
            {loading && (
              <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}