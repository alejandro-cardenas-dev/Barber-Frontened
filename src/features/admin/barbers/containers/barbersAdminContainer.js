'use client'
import { useState } from "react"
import { useBarbersAdmin } from "../context/barbersAdminContext"
import BarbersAdminView from "../views/barbersAdminView"
import BarberFormModal from "../components/barberFormModal"
import Loader from "@/shared/ui/loader"

export default function BarbersAdminContainer() {
  const { barbers, loading, error, handleCreate, handleUpdate, handleDelete } = useBarbersAdmin()

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedBarber, setSelectedBarber] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const handleNew = () => {
    setSelectedBarber(null)
    setModalOpen(true)
  }

  const handleEdit = (barber) => {
    setSelectedBarber(barber)
    setModalOpen(true)
  }

  const handleDeleteClick = (barber) => {
    setConfirmDelete(barber)
  }

  const handleSubmit = async (data) => {
    if (selectedBarber) {
      await handleUpdate(selectedBarber.id, data)
    } else {
      await handleCreate(data)
    }
  }

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return
    await handleDelete(confirmDelete.id)
    setConfirmDelete(null)
  }

  if (loading) return <Loader />
  if (error) return <div className="text-red-400 p-6">{error}</div>

  return (
    <>
      <BarbersAdminView
        barbers={barbers}
        onNew={handleNew}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <BarberFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedBarber}
      />

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-700 rounded-3xl p-8 w-full max-w-sm shadow-2xl">
            <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
              Deactivate Barber
            </h2>
            <p className="text-neutral-400 text-sm mb-6">
              <span className="text-white font-semibold">
                {confirmDelete.user?.first_name} {confirmDelete.user?.last_name}
              </span> will no longer be bookable. You can reactivate them later by editing.
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