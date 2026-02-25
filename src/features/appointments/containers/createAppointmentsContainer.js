'use client'

import { useState } from "react";
import CreateAppointmentView from "../views/createAppointmentView";
import { useCreateAppointment } from "../hooks/useCreateAppointment";
import { useService } from "@/features/services/context/servicesContext";
import { useBarber } from "@/features/barbers/context/barberContext";
import { useCreateAppointmentContext } from "../context/createAppointmentContext";
import AppointmentSuccessOverlay from "../components/appointmentSuccessOverlay";
import { useRouter } from "next/navigation";

export default function CreateAppointmentContainer() {
  const [serviceModal, setServiceModal] = useState(false)
  const [barberModal, setBarberModal] = useState(false)
  const [dateModal, setDateModal] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [message, setMessage] = useState('')
  const [appointmentCreated, setAppointmentCreated] = useState(false)

  const { servicesData } = useService()
  const { barbersData } = useBarber()

  const { setRefreshSchedules } = useCreateAppointmentContext()
  const { handleCreateAppointment, loading } = useCreateAppointment()

  const router = useRouter()

  const handleConfirm = async () => {
    try {
      await handleCreateAppointment()
      setRefreshSchedules(prev => prev + 1)
      setAppointmentCreated(true)
    } catch (err) {
      setMessage(err.message)
    } finally {
      setShowConfirmation(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleBack = () => {
    router.back()
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
        message={message}
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        onConfirm={handleConfirm}
        loading={loading}
        barbersData={barbersData}
        servicesData={servicesData}
        onBack={handleBack}
      />
    </>
  )
}