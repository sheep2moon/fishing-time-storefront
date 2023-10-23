import transformProductPreview from "@lib/util/transform-product-preview"
import { Product, Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { formatAmount } from "medusa-react"
import { useMemo } from "react"
import { InfiniteProductPage, ProductPreviewType } from "types/global"
import { getPercentageDiff } from "../util/get-precentage-diff"
import { CalculatedVariant } from "../../types/medusa"

type UsePreviewProps<T> = {
  pages?: T[]
  region?: Region
}

const usePreviews = <T extends InfiniteProductPage>({
  pages,
  region,
}: UsePreviewProps<T>) => {
  const previews: ProductPreviewType[] = useMemo(() => {
    if (!pages || !region) {
      return []
    }

    const products: PricedProduct[] = []

    for (const page of pages) {
      products.push(...page.response.products)
    }

    // const transformedProducts = products.map((p) =>
    //   transformProductPreview(p, region)
    // )
    const transformedProducts: ProductPreviewType[] = []
    console.log(products)

    products.forEach((product) => {
      if (product.variants.length > 0) {
        const variants = product.variants as unknown as CalculatedVariant[]
        variants.forEach((variant) => {
          const variantPreview: ProductPreviewType = {
            id: product.id!,
            variant_id: variant.id,
            handle: product.handle!,
            title: product.title! + " " + variant.title,
            thumbnail: product.thumbnail!,
            price: {
              calculated_price: formatAmount({
                amount: variant.calculated_price,
                region: region,
                includeTaxes: false,
              }),
              original_price: formatAmount({
                amount: variant.original_price,
                region: region,
                includeTaxes: false,
              }),
              difference: getPercentageDiff(
                variant.original_price,
                variant.calculated_price
              ),
              price_type: variant.calculated_price_type,
            },
          }
          transformedProducts.push(variantPreview)
        })
      }
    })

    return transformedProducts
  }, [pages, region])

  return previews
}

export default usePreviews
