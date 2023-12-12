import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Spinner from "@modules/common/icons/spinner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { Input } from "../../../common/components/input"
import { Button } from "../../../common/components/button"

interface SignInCredentials extends FieldValues {
  email: string
  password: string
}

const Login = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (_e: Error) => {
    setAuthError("Invalid email or password")
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    await medusaClient.auth
      .authenticate(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      {isSubmitting && (
        <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <Spinner size={24} />
        </div>
      )}
      <h1 className="text-lg font-bold uppercase mb-6">Witamy ponownie</h1>
      <p className="text-center text-base-regular text-gray-700 mb-8">
        Zaloguj się na swoje konto.
      </p>
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
          />
          <label htmlFor="password">Hasło</label>
          <Input
            id="password"
            {...register("password", { required: "Password is required" })}
            type="password"
            autoComplete="current-password"
          />
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              These credentials do not match our records
            </span>
          </div>
        )}
        <Button className="mt-6 w-full" variant="secondary">
          Dalej
        </Button>
      </form>
      <span className="text-center text-gray-700 text-sm mt-6">
        Nie masz konta?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          Przejdź do rejestracji
        </button>
        .
      </span>
    </div>
  )
}

export default Login
