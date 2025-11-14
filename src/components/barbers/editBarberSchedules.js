'use client'

import API from "@/API/api"
import { useAuthContext } from "@/context/authContext"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function EditBarberSchedules () {
  const { token, user } = useAuthContext()
  const [workStart, setWorkStart] = useState(user.work_start_time)
  const [workEnd, setWorkEnd] = useState(user.work_end_time)
  const [lunchStart, setLunchStart] = useState(user.lunch_start_time)
  const [lunchEnd, setLunchEnd] = useState(user.lunch_end_time)

  console.log('barber from edit:', user);

  const edit_schedules = async (e) => {
    e.preventDefault()

    console.log('llllllllllllll');

    if (workStart == user.work_start_time && workEnd == user.work_end_time && lunchStart == user.lunch_start_time && lunchEnd == user.lunch_end_time ) {
      console.log('you did not change any fields');

      return
    }

    const formData = new FormData()
    if (workStart) formData.append('work_start_time', workStart)
    if (workEnd) formData.append('work_end_time', workEnd)
    if (lunchStart) formData.append('lunch_start_time', lunchStart)
    if (lunchEnd) formData.append('lunch_end_time', lunchEnd)


    const res = await fetch(API.EDIT_BARBER_SCHEDULE, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    })

    if (res.ok) {
      const data = await res.json()
      console.log('changes success', data );
    } else {
      console.log('[error');

    }

  }


  return (
    <div className="flex flex-col items-center py-10 gap-8">
      <div className="flex flex-col items-center gap-2">
        <Image
          src="/barber3.png"
          alt="Barber photo"
          width={100}
          height={100}
          className="rounded-full shadow-lg shadow-black/30"
        />
        <h2 className="text-2xl font-extrabold text-white">Edit Your Work Schedule</h2>
        <span className="text-sm text-neutral-400">Last update: 12 Nov 2025 (feature)</span>
      </div>

      <form
        className="flex flex-col gap-6 w-80 bg-neutral-900/95 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        onSubmit={edit_schedules}
      >
        <div className="flex flex-col gap-3">
          <label className="text-neutral-200 font-semibold">Work Start</label>
          <input
            type="time"
            value={workStart}
            onChange={(e) => setWorkStart(e.target.value)}
            required
            className="px-4 py-2 rounded-2xl border border-neutral-700/50 bg-neutral-800/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
          />

          <label className="text-neutral-200 font-semibold">Work End</label>
          <input
            type="time"
            value={workEnd}
            onChange={(e) => setWorkEnd(e.target.value)}
            required
            className="px-4 py-2 rounded-2xl border border-neutral-700/50 bg-neutral-800/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-neutral-200 font-semibold">Lunch Start</label>
          <input
            type="time"
            value={lunchStart}
            onChange={(e) => setLunchStart(e.target.value)}
            required
            className="px-4 py-2 rounded-2xl border border-neutral-700/50 bg-neutral-800/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
          />

          <label className="text-neutral-200 font-semibold">Lunch End</label>
          <input
            type="time"
            value={lunchEnd}
            onChange={(e) => setLunchEnd(e.target.value)}
            required
            className="px-4 py-2 rounded-2xl border border-neutral-700/50 bg-neutral-800/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
          />
        </div>

        <div className="flex justify-between mt-4 gap-2">
          <button
            type="button"
            onClick={() => {
              setWorkStart('09:00');
              setWorkEnd('18:00');
              setLunchStart('13:00');
              setLunchEnd('14:00');
            }}
            className="flex-1 py-2 rounded-2xl bg-neutral-700 text-white font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.25)] hover:bg-neutral-800 transition-all duration-200"
          >
            Reset
          </button>

          <button
            type="submit"
            className="flex-1 py-2 rounded-2xl bg-white text-black font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.25)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.35)] transition-all duration-200"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}