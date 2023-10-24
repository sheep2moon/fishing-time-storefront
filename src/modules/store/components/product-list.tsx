import React, { useMemo } from "react"
import { useInfiniteHits } from "react-instantsearch"
import ProductPreview from "../../products/components/product-preview"
import { ProductVariant } from "@medusajs/client-types"

type ProductHit = {
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  variants: ProductVariant[]
  hs_code: string | null
}

const ProductList = () => {
  const { hits, results } = useInfiniteHits()
  const products: ProductHit[] = useMemo(() => {
    return [...hits] as unknown as ProductHit[]
  }, [hits])
  console.log(hits)

  return (
    <div>
      {products.map((product) => (
        <ProductPreview {...product} key={product.handle} />
      ))}
    </div>
  )
}

export default ProductList
