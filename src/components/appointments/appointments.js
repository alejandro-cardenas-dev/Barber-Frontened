'use client'

import { useEffect, useState } from "react"
import { FaTimesCircle } from "react-icons/fa";
import API from "@/API/api"
import { useAuthContext } from "@/context/authContext"
import DeleteConfirmation from "./deleteConfirmation"
import Loader from "../loader"

export default function Appointments () {
  const [allAppointments, setAllAppointmets] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [cancelAppointment, setCancelAppointment] = useState(false)
  const [appointmentToCancel, setAppointmentToCancel] = useState(null)
  const { token } = useAuthContext()

  useEffect(() => {
    const get_appointments = async () => {
      setLoading(true)

      try {
        const res = await fetch(API.GET_APPOINTMENTS, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })

        const data = await res.json();

        if (res.ok) {
          setAllAppointmets(data);
        } else {
          console.log('error', data);
        }

      } catch (error) {
        console.log("Network error:", error);
      } finally {
        setLoading(false)
      }
    };

    if (token) get_appointments()
  }, [token])

  const handleOpenModal = (appointment_id) => {
    setCancelAppointment(!cancelAppointment)
    setAppointmentToCancel(appointment_id)
  }

  return (
    <div className="w-full flex flex-col items-center py-10 px-4 sm:px-6 lg:px-10">

      {loading && <Loader />}

      {message && (
        <div
          className="
            flex items-center gap-3
            fixed bottom-4 right-4 sm:bottom-6 sm:right-6
            max-w-[90%] sm:max-w-none
            px-4 sm:px-5 py-3
            rounded-2xl
            bg-gray-900 text-white
            border border-red-500
            shadow-[0_4px_15px_rgba(0,0,0,0.5)]
            font-semibold
            z-50 animate-fadeIn
          "
        >
          <span className="text-lg text-red-400">
            <FaTimesCircle />
          </span>
          <span className="text-sm sm:text-base">{message}</span>
        </div>
      )}

      {!loading && allAppointments.length > 0 && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {allAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="
                w-full max-w-sm rounded-3xl bg-neutral-900/95
                shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                border border-neutral-800/60 backdrop-blur-xl
                transition-all duration-300
                hover:shadow-[0_15px_50px_rgba(0,0,0,0.45)]
                hover:-translate-y-1.5
              "
            >

              <div className="px-6 py-4 border-b border-neutral-800/40">
                <p className="text-white font-semibold text-lg tracking-tight">
                  {appointment.appointment_date}
                </p>
              </div>

              <div className="px-6 py-6 flex flex-col gap-7">

                <div className="bg-black rounded-2xl py-5 shadow-inner shadow-black/40 flex items-center justify-center">
                  <span className="text-white text-4xl font-semibold tracking-tight">
                    {appointment.appointment_start_time.slice(0, 5)}
                  </span>
                </div>

                <div className="bg-neutral-100 rounded-2xl px-5 py-4 shadow-sm shadow-black/10">
                  <p className="text-neutral-900 text-[17px] font-semibold">
                    {appointment.customer.user.first_name} {appointment.customer.user.last_name}
                  </p>
                  <p className="text-neutral-600 mt-1 text-sm font-medium">
                    Barber: {appointment.barber.user.first_name} {appointment.barber.user.last_name}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4 mt-4">
                  <span className="text-neutral-500 text-xs tracking-wide">
                    © 2025 Alejo’s Barber
                  </span>

                  <span
                    onClick={() => handleOpenModal(appointment.id)}
                    className="
                      text-[13px] font-medium
                      px-5 py-2 rounded-xl
                      border border-neutral-700/50
                      text-neutral-200
                      hover:text-white
                      bg-neutral-900/60
                      hover:bg-neutral-800
                      transition-all duration-300
                      shadow-[0_2px_8px_rgba(0,0,0,0.25)]
                      cursor-pointer
                    "
                  >
                    Cancel Appointment
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && allAppointments.length === 0 && (
        <div className="text-neutral-400 text-sm mt-10">
          You don't have any appointment yet
        </div>
      )}

      {cancelAppointment && (
        <DeleteConfirmation
          setCancelAppointment={setCancelAppointment}
          cancelAppointment={cancelAppointment}
          setAppointmentToCancel={setAppointmentToCancel}
          appointment_id={appointmentToCancel}
          setAllAppointmets={setAllAppointmets}
          setMessage={setMessage}
        />
      )}
    </div>
  )
}