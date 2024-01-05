"use client"
import React from "react"
import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { useQuery } from "@tanstack/react-query"
import { getLatestProducts } from "../../../../lib/medusa-fetch/products"

const LatestProducts = () => {
  const { data, isLoading } = useQuery(["get_latest_products"], () =>
    getLatestProducts(6)
  )
  return (
    <div className="py-4 pt-12  bg-primary">
      <div className="content-container">
        <div className="flex items-center justify-between">
          <h2 className="text-lg p-1">Najnowsze produkty</h2>
        </div>
        <ul className="grid grid-cols-2 small:grid-cols-6 gap-x-2 small:gap-x-4 gap-y-4">
          {data
            ? data.map((product) => (
                <li key={product.id}>
                  <ProductPreview product={product} />
                </li>
              ))
            : Array.from(Array(4).keys()).map((i) => (
                <li key={i}>
                  <SkeletonProductPreview />
                </li>
              ))}
        </ul>
      </div>
    </div>
  )
}

export default LatestProducts
