import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Toast({ message, type = "success" }) {
  const isSuccess = type === "success"

  return (
    <div
      className={`
        flex items-center gap-3
        fixed bottom-4 right-4 sm:bottom-6 sm:right-6
        max-w-[90%] sm:max-w-sm
        px-5 py-3
        rounded-2xl
        bg-black text-white
        border
        ${isSuccess ? "border-white/20" : "border-red-500/70"}
        shadow-[0_10px_25px_rgba(0,0,0,0.6)]
        backdrop-blur-md
        font-medium
        z-50 animate-fadeIn
      `}
    >
      <span
        className={`
          text-lg
          ${isSuccess ? "text-white" : "text-red-400"}
        `}
      >
        {isSuccess ? <FaCheckCircle /> : <FaTimesCircle />}
      </span>

      <span className="text-sm sm:text-base tracking-wide">
        {message}
      </span>
    </div>
  )
}