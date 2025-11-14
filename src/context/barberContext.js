'use client'

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAuthContext } from "./authContext"
import API from "@/API/api"

const BarberContext = createContext()

export function BarberProvider ({ children }) {
    const [barbersData, setBarbersData] = useState([])
    const [barberToCreateAppointment, setBarberToCreateAppointment] = useState('')
    const [dateToCreateAppointment, setDateToCreateAppointment] = useState('')
    const [timeToCreateAppointment, setTimeToCreateAppointment] = useState('')
    const { token, user } = useAuthContext()

    const getBarbers = useCallback(async () => {
      if (!token || !user || !user.is_customer) return

      try {
        const res = await fetch(API.GET_BARBERS, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })

        if (!res.ok) throw new Error(`Error ${res.status}`)

        const data = await res.json()
        setBarbersData(data)
      } catch (error) {
        console.error('errorcitooooo', error.message);

      }
    }, [token, user])


    useEffect(() => {
      getBarbers()
    }, [getBarbers])


  return (
    <BarberContext.Provider value={{ barbersData, getBarbers, barberToCreateAppointment, setBarberToCreateAppointment, timeToCreateAppointment, setTimeToCreateAppointment, dateToCreateAppointment, setDateToCreateAppointment }} >
      { children }
    </BarberContext.Provider>
  )
}

export function useBarberContext () {
  return useContext(BarberContext)
}