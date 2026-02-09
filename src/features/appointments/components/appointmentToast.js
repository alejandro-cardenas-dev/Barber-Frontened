import { FaTimesCircle } from "react-icons/fa";

export default function AppointmentToast({ error }) {
  return (
    <div
      className="
        flex items-center gap-3
        fixed bottom-4 right-4 sm:bottom-6 sm:right-6
        max-w-[90%] sm:max-w-none
        px-4 sm:px-5 py-3
        rounded-2xl
        bg-gray-900 text-white
        border border-red-500
        shadow-[0_4px_15px_rgba(0,0,0,0.5)]
        font-semibold
        z-50 animate-fadeIn
      "
    >
      <span className="text-lg text-red-400">
        <FaTimesCircle />
      </span>
      <span className="text-sm sm:text-base">{error}</span>
    </div>
  )
}