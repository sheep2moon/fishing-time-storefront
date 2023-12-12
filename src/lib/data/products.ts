import { PricedProduct } from "@medusajs/client-types"
import medusaRequest from "../medusa-fetch"

/**
 * Fetches a product by handle, using the Medusa API or the Medusa Product Module, depending on the feature flag.
 * @param handle (string) - The handle of the product to retrieve
 * @returns (array) - An array of products (should only be one)
 */
export async function getProductByHandle(
  handle: string
): Promise<{ product: PricedProduct }> {
  const { products } = await medusaRequest("GET", "/products", {
    query: {
      handle,
      expand: "categories,images,variants,options",
    },
  })
    .then((res) => res.body)
    .catch((err) => {
      throw err
    })

  return {
    product: products[0],
  }
}

export async function getLatestProducts(
  limit: number
): Promise<PricedProduct[]> {
  const { products } = await medusaRequest("GET", "/products", {
    query: {
      limit: 4,
    },
  })
    .then((res) => res.body)
    .catch((err) => {
      throw err
    })
  console.log(products)

  return products
}
