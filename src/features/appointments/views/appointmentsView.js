import Loader from "@/components/loader";
import AppointmentCard from "../components/appointmentCard";
import DeleteConfirmation from "../components/deleteConfirmation";
import Toast from "@/components/ui/toast";

export default function AppointmentsView({
  appointments,
  setAppointments,
  error,
  loading,
  appointmentToCancel,
  setAppointmentToCancel,
  message,
  setMessage
}) {

  return (
    <div className="w-full flex flex-col items-center py-10 px-4 sm:px-6 lg:px-10">

      {loading && <Loader />}

      {message &&
        <Toast
          type={`${!message.includes('Error')? 'success' : 'error'}`}
          message={message}
        />
      }

      {error && <Toast type="error" message={error} /> }

      {!loading && appointments.length > 0 && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              setAppointmentToCancel={setAppointmentToCancel}
            />
          ))}
        </div>
      )}

      {!loading && appointments.length === 0 && (
        <div className="text-neutral-400 text-sm mt-10">
          You don't have any appointment yet
        </div>
      )}

      {appointmentToCancel && (
        <DeleteConfirmation
          appointmentId={appointmentToCancel}
          setAppointmentToCancel={setAppointmentToCancel}
          setAppointments={setAppointments}
          setMessage={setMessage}
        />
      )}
    </div>
  )
}