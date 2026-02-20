'use client'

import { useAuth } from "../context/authContext";
import LogoutView from "../views/logoutView";

export default function LogoutContainer() {
  const { logout } = useAuth()

  return <LogoutView handleSubmit={logout} />
}