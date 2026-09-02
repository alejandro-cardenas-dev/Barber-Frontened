import { AdminHeader } from "./_components/adminHeader"

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  )
}