import LoginTemplate from "@modules/account/templates/login-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Logowanie",
  description: "Zaloguj się do swojego konta Fishing Time.",
}

export default function Login() {
  return <LoginTemplate />
}
