import clsx from "clsx"
import React from "react"
import { ProductHit } from "../hit"
import { useHits, type UseHitsProps } from "react-instantsearch"
type HitsProps<THit> = React.ComponentProps<"div"> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element
  }

const DesktopHits = ({
  hitComponent: Hit,
  className,
  ...props
}: HitsProps<ProductHit>) => {
  const { hits } = useHits(props)
  console.log(hits)

  return (
    <div
      className={clsx(
        "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
        className,
        {
          "max-h-[1000px] opacity-100": !!hits.length,
          "max-h-0 opacity-0": !hits.length,
        }
      )}
    >
      <div className="grid grid-cols-1">
        {hits.map((hit, index) => (
          <li key={index} className="list-none">
            <Hit hit={hit as unknown as ProductHit} />
          </li>
        ))}
        {hits.length === 0 && <span>Brak wyników</span>}
      </div>
    </div>
  )
}

export default DesktopHits
