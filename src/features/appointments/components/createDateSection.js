import BarberScheduleContainer from "@/features/schedules/containers/barberScheduleContainer";
import { FaCalendarAlt } from "react-icons/fa";

export default function CreateDateSection({
  dateModal,
  setDateModal
}) {
  return (
    <section className="bg-neutral-900/50 rounded-2xl shadow-sm border border-neutral-700 p-6 transition-all hover:shadow-md">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setDateModal(!dateModal)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><FaCalendarAlt /></div>
          <h3 className="text-lg font-semibold ">Pick Date & Time</h3>
        </div>
        <span className="text-amber-600 font-medium">{dateModal ? 'Close' : 'Change'}</span>
      </div>

      {dateModal && (
        <div className="flex justify-center mt-4 p-2 rounded-xl">
          <BarberScheduleContainer />
        </div>
      )}
    </section>
  )
}