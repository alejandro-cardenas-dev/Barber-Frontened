import { PiScissorsFill } from "react-icons/pi";

export default function CreateServiceSection({
    servicesData,
    serviceModal,
    setServiceModal,
    serviceToCreateAppointment,
    setServiceToCreateAppointment
  }) {

  return (
    <section className="bg-neutral-900/50 rounded-2xl shadow-sm border border-neutral-700 p-6 transition-all hover:shadow-md">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setServiceModal(!serviceModal)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><PiScissorsFill /></div>
          <h3 className="text-lg font-semibold">Choose Service</h3>
        </div>
        <span className="text-indigo-600 font-medium">{serviceModal ? 'Close' : 'Change'}</span>
      </div>

      {serviceModal && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 animate-in fade-in slide-in-from-top-2">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className={`
                p-4 border-2 rounded-xl
                transition-colors cursor-pointer group
                hover:bg-neutral-950 hover:border-indigo-500
                ${
                  serviceToCreateAppointment.id === service.id
                    ? 'border-indigo-500 text-indigo-500'
                    : 'border-neutral-700'
                }
              `}
              onClick={() => setServiceToCreateAppointment(service)}
            >
              <p className="font-medium group-hover:text-indigo-700">
                {service.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}