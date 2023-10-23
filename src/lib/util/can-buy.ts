import { PricedVariant } from "@medusajs/client-types"

export const canBuy = (variant: PricedVariant) => {
  return variant.inventory_quantity > 0 || variant.allow_backorder === true
}
