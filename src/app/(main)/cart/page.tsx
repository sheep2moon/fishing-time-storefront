import CartTemplate from "@modules/cart/templates"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Koszyk",
  description: "Zobacz swój koszyk",
}

export default function Cart() {
  return <CartTemplate />
}
