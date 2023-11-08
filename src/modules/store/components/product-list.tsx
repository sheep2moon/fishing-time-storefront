"use client"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { getProductsByCategoryId } from "../../../lib/data"
import ProductPreview from "../../products/components/product-preview"

type ProductListProps = {
  category_id: string
}

const ProductList = ({ category_id }: ProductListProps) => {
  const { data, isLoading } = useQuery(["category-products", category_id], () =>
    getProductsByCategoryId(category_id, 0)
  )
  React.useEffect(() => {
    console.log("data", data)
  }, [data])
  return (
    <div className="grid grid-cols-3 gap-2">
      {data?.products &&
        data.products.map((product) => (
          <ProductPreview product={product} key={product.id} />
        ))}
    </div>
  )
}

export default ProductList
