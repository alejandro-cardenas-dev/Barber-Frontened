import AppointmentCard from "../components/appointmentCard";
import DeleteConfirmation from "../components/deleteConfirmation";
import Loader from "@/shared/ui/loader";
import Toast from "@/shared/ui/toast";


export default function AppointmentsView({
  appointments,
  setAppointments,
  error,
  loading,
  appointmentToCancel,
  setAppointmentToCancel,
  message,
  setMessage,
  isBarber,
}) {

  return (
    <div className="w-full flex flex-col items-center py-20 px-6 sm:px-6 lg:px-10">

      {loading && <Loader />}

      {message &&
        <Toast
          type={!message.includes('successfully') ? 'error' : 'success'}
          message={message}
        />
      }

      {error && <Toast type="error" message={error} /> }


      {!loading && appointments.length > 0 && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              setAppointmentToCancel={setAppointmentToCancel}
              isBarber={isBarber}
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