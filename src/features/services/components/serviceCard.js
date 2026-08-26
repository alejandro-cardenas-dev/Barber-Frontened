import Image from "next/image"
import Link from "next/link"

export default function ServiceCard({ service, onBook }) {
  return (
    <div
      className="
        group flex flex-col justify-between
        bg-neutral-950 border border-neutral-800/50
        p-5 sm:p-7 rounded-4xl transition-all duration-500
        hover:border-neutral-600 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]
      "
    >
      <div className="flex flex-col gap-6">
        <div className="flex gap-5">
          <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-2xl border border-neutral-800/50">
            <Image
              src="/haircut.png"
              alt={service.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center min-w-0">
            <span className="text-[12px] uppercase tracking-[0.3em] text-neutral-500 font-bold mb-1">
              Service
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase leading-none truncate">
              {service.name}
            </h3>
            <p className="text-sm sm:text-shadow-lg text-neutral-500 mt-2 font-light leading-relaxed line-clamp-2 italic">
              "{service.description}"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-neutral-900"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-800"></div>
          <div className="h-px flex-1 bg-neutral-900"></div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="flex flex-col">
          <span className="text-2xl font-black text-white tracking-tighter">
            ${service.price}
          </span>
        </div>

        <Link
          href="/book"
          onClick={() => onBook(service)}
          className="
            relative overflow-hidden
            bg-white text-black px-8 py-3 rounded-xl
            font-black text-[10px] uppercase tracking-[0.2em]
            hover:bg-neutral-200 transition-all duration-300
            active:scale-95 shadow-lg shadow-white/5
          "
        >
          Book Now
        </Link>
      </div>
    </div>
  )
}