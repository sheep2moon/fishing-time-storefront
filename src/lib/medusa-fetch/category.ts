import {
  Product,
  ProductCategory,
  ProductCollection,
  StoreGetProductsParams,
} from "@medusajs/client-types"
import medusaRequest from "."

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
