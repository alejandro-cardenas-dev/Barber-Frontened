'use client'

import { useCreateAccount } from "../hooks/useCreateAccount";
import CreateAccountView from "../views/createAccountView";

export default function CreateAccountContainer() {
  const hook = useCreateAccount()

  return <CreateAccountView {...hook} />
}