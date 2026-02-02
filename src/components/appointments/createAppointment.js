'use client'

import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { PiScissorsFill } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import BarbersSchedules from "@/components/barbers/barbersSchedules";
import { useBarberContext } from "@/context/barberContext";
import { useServiceContext } from "@/context/servicesContext";
import Image from "next/image";
import { useState } from "react";
import CreateConfirmation from "@/components/appointments/createConfirmation";
import { useCreateAppointmentContext } from "@/context/createAppointmentContext";

export default function CreateAppointment () {
  const [serviceModal, SetServiceModal] = useState(false)
  const [message, setMessage] = useState('')
  const [barberModal, SetBarberModal] = useState(false)
  const [dateModal, SetDateModal] = useState(false)
  const { servicesData } = useServiceContext()
  const [createAppointment, setCreateAppointment] = useState(false)

  const { barbersData } = useBarberContext()
  const {
    setBarberToCreateAppointment,
    barberToCreateAppointment,
    serviceToCreateAppointment,
    setServiceToCreateAppointment,
    timeToCreateAppointment
  } = useCreateAppointmentContext()

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen">

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

      <header className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold">Book Appointment</h2>
        <p className="mt-2">Configure your session in three easy steps.</p>
      </header>

      <div className="space-y-6">
        <section className="bg-neutral-900/50 rounded-2xl shadow-sm border border-neutral-700 p-6 transition-all hover:shadow-md">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => SetServiceModal(!serviceModal)}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><PiScissorsFill /></div>
              <h3 className="text-lg font-semibold">Choose Service</h3>
            </div>
            <span className="text-indigo-600 font-medium">{serviceModal ? 'Close' : 'Change'}</span>
          </div>

          {serviceModal || serviceToCreateAppointment && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 animate-in fade-in slide-in-from-top-2">
              {servicesData.map((service) => (
                <div
                  key={service.id}
                  className={`
                    p-4 border-2 rounded-xl
                    transition-colors cursor-pointer group
                    hover:bg-neutral-950 hover:border-indigo-500
                    ${
                      serviceToCreateAppointment.id === service.id
                        ? 'border-indigo-500 text-indigo-500'
                        : 'border-neutral-700'
                    }
                  `}
                  onClick={() => setServiceToCreateAppointment(service)}
                >
                  <p className="font-medium group-hover:text-indigo-700">
                    {service.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-neutral-900/50 rounded-2xl shadow-sm border border-neutral-700 p-6 transition-all hover:shadow-md">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => SetBarberModal(!barberModal)}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><FaUser /></div>
              <h3 className="text-lg font-semibold ">Select Professional</h3>
            </div>
            <span className="text-emerald-600 font-medium">{barberModal ? 'Close' : 'Change'}</span>
          </div>

          {barberModal && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 animate-in fade-in">
              {barbersData.map((barber) => (
                <div

                  key={barber.id}
                  onClick={() => setBarberToCreateAppointment(barber)}
                  className={`
                      flex flex-col items-center p-4 rounded-2xl
                      border-2 hover:border-emerald-500
                      hover:bg-neutral-950 transition-all cursor-pointer
                      ${barberToCreateAppointment.id == barber.id
                        ? 'border-emerald-500'
                        : 'border-transparent'
                      }
                    `}
                >
                  <Image
                    src="/barber3.png"
                    alt={barber.user.first_name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover mb-3 ring-2 ring-gray-200"
                  />
                  <span className="font-medium">{barber.user.first_name}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-neutral-900/50 rounded-2xl shadow-sm border border-neutral-700 p-6 transition-all hover:shadow-md">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => SetDateModal(!dateModal)}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><FaCalendarAlt /></div>
              <h3 className="text-lg font-semibold ">Pick Date & Time</h3>
            </div>
            <span className="text-amber-600 font-medium">{dateModal ? 'Close' : 'Change'}</span>
          </div>

          {dateModal && (
            <div className="flex justify-center mt-4 p-2 rounded-xl">
              <BarbersSchedules />
            </div>
          )}
        </section>
      </div>

      <button
        onClick={() => setCreateAppointment(true)}
        disabled={!timeToCreateAppointment}
        className="w-full mt-8 bg-white text-black py-4 rounded-2xl font-bold text-lg hover:bg-neutral-600 transition-colors shadow-lg cursor-pointer">
        Confirm Appointment
      </button>

      {
        createAppointment && (
          <CreateConfirmation
            setCreateAppointment={setCreateAppointment}
            setMessage={setMessage}
          />
        )
      }
    </div>
  )

}