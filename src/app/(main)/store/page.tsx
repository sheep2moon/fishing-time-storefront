import { Metadata } from "next"
import StoreTemplate from "../../../modules/store"

export const metadata: Metadata = {
  title: "Sklep | Fishing Time",
  description: "Przeglądaj wszystkie produkty.",
}
export const dynamic = "force-dynamic"

export default function StorePage() {
  return <StoreTemplate />
}
