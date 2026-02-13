export default function CreateConfirmation({
  onConfirm,
  setShowConfirmation,
  barber_first_name,
  barber_last_name,
  service,
  date,
  time,
  loading,
}) {
  return (
    <div className="
    fixed inset-0 z-100
    flex justify-center items-center
    backdrop-blur-sm bg-black/40
    animate-fadeIn
    ">
      <div className="
        w-[90%] max-w-md p-6
        bg-neutral-900 border border-neutral-700
        rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.3)]
        text-white
        animate-scaleIn
      ">
        <h2 className="text-xl font-semibold mb-4">
          Confirm your appointment
        </h2>

        <div className="
          bg-neutral-800/60 border border-neutral-700
          rounded-2xl p-4 mb-6 backdrop-blur-sm
          shadow-[0_6px_20px_rgba(0,0,0,0.25)]
        ">
          <h3 className="text-lg font-semibold mb-3">
            Appointment Details
          </h3>

          <div className="flex flex-col gap-2 text-sm text-neutral-300">

            <div className="flex justify-between">
              <span>Barber:</span>
              <span className="font-medium text-white">
                {barber_first_name} {barber_last_name}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Service:</span>
              <span className="font-medium text-white">
                {service}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-medium text-white">
                {date}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Time:</span>
              <span className="font-medium text-white">
                {time}
              </span>
            </div>

          </div>
        </div>

        <p className="mb-6 text-neutral-300">
          Your appointment is almost ready. Please confirm to continue.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowConfirmation(false)}
            className="
              px-4 py-2 rounded-xl
              bg-neutral-700 hover:bg-neutral-600
              transition-all cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4 py-2 rounded-xl font-semibold
              bg-white text-black cursor-pointer
              shadow-[0_4px_12px_rgba(0,0,0,0.25)]
              hover:shadow-[0_6px_18px_rgba(0,0,0,0.35)]
              transition-all flex items-center
            "
          >
            Confirm
            {loading && (
              <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}