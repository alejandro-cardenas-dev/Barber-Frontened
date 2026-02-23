'use client'

import { useBarber } from "@/features/barbers/context/barberContext"
import { useCreateAppointmentContext } from "@/context/createAppointmentContext"
import { useServiceContext } from "@/context/servicesContext"
import CreateServiceSection from "../components/createServiceSection"
import CreateBarberSection from "../components/createBarberSection"
import CreateDateSection from "../components/createDateSection"
import CreateConfirmation from "../components/createConfirmation"
import Toast from "@/shared/ui/toast"

export default function CreateAppointmentView({
  serviceModal,
  setServiceModal,
  barberModal,
  setBarberModal,
  dateModal,
  setDateModal,
  message,
  showConfirmation,
  setShowConfirmation,
  onConfirm,
  loading,
}) {

  const { servicesData } = useServiceContext()
  const { barbersData } = useBarber()

  const {
    setBarberToCreateAppointment,
    barberToCreateAppointment,
    serviceToCreateAppointment,
    setServiceToCreateAppointment,
    dateToCreateAppointment,
    timeToCreateAppointment
  } = useCreateAppointmentContext()
  console.log(serviceToCreateAppointment);

  return (
     <div className="max-w-2xl mx-auto p-6 min-h-screen">

      {message && (
        <Toast type={`${message.includes('successfully') ? 'success' : 'error' }`} message={message} />
      )}

      <header className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold">Book Appointment</h2>
        <p className="mt-2">Configure your session in three easy steps.</p>
      </header>

      <div className="space-y-6">
        <CreateServiceSection
          servicesData={servicesData}
          serviceModal={serviceModal}
          setServiceModal={setServiceModal}
          serviceToCreateAppointment={serviceToCreateAppointment}
          setServiceToCreateAppointment={setServiceToCreateAppointment}
        />

        <CreateBarberSection
          barbersData={barbersData}
          barberModal={barberModal}
          setBarberModal={setBarberModal}
          setBarberToCreateAppointment={setBarberToCreateAppointment}
          barberToCreateAppointment={barberToCreateAppointment}
        />

        <CreateDateSection
          dateModal={dateModal}
          setDateModal={setDateModal}
          timeToCreateAppointment={timeToCreateAppointment}
        />
      </div>

      <button
        onClick={() => setShowConfirmation(true)}
        disabled={!timeToCreateAppointment}
        className="w-full mt-8 bg-white text-black py-4 rounded-2xl font-bold text-lg hover:bg-neutral-600 transition-colors shadow-lg cursor-pointer">
        Confirm Appointment
      </button>

      {
        showConfirmation && (
          <CreateConfirmation
            onConfirm={onConfirm}
            setShowConfirmation={setShowConfirmation}
            barber_first_name={barberToCreateAppointment.user.first_name}
            barber_last_name={barberToCreateAppointment.user.last_name}
            service={serviceToCreateAppointment.name}
            date={dateToCreateAppointment}
            time={timeToCreateAppointment}
            loading={loading}
          />
        )
      }
    </div>
  )
}