'use client'

import { useState } from "react"
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle } from "react-icons/fa";

import { useBarberContext } from "@/context/barberContext"
import BarberDetail from "../barbers/barberDetail"
import BarbersSchedules from "../barbers/barbersSchedules"
import CreateConfirmation from "./createConfirmation";

export default function CreateAppointmen () {
  const [message, setMessage] = useState('')
  const [createAppointment, setCreateAppointment] = useState(false)
  const { timeToCreateAppointment } = useBarberContext()

  const handleOpenModal = () => {
    setCreateAppointment(!createAppointment)
  }

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center md:items-start gap-12 py-10">

      {message && (
        <div
          className={`
            flex items-center gap-3
            fixed bottom-6 right-6
            px-5 py-3
            rounded-2xl
            shadow-[0_4px_15px_rgba(0,0,0,0.25)]
            font-semibold
            z-50
            animate-fadeIn
            ${message.includes('successfully')
              ? 'bg-white text-black'
              : 'bg-red-600 text-white'
            }
          `}
        >
          <span className="text-lg">
            {message.includes('successfully')
              ? <FaCheckCircle />
              : <FaExclamationCircle />
            }
          </span>
          <span>{message}</span>
        </div>
      )}

      <BarberDetail />

      <div className="flex flex-col items-center gap-6 w-80">

        <BarbersSchedules />

        <div className="flex justify-end w-full">
          <button
            onClick={handleOpenModal}
            disabled={!timeToCreateAppointment}
            className={`
              flex justify-center items-center w-[120px] py-2 rounded-2xl font-semibold transition-all
              ${timeToCreateAppointment
                ? 'bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.35)]'
                : 'bg-neutral-700 text-neutral-400 cursor-not-allowed'}
            `}
          >
            Create
          </button>
        </div>
      </div>

      {createAppointment && (
        <CreateConfirmation
          setCreateAppointment={setCreateAppointment}
          setMessage={setMessage}
        />
      )
      }

    </div>
  )
}