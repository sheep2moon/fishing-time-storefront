"use client"

import { canBuy } from "@lib/util/can-buy"
import { findCheapestPrice } from "@lib/util/prices"
import isEqual from "lodash/isEqual"
import { formatVariantPrice, useCart } from "medusa-react"
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useStore } from "./store-context"
import { PricedVariant, PricedProduct } from "@medusajs/client-types"

interface ProductContext {
  formattedPrice: string
  quantity: number
  disabled: boolean
  inStock: boolean
  currentVariant?: PricedVariant
  setCurrentVariant: (v: PricedVariant) => void
  maxQuantityMet: boolean
  increaseQuantity: () => void
  decreaseQuantity: () => void
  addToCart: () => void
}

const ProductActionContext = createContext<ProductContext | null>(null)

interface ProductProviderProps {
  children?: React.ReactNode
  product: PricedProduct
}

export const ProductProvider = ({
  product,
  children,
}: ProductProviderProps) => {
  const [quantity, setQuantity] = useState<number>(1)
  // select first variant for now
  const [currentVariant, setCurrentVariant] = useState<
    PricedVariant | undefined
  >(product.variants ? product.variants[0] : undefined)
  const [maxQuantityMet, setMaxQuantityMet] = useState<boolean>(false)
  const [inStock, setInStock] = useState<boolean>(true)

  const { addItem } = useStore()
  const { cart } = useCart()
  const variants = product.variants
  // console.log("product", product)

  // useEffect(() => {
  //   // initialize the option state
  //   const optionObj: Record<string, string> = {}
  //   for (const option of product.options || []) {
  //     Object.assign(optionObj, { [option.id]: undefined })
  //   }
  //   setOptions(optionObj)
  // }, [product])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants?.length === 1) {
      setCurrentVariant(variants[0])
    }
  }, [variants])
  // memoized record of the product's variants
  // const variantRecord = useMemo(() => {
  //   const map: Record<string, Record<string, string>> = {}

  //   for (const variant of variants) {
  //     const tmp: Record<string, string> = {}

  //     for (const option of variant.options) {
  //       tmp[option.option_id] = option.value
  //     }

  //     map[variant.id] = tmp
  //   }
  //   return map
  // }, [variants])

  // memoized function to check if the current options are a valid variant
  // const variant = useMemo(() => {
  //   let variantId: string | undefined = undefined

  //   for (const key of Object.keys(variantRecord)) {
  //     if (isEqual(variantRecord[key], options)) {
  //       variantId = key
  //     }
  //   }

  //   return variants.find((v) => v.id === variantId)
  // }, [options, variantRecord, variants])

  // useEffect(() => {
  //   if (variants.length === 1) {
  //     setOptions(variantRecord[variants[0].id])
  //   }
  // }, [variants, variantRecord])

  const disabled = useMemo(() => {
    return !currentVariant
  }, [currentVariant])

  // memoized function to get the price of the current variant
  const formattedPrice = useMemo(() => {
    if (currentVariant && cart?.region) {
      console.log(currentVariant, cart.region)
      return "cena wariantu<-"
    } else if (cart?.region) {
      return "brak wariantu"
    } else {
      // if no variant is selected, or we couldn't find a price for the region/currency
      return "N/A"
    }
  }, [currentVariant, cart])

  useEffect(() => {
    if (currentVariant) {
      setInStock(canBuy(currentVariant))
    }
  }, [currentVariant])

  // const updateOptions = (update: Record<string, string>) => {
  //   setOptions({ ...options, ...update })
  // }

  const addToCart = () => {
    if (currentVariant) {
      addItem({
        variantId: currentVariant.id,
        quantity,
      })
    }
  }

  const increaseQuantity = () => {
    const maxQuantity = currentVariant?.inventory_quantity || 0

    if (maxQuantity > quantity + 1) {
      setQuantity(quantity + 1)
    } else {
      setMaxQuantityMet(true)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)

      if (maxQuantityMet) {
        setMaxQuantityMet(false)
      }
    }
  }

  return (
    <ProductActionContext.Provider
      value={{
        quantity,
        maxQuantityMet,
        disabled,
        inStock,
        currentVariant,
        setCurrentVariant,
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        formattedPrice,
      }}
    >
      {children}
    </ProductActionContext.Provider>
  )
}

export const useProductActions = () => {
  const context = useContext(ProductActionContext)
  if (context === null) {
    throw new Error(
      "useProductActionContext must be used within a ProductActionProvider"
    )
  }
  return context
}
