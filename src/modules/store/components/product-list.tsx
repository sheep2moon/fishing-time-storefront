"use client"

import React, { useMemo } from "react"
import { useInfiniteHits } from "react-instantsearch"
import ProductPreview from "../../products/components/product-preview"
import { ProductVariant } from "@medusajs/client-types"
import { useCart } from "medusa-react"

export type ProductHit = {
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  variants: {
    id: string
    title: string
    inventory_quantity: number
    prices: {
      amount: number
      currency_code: "pln"
      // price_type: "default" | "sale"
    }[]
  }[]
  hs_code: string | null
}

const ProductList = () => {
  const { hits, results } = useInfiniteHits()

  const products: ProductHit[] = useMemo(() => {
    return [...hits] as unknown as ProductHit[]
  }, [hits])

  return (
    <>
      {products.length > 0 && (
        <div className="lg:grid-cols-4 grid grid-cols-1 p-4 gap-2">
          {products.map((product) => (
            <ProductPreview {...product} key={product.handle} />
          ))}
        </div>
      )}
      {products.length === 0 && (
        <div className="p-4 text-xl text-center w-full">Brak wyników 🙁</div>
      )}
    </>
  )
}

export default ProductList
