import React from "react"
import { Button } from "../../common/components/button"
import { PricedVariant } from "@medusajs/client-types"
import { useProductActions } from "../../../lib/context/product-context"
import { cn } from "../../../lib/util/cn"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { createUrl } from "../../../lib/util/create-url"

type ProductVariantSelectorProps = {
  variants: PricedVariant[]
}

// Converts a title to a URL-friendly slug
const titleToSlug = (title: string): string => title.trim().replace(/\s+/g, "-")

// Converts a URL-friendly slug back into a readable title
const slugToTitle = (slug: string): string => slug.split("-").join(" ")

const ProductVariantSelector = ({ variants }: ProductVariantSelectorProps) => {
  const { currentVariant, setCurrentVariant } = useProductActions()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSelectVariant = (variant: PricedVariant) => {
    const variantParams = new URLSearchParams(searchParams.toString())
    variantParams.set("variant", titleToSlug(variant.title))
    const variantUrl = createUrl(pathname, variantParams)
    router.replace(variantUrl, { scroll: false })
    setCurrentVariant(variant)
  }

  React.useEffect(() => {
    const selectedVariantSlug = searchParams.get("variant")

    if (selectedVariantSlug) {
      const variantTitle = slugToTitle(selectedVariantSlug)
      console.log(variantTitle)
      const selectedVariant = variants.find(
        (variant) => variant.title === variantTitle
      )
      if (selectedVariant) setCurrentVariant(selectedVariant)
    }
  }, [])

  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <Button
          className={cn(
            "hover:ring-2 ring-primary-300 hover:bg-primary-200",
            currentVariant?.id === variant.id && "bg-accent hover:bg-accent"
          )}
          key={variant.id}
          onClick={() => handleSelectVariant(variant)}
        >
          {variant.title}
        </Button>
      ))}
    </div>
  )
}

export default ProductVariantSelector
