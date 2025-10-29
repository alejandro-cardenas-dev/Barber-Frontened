import CreateAccount from "@/components/auth/createAccount";
import Login from "@/components/auth/login";
import Barbers from "@/components/barbers/barbers";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Barbers />
    </div>
  );
}
