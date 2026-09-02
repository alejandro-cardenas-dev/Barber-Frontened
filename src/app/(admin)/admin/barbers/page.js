import { BarbersAdminProvider } from "@/features/admin/barbers/context/barbersAdminContext"
import BarbersAdminContainer from "@/features/admin/barbers/containers/barbersAdminContainer"

export default function AdminBarbersPage() {
  return (
    <BarbersAdminProvider>
      <BarbersAdminContainer />
    </BarbersAdminProvider>
  )
}