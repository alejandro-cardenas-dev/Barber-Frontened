'use client'

import { useState } from "react";
import CreateAppointmentView from "../views/createAppointmentView";
import { useCreateAppointment } from "../hooks/useCreateAppointment";

export default function CreateAppointmentContainer() {
  const [serviceModal, setServiceModal] = useState(false)
  const [barberModal, setBarberModal] = useState(false)
  const [dateModal, setDateModal] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [message, setMessage] = useState('')

  const { createAppointment, loading } = useCreateAppointment()

  const handleConfirm = async () => {
    try {
      await createAppointment()
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
    />
  )
}