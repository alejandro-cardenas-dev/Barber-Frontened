import { AppointmentsAdminProvider } from "@/features/admin/appointments/context/appointmentsAdminContext"
import AppointmentsAdminContainer from "@/features/admin/appointments/containers/appointmentsAdminContainer"

export default function AdminAppointmentsPage() {
  return (
    <AppointmentsAdminProvider>
      <AppointmentsAdminContainer />
    </AppointmentsAdminProvider>
  )
}