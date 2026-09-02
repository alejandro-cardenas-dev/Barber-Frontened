import BarberAdminCard from "../components/barberAdminCard"

export default function BarbersAdminView({ barbers, onNew, onEdit, onDelete }) {
  const active = barbers.filter(b => b.is_active)
  const inactive = barbers.filter(b => !b.is_active)

  return (
    <div className="p-6 max-w-7xl mx-auto">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight uppercase">Barbers</h1>
          <p className="text-neutral-500 text-sm mt-1">
            {active.length} active · {inactive.length} inactive
          </p>
        </div>
        <button
          onClick={onNew}
          className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-neutral-200 transition-colors"
        >
          + New Barber
        </button>
      </div>

      {active.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">
            Active
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {active?.map(barber => (
              <BarberAdminCard
                key={barber.id}
                barber={barber}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </section>
      )}

      {inactive.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">
            Inactive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {inactive.map(barber => (
              <BarberAdminCard
                key={barber.id}
                barber={barber}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </section>
      )}

      {barbers.length === 0 && (
        <div className="text-center text-neutral-600 py-20">
          No barbers yet. Create your first one.
        </div>
      )}
    </div>
  )
}