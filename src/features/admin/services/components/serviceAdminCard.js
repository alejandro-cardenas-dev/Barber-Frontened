'use client'

export default function ServiceAdminCard({ service, onEdit, onDelete }) {
  return (
    <div
      className={`
        flex flex-col justify-between
        bg-neutral-900/50 border rounded-3xl p-6
        transition-all duration-300
        ${service.is_active
          ? 'border-neutral-800 hover:border-neutral-600'
          : 'border-neutral-800/50 opacity-50'
        }
      `}
    >

      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white tracking-tight uppercase">
              {service.name}
            </h3>
            {!service.is_active && (
              <span className="text-xs bg-neutral-800 text-neutral-500 px-2 py-0.5 rounded-full font-medium">
                Inactive
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2">
            {service.description}
          </p>
        </div>
        <span className="text-2xl font-light text-white shrink-0">
          {service.formatted_price ?? `$${service.price}`}
        </span>
      </div>

      <div className="text-xs text-neutral-600 mb-5">
        ID #{service.id} · Created {new Date(service.created_at).toLocaleDateString()}
      </div>

      <div className="flex gap-2 pt-4 border-t border-neutral-800">
        <button
          onClick={() => onEdit(service)}
          className="flex-1 border border-neutral-700 text-neutral-300 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:border-neutral-500 hover:text-white transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(service)}
          disabled={!service.is_active}
          className="flex-1 border border-red-900/50 text-red-500 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:border-red-700 hover:text-red-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {service.is_active ? 'Deactivate' : 'Inactive'}
        </button>
      </div>
    </div>
  )
}