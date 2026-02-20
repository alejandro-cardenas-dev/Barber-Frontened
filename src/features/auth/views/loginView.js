import Link from "next/link";
import TextInput from "../components/textInput";

export default function LoginView({
  form,
  loading,
  message,
  onChange,
  onSubmit,
}) {

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-neutral-900/90">
      <div
        className="
          flex flex-col w-80 bg-neutral-900/95 border border-neutral-800/50
          rounded-3xl p-8 gap-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          backdrop-blur-xl transition-all duration-300
          hover:shadow-[0_15px_50px_rgba(0,0,0,0.45)]
        " >

        <h2 className="text-3xl font-extrabold text-white text-center mb-2">
          LOGIN
        </h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-5">

          {message && (
            <p className={`text-sm text-center ${
              message.includes('successful') ? 'text-green-700' : 'text-red-600'
            }`}>
              {message}
            </p>
          )}

          <TextInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
          />

          <button
            type="submit"
            className="
              flex justify-center items-center w-full py-2 rounded-2xl
              bg-white text-black font-semibold cursor-pointer
              hover:bg-neutral-300
            "
          >

            LOGIN
            {loading &&
              <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
            }
          </button>
        </form>

        <Link
          href="/create-account/"
          className="text-sm text-neutral-400 mt-2 text-center hover:text-white transition-colors duration-200"
        >
          Create account
        </Link>
      </div>
    </section>
  )
}