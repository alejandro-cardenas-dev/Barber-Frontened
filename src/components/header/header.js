import Link from "next/link";

export default function Header () {
  return (
    <header className="flex justify-between p-3" >
      <Link href='/' >
        <span>Alejo's Barber</span>
      </Link>
      <Link href='/create-appointment/'>CREATE appointment</Link>
      <Link href='/appointments/'>GET appointmens</Link>
    </header>
  )
}