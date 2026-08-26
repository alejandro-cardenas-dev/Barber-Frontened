import Image from "next/image"
import { FaPhone } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"

export default function BarberCard({ barber }) {
  return (
    <div className="
      flex flex-col md:flex-row items-stretch
      bg-neutral-950 border border-neutral-800/60
      rounded-4xl overflow-hidden transition-all duration-500 group
      hover:border-neutral-600 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]
    ">
      <div className="relative w-full md:w-60 h-[300px] md:h-auto overflow-hidden">
        <Image
          src="/barber3.png"
          alt={`${barber.user.first_name} photo`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-60" />
      </div>

      <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-px bg-neutral-700"></span>
            <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold">
              Master Barber
            </p>
          </div>

          <h2 className="text-4xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-6">
            {barber.user.first_name}
            <br />
            <span className="text-neutral-700">{barber.user.last_name}</span>
          </h2>

          <div className="space-y-3">
            <div className="flex items-center gap-4 group/item">
              <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800 group-hover/item:border-neutral-500 transition-colors">
                <FaPhone className="text-neutral-500 text-xs group-hover/item:text-white" />
              </div>
              <span className="text-sm font-light text-neutral-400 tracking-wide">{barber.user.phone}</span>
            </div>

            <div className="flex items-center gap-4 group/item">
              <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800 group-hover/item:border-neutral-500 transition-colors">
                <MdEmail className="text-neutral-500 text-xs group-hover/item:text-white" />
              </div>
              <span className="text-sm font-light text-neutral-400 tracking-wide truncate">{barber.user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}