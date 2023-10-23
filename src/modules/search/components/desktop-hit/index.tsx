import Hit, { HitProps } from "@modules/search/components/hit"
import { useRouter } from "next/navigation"

const DesktopHit = ({ hit }: HitProps) => {
  const { push } = useRouter()

  const go = () => {
    push(`/products/${hit.handle}`)
  }

  return (
    <button className="w-full text-left" onClick={go}>
      <Hit hit={hit} />
    </button>
  )
}

export default DesktopHit
