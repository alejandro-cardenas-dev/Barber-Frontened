import { LuCircleCheck } from "react-icons/lu"
import { useRouter } from "next/navigation"

export default function AppointmentSuccessOverlay() {
  const router = useRouter()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="bg-black rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-4 max-w-sm w-full text-center animate-fade-in border border-neutral-700">

        <div className="text-6xl text-green-500">
          <LuCircleCheck />
        </div>

        <h2 className="text-2xl font-bold">
          Appointment Confirmed!
        </h2>

        <p className="text-neutral-400">
          See you at ALEJO'S BARBER 🎉
        </p>

        <button
          onClick={() => router.replace('/services')}
          className="mt-4 w-full bg-neutral-800 text-white font-semibold py-3 rounded-xl hover:bg-neutral-700 transition cursor-pointer"
        >
          Back
        </button>

      </div>
    </div>
  )
}