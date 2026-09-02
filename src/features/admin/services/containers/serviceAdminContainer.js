'use client'
import { useState } from "react"
import { useServicesAdmin } from "../context/servicesAdminContext"
import ServicesAdminView from "../views/servicesAdminView"
import ServiceFormModal from "../components/serviceFormModal"
import Loader from "@/shared/ui/loader"

export default function ServicesAdminContainer() {
  const { services, loading, error, handleCreate, handleUpdate, handleDelete } = useServicesAdmin()

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  // Open modal for new service
  const handleNew = () => {
    setSelectedService(null)
    setModalOpen(true)
  }

  // Open modal for editing
  const handleEdit = (service) => {
    setSelectedService(service)
    setModalOpen(true)
  }

  // Open confirm delete prompt
  const handleDeleteClick = (service) => {
    setConfirmDelete(service)
  }

  // Submit create or update
  const handleSubmit = async (data) => {
    if (selectedService) {
      await handleUpdate(selectedService.id, data)
    } else {
      await handleCreate(data)
    }
  }

  // Confirm deactivation
  const handleConfirmDelete = async () => {
    if (!confirmDelete) return
    await handleDelete(confirmDelete.id)
    setConfirmDelete(null)
  }

  if (loading) return <Loader />
  if (error) return <div className="text-red-400 p-6">{error}</div>

  return (
    <>
      <ServicesAdminView
        services={services}
        onNew={handleNew}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ServiceFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedService}
      />

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-700 rounded-3xl p-8 w-full max-w-sm shadow-2xl">
            <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
              Deactivate Service
            </h2>
            <p className="text-neutral-400 text-sm mb-6">
              <span className="text-white font-semibold">{confirmDelete.name}</span> will be hidden
              from customers. You can reactivate it later by editing it.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 border border-neutral-700 text-neutral-400 py-3 rounded-full font-semibold text-sm uppercase tracking-widest hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-600 text-white py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-red-500 transition-colors"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}