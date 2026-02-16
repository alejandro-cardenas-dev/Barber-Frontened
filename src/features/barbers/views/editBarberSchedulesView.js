import Image from "next/image"

import Toast from "@/components/ui/toast"
import TimeInput from "../components/forms/timeInput";

export default function EditBarberSchedulesView({
  form,
  message,
  handleChange,
  reset,
  submit,
  user,
}) {

  if (!form) return null;

  const date = new Date(user.last_update);
  const formatDate = new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)

  return (
    <div className="flex flex-col items-center py-10 gap-8">

      {message &&
        <Toast
          type={`${!message.includes('error', 'fields')? 'success' : 'error'}`}
          message={message}
        />
      }


      <div className="flex flex-col items-center gap-2">
        <Image
          src="/barber3.png"
          alt="Barber photo"
          width={100}
          height={100}
          className="rounded-full shadow-lg shadow-black/30"
        />
        <h2 className="text-2xl font-extrabold text-white">
          Edit Your Work Schedule
        </h2>
        <span className="text-sm text-neutral-400">
          Last update: {formatDate}
        </span>
      </div>

      <form
        className="flex flex-col gap-6 w-80 bg-neutral-900/95 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        onSubmit={submit}
      >
        <TimeInput
          label="Work Start"
          value={form.workStart}
          onChange={handleChange("workStart")}
        />

        <TimeInput
          label="Work End"
          value={form.workEnd}
          onChange={handleChange("workEnd")}
        />

        <TimeInput
          label="Lunch Start"
          value={form.lunchStart}
          onChange={handleChange("lunchStart")}
        />

        <TimeInput
          label="Lunch End"
          value={form.lunchEnd}
          onChange={handleChange("lunchEnd")}
        />

        <div className="flex justify-between mt-4 gap-2">
          <button
            type="button"
            onClick={reset}
            className="flex-1 py-2 rounded-2xl bg-neutral-700 text-white font-semibold hover:bg-neutral-800 transition"
          >
            Reset
          </button>

          <button
            type="submit"
            className="flex-1 py-2 rounded-2xl bg-white text-black font-semibold hover:bg-neutral-300 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}