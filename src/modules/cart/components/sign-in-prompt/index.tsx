import Link from "next/link"
import { Button } from "../../../common/components/button"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-start justify-between">
      <div>
        <h2 className="text-xl-semi">Masz konto?</h2>
        <p className="text-base-regular text-gray-700 mt-2">
          Zaloguj się aby automatycznie wprowadzić dane osobowe.
        </p>
      </div>
      <div>
        <Link href="/account/login">
          <Button variant="secondary">Zaloguj się</Button>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
