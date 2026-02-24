'use client'

import { useState } from "react";
import CreateAppointmentView from "../views/createAppointmentView";
import { useCreateAppointment } from "../hooks/useCreateAppointment";
import { useService } from "@/features/services/context/servicesContext";
import { useBarber } from "@/features/barbers/context/barberContext";
import { useCreateAppointmentContext } from "../context/createAppointmentContext";

export default function CreateAppointmentContainer() {
  const [serviceModal, setServiceModal] = useState(false)
  const [barberModal, setBarberModal] = useState(false)
  const [dateModal, setDateModal] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [message, setMessage] = useState('')

  const { servicesData } = useService()
  const { barbersData } = useBarber()

  const { setRefreshSchedules } = useCreateAppointmentContext()
  const { handleCreateAppointment, loading } = useCreateAppointment()

  const handleConfirm = async () => {
    try {
      await handleCreateAppointment()
      setRefreshSchedules(prev => prev + 1)
      setMessage('Appointment successfully created')
    } catch (err) {
      setMessage(err.message)
    } finally {
      setShowConfirmation(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
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
    />
  )
}