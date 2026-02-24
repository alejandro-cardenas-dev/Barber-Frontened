'use client'

import { createContext, useContext, useState } from "react"

const CreateAppointmentContext = createContext(null)

export function CreateAppointmentProvider ({ children }) {
  const [barberToCreateAppointment, setBarberToCreateAppointment] = useState('')
  const [dateToCreateAppointment, setDateToCreateAppointment] = useState('')
  const [timeToCreateAppointment, setTimeToCreateAppointment] = useState('')
  const [serviceToCreateAppointment, setServiceToCreateAppointment] = useState('')
  const [refreshSchedules, setRefreshSchedules] = useState(0)

  return (
    <CreateAppointmentContext.Provider
      value={{
        barberToCreateAppointment, setBarberToCreateAppointment,
        dateToCreateAppointment, setDateToCreateAppointment,
        timeToCreateAppointment, setTimeToCreateAppointment,
        serviceToCreateAppointment, setServiceToCreateAppointment,
        refreshSchedules, setRefreshSchedules
      }}
    >
      { children }
    </CreateAppointmentContext.Provider>
  )
}

export function useCreateAppointmentContext () {
  return useContext(CreateAppointmentContext)
}