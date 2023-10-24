import { Metadata } from "next"
import StoreTemplate from "../../../modules/store"

export const metadata: Metadata = {
  title: "Sklep | Fishing Time",
  description: "Przeglądaj wszystkie produkty.",
}

export default function StorePage() {
  return <StoreTemplate />
}
