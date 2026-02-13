import Image from "next/image";
import { FaUser } from "react-icons/fa";

export default function CreateBarberSection({
  barbersData,
  barberModal,
  setBarberModal,
  setBarberToCreateAppointment,
  barberToCreateAppointment
}) {
  return (
    <section className="bg-neutral-900/50 rounded-2xl shadow-sm border border-neutral-700 p-6 transition-all hover:shadow-md">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setBarberModal(!barberModal)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><FaUser /></div>
          <h3 className="text-lg font-semibold ">Select Professional</h3>
        </div>
        <span className="text-emerald-600 font-medium">{barberModal ? 'Close' : 'Change'}</span>
      </div>

      {barberModal && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 animate-in fade-in">
          {barbersData.map((barber) => (
            <div

              key={barber.id}
              onClick={() => setBarberToCreateAppointment(barber)}
              className={`
                  flex flex-col items-center p-4 rounded-2xl
                  border-2 hover:border-emerald-500
                  hover:bg-neutral-950 transition-all cursor-pointer
                  ${barberToCreateAppointment.id == barber.id
                    ? 'border-emerald-500'
                    : 'border-transparent'
                  }
                `}
            >
              <Image
                src="/barber3.png"
                alt={barber.user.first_name}
                width={80}
                height={80}
                className="rounded-full object-cover mb-3 ring-2 ring-gray-200"
              />
              <span className="font-medium">{barber.user.first_name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}