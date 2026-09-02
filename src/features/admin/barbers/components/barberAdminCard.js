'use client'
import Link from "next/link"

export default function BarberAdminCard({ barber, onEdit, onDelete }) {
  const { user } = barber

  return (
    <div
      className={`
        flex flex-col justify-between
        bg-neutral-900/50 border rounded-3xl p-6
        transition-all duration-300
        ${barber.is_active
          ? 'border-neutral-800 hover:border-neutral-600'
          : 'border-neutral-800/50 opacity-50'
        }
      `}
    >

      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white tracking-tight uppercase">
              {user?.first_name} {user?.last_name}
            </h3>
            {!barber.is_active && (
              <span className="text-xs bg-neutral-800 text-neutral-500 px-2 py-0.5 rounded-full font-medium">
                Inactive
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-400">{user?.email}</p>
          <p className="text-sm text-neutral-500">{user?.phone}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-5 p-4 bg-neutral-800/50 rounded-2xl">
        <div>
          <p className="text-xs text-neutral-500 uppercase tracking-widest mb-0.5">Work</p>
          <p className="text-sm text-white font-medium">
            {barber.work_start_time} — {barber.work_end_time}
          </p>
        </div>
        <div>
          <p className="text-xs text-neutral-500 uppercase tracking-widest mb-0.5">Lunch</p>
          <p className="text-sm text-white font-medium">
            {barber.lunch_start_time} — {barber.lunch_end_time}
          </p>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-neutral-800">
        {/* FUTURE IMPLEMENTATION BARBER DETAIL
        <Link
          href={`/admin/barbers/${barber.id}`}
          className="flex-1 text-center border border-neutral-700 text-neutral-300 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:border-neutral-500 hover:text-white transition-colors"
        >
          Detail
        </Link> */}
        <button
          onClick={() => onEdit(barber)}
          className="flex-1 border border-neutral-700 text-neutral-300 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:border-neutral-500 hover:text-white transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(barber)}
          disabled={!barber.is_active}
          className="flex-1 border border-red-900/50 text-red-500 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:border-red-700 hover:text-red-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {barber.is_active ? 'Deactivate' : 'Inactive'}
        </button>
      </div>
    </div>
  )
}