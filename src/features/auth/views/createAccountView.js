import Toast from "@/shared/ui/toast";
import StringInput from "../components/textInput";
import RadioInput from "../components/radioInput";

export default function CreateAccountView({
  form,
  message,
  loading,
  handleChange,
  handleSubmit
}) {

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-neutral-900/90 p-6">
      <h2 className="text-3xl font-extrabold text-white text-center mb-2">CREATE ACCOUNT</h2>

      {message && (
        <Toast type="error" message={message} />
      )}

      <form
        onSubmit={handleSubmit}
        className="
          flex flex-col w-80 bg-neutral-900/95 border border-neutral-800/50
          rounded-3xl p-8 gap-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          backdrop-blur-xl transition-all duration-300
          hover:shadow-[0_15px_50px_rgba(0,0,0,0.45)]
        "
      >

        <StringInput
          label="First name"
          name="first_name"
          type="text"
          value={form.first_name}
          onChange={handleChange}
        />

        <StringInput
          label="Last name"
          name="last_name"
          type="text"
          value={form.last_name}
          onChange={handleChange}
        />

        <StringInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <StringInput
          label="Phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
        />

        <StringInput
          label="Password"
          name="password"
          type="text"
          value={form.password}
          onChange={handleChange}
        />

        <StringInput
          label="Confirm password"
          name="password2"
          type="text"
          value={form.password2}
          onChange={handleChange}
        />


        <div className="flex items-center justify-center gap-x-3" >
          <RadioInput
            label="Barber"
            name="role"
            value='barber'
            onChange={handleChange}
          />

          <RadioInput
            label="Customer"
            name="role"
            value='customer'
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="
            flex justify-center items-center w-full py-2 rounded-2xl
            bg-white text-black font-semibold cursor-pointer
            hover:bg-neutral-300
            "
        >
          SIGN UP
          {loading &&
            <div className="h-4 w-4 ml-2 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
          }
        </button>

      </form>
    </section>
  )
}