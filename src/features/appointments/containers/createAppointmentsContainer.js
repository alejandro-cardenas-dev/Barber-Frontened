'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import CreateAppointmentView from "../views/createAppointmentView"
import { useCreateAppointment } from "../hooks/useCreateAppointment"
import { useService } from "@/features/services/context/servicesContext"
import { useBarber } from "@/features/barbers/context/barberContext"
import { useCreateAppointmentContext } from "../context/createAppointmentContext"
import AppointmentSuccessOverlay from "../components/appointmentSuccessOverlay"

export default function CreateAppointmentContainer() {
  const [serviceModal, setServiceModal] = useState(false)
  const [barberModal, setBarberModal] = useState(false)
  const [dateModal, setDateModal] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [message, setMessage] = useState('')
  const [appointmentCreated, setAppointmentCreated] = useState(false)

  const { servicesData } = useService()
  const { barbersData } = useBarber()

  const {
    barberToCreateAppointment,
    setBarberToCreateAppointment,
    serviceToCreateAppointment,
    setServiceToCreateAppointment,
    dateToCreateAppointment,
    timeToCreateAppointment,
    setRefreshSchedules,
  } = useCreateAppointmentContext()

  const { handleCreateAppointment, loading } = useCreateAppointment()
  const router = useRouter()

  const handleConfirm = async () => {
    try {
      await handleCreateAppointment()
      setRefreshSchedules(prev => prev + 1)
      setAppointmentCreated(true)
    } catch (err) {
      setMessage(err.message)
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setShowConfirmation(false)
    }
  }

  return (
    <>
      {appointmentCreated && <AppointmentSuccessOverlay />}

      <CreateAppointmentView
        serviceModal={serviceModal}
        setServiceModal={setServiceModal}
        barberModal={barberModal}
        setBarberModal={setBarberModal}
        dateModal={dateModal}
        setDateModal={setDateModal}
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        onConfirm={handleConfirm}
        loading={loading}
        servicesData={servicesData}
        barbersData={barbersData}
        barberToCreateAppointment={barberToCreateAppointment}
        setBarberToCreateAppointment={setBarberToCreateAppointment}
        serviceToCreateAppointment={serviceToCreateAppointment}
        setServiceToCreateAppointment={setServiceToCreateAppointment}
        dateToCreateAppointment={dateToCreateAppointment}
        timeToCreateAppointment={timeToCreateAppointment}
        message={message}
        onBack={() => router.back()}
      />
    </>
  )
}