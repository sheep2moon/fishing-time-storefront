"use server"
import React from "react"
import ProductList from "./product-list"
import { getCategoryByHandle } from "../../../lib/data"

type CategoryProductsProps = {
  category_handle: string
}

const CategoryProducts = async ({ category_handle }: CategoryProductsProps) => {
  const { product_category } = await getCategoryByHandle(category_handle)
  return (
    <div>
      <div>{product_category.name}</div>
      {product_category && <ProductList category_id={product_category.id} />}
    </div>
  )
}

export default CategoryProducts
