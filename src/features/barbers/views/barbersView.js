import BarberCard from "../components/barberCard";

export default function BarbersView({ barbers }) {
  return (
    <section className="w-full px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {barbers.map((barber) => (
          <BarberCard key={barber.id} barber={barber} />
        ))}
      </div>
    </section>
  )
}