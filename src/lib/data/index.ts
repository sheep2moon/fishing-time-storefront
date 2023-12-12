import {
  Product,
  ProductCategory,
  ProductCollection,
  StoreGetProductsParams,
} from "@medusajs/client-types"
import medusaRequest from "../medusa-fetch"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

// The API_BASE_URL is set in the .env file. It is the base URL of your Next.js app.
// const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

export async function getCategoryByHandle(
  handle: string
): Promise<{ product_category: ProductCategory }> {
  const product_category: ProductCategory = await medusaRequest(
    "GET",
    "/product-categories",
    {
      query: {
        handle,
      },
    }
  )
    .then((res) => {
      return res.body.product_categories[0]
    })
    .catch((err) => {
      throw err
    })
  return { product_category }
}
/**
 * Fetches a list of categories, using the Medusa API or the Medusa Product Module, depending on the feature flag.
 * @param offset (number) - The offset of the categories to retrieve (default: 0
 * @param limit (number) - The limit of the categories to retrieve (default: 100)
 * @returns product_categories (array) - An array of product_categories
 * @returns count (number) - The total number of categories
 * @returns nextPage (number) - The offset of the next page of categories
 */
export async function getCategoriesList(
  offset: number = 0,
  limit?: number
): Promise<{
  product_categories: ProductCategory[]
  count: number
}> {
  const { product_categories, count } = await medusaRequest(
    "GET",
    "/product-categories",
    {
      query: {
        offset,
        limit,
      },
    }
  )
    .then((res) => res.body)
    .catch((err) => {
      throw err
    })

  return {
    product_categories,
    count,
  }
}

/**
 * Fetches a category by handle, using the Medusa API or the Medusa Product Module, depending on the feature flag.
 * @param categoryId  (string) - The id of the category to retrieve
 * @returns collections (array) - An array of categories (should only be one)
 * @returns response (object) - An object containing the products and the number of products in the category
 * @returns nextPage (number) - The offset of the next page of products
 */
export async function getProductsByCategoryId(
  categoryId: string,
  offset: number
): Promise<{
  products: Product[]
  count: number
  nextPage: number
}> {
  let products: Product[] | null = null
  const limit = 24
  const response = await medusaRequest("GET", "/products", {
    query: {
      "category_id[]": categoryId,
      offset,
      limit,
    },
  })
    .then(({ body }) => {
      // products = body
      return body
    })
    .catch((err) => {
      throw new Error(`Nie znaleziono produktów ${err.message}`)
    })
  if (!products) {
  }

  return response
}
