import Loader from "@/components/loader";
import AppointmentToast from "../components/appointmentToast";
import AppointmentCard from "../components/appointmentCard";

export default function AppointmentsView({
  appointments,
  error,
  loading,
}) {

  return (
        <div className="w-full flex flex-col items-center py-10 px-4 sm:px-6 lg:px-10">

          {loading && <Loader />}

          {error && <AppointmentToast error={error} />}

          {!loading && appointments.length > 0 && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
              {appointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          )}

          {!loading && appointments.length === 0 && (
            <div className="text-neutral-400 text-sm mt-10">
              You don't have any appointment yet
            </div>
          )}

          {/* {appointmentToCancel && (
            <DeleteConfirmation
              appointmentId={appointmentToCancel}
              setAppointmentToCancel={setAppointmentToCancel}
              setAppointments={setAppointments}
              setMessage={setMessage}
            />
          )} */}
        </div>
  )
}