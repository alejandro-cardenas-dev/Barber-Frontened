import { ServicesAdminProvider } from "@/features/admin/services/context/servicesAdminContext"
import ServicesAdminContainer from "@/features/admin/services/containers/serviceAdminContainer"

export default function AdminServicesPage() {
  return (
    <ServicesAdminProvider>
      <ServicesAdminContainer />
    </ServicesAdminProvider>
  )
}