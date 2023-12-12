import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Spinner from "@modules/common/icons/spinner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { Input } from "../../../common/components/input"
import { Button } from "../../../common/components/button"

interface RegisterCredentials extends FieldValues {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

const Register = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (e: Error) => {
    setAuthError("An error occured. Please try again.")
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    await medusaClient.customers
      .create(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm flex flex-col items-center mt-4">
      {isSubmitting && (
        <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <Spinner size={24} />
        </div>
      )}
      <h1 className="text-large-semi uppercase mb-6">Załóż konto klienta</h1>
      <p className="text-center text-base-regular text-gray-700 mb-4">
        Zapisuj adresy, śledź swoje zamówienia oraz wiele więcej.
      </p>
      <form className="w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="first-name">Imię</label>
          <Input
            id="first-name"
            {...register("first_name", { required: "First name is required" })}
            autoComplete="given-name"
          />
          <label htmlFor="last-name">Nazwisko</label>
          <Input
            id="last-name"
            {...register("last_name", { required: "Last name is required" })}
            autoComplete="family-name"
          />
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
          />
          <label htmlFor="phone-number">Number telefonu</label>
          <Input id="phone-number" {...register("phone")} autoComplete="tel" />
          <label htmlFor="password">Hasło</label>
          <Input
            id="password"
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            autoComplete="new-password"
          />
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              These credentials do not match our records
            </span>
          </div>
        )}
        <span className="text-center text-gray-700 text-small-regular mt-6">
          Zakładając konto akceptujesz{" "}
          <Link href="/content/privacy-policy" className="underline">
            Politykę prywatności
          </Link>{" "}
          oraz{" "}
          <Link href="/content/terms-of-use" className="underline">
            Warunki użytkowania
          </Link>
          .
        </span>
        <Button className="mt-6">Załóż konto</Button>
      </form>
      <span className="text-center text-gray-700 text-sm mt-6">
        Masz już konto?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Zaloguj się
        </button>
        .
      </span>
    </div>
  )
}

export default Register
