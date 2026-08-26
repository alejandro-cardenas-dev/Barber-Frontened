import ServiceCard from "../components/serviceCard"

export default function ServicesView({ services, onBook }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-20">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} onBook={onBook} />
      ))}
    </section>
  )
}