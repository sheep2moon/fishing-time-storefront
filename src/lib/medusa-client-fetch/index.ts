import { medusaClient } from "../config"

const fetchProductByHandle = async (handle: string) => {
  return medusaClient.products
    .list({ handle })
    .then(({ products }) => products[0])
}

export { fetchProductByHandle }
