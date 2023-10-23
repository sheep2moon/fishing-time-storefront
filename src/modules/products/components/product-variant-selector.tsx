import React from "react"
import { Button } from "../../common/components/button"
import { PricedVariant } from "@medusajs/client-types"
import { useProductActions } from "../../../lib/context/product-context"
import { cn } from "../../../lib/util/cn"

type ProductVariantSelectorProps = {
  variants: PricedVariant[]
}

const ProductVariantSelector = ({ variants }: ProductVariantSelectorProps) => {
  const { currentVariant, setCurrentVariant } = useProductActions()
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <Button
          className={cn(
            "hover:ring-2 ring-primary-300 hover:bg-primary-200",
            currentVariant?.id === variant.id && "bg-accent hover:bg-accent"
          )}
          key={variant.id}
          onClick={() => setCurrentVariant(variant)}
        >
          {variant.title}
        </Button>
      ))}
    </div>
  )
}

export default ProductVariantSelector
