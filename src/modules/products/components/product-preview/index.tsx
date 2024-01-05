import clsx from "clsx"
import Link from "next/link"
import Thumbnail from "../thumbnail"
import { cn } from "../../../../lib/util/cn"
import { Product, Region } from "@medusajs/client-types"
import { useMemo, useState } from "react"
import { formatAmount, useCart } from "medusa-react"
import { Button } from "../../../common/components/button"
import { ProductHit } from "../../../store/components/product-hits"
import { CalculatedVariant } from "../../../../types/medusa"
import { getPercentageDiff } from "../../../../lib/util/get-precentage-diff"

type ProductPreviewProps = {
  product: Product
}

const ProductPreview = ({ product }: ProductPreviewProps) => {
  const { cart } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<
    ProductHit["variants"][number] | null
  >(null)

  // const formattedPrice = useMemo(() => {
  //   console.log(product.variants)
  //   if (!cart) return null
  //   const variants = product.variants as unknown as CalculatedVariant[]

  //   const cheapestVariant = variants.reduce((prev, curr) => {
  //     return prev.calculated_price < curr.calculated_price ? prev : curr
  //   })
  //   console.log(cheapestVariant)
  //   return {
  //     calculated_price: formatAmount({
  //       amount: cheapestVariant.prices[0].amount,
  //       region: cart.region,
  //       includeTaxes: false,
  //     }),
  //     original_price: formatAmount({
  //       amount: cheapestVariant.original_price,
  //       region: cart.region,
  //       includeTaxes: false,
  //     }),
  //     price_type: cheapestVariant.calculated_price_type,
  //     percentage_diff: getPercentageDiff(
  //       cheapestVariant.original_price,
  //       cheapestVariant.calculated_price
  //     ),
  //   }
  // }, [product, cart])

  return (
    <div
      className={cn(
        "shadow-lg shadow-slate-300 bg-white rounded-md p-1 w-full"
      )}
    >
      <div className="max-w-xs w-full">
        <div className=" flex flex-col justify-between h-full">
          <div className="p-1 relative">
            <Link href={`/products/${product.handle}`} className="">
              <Thumbnail thumbnail={product.thumbnail} size="full" />
            </Link>
            {product.variants && product.variants.length > 1 && (
              <div className="bottom-0 absolute bg-primary/30">
                <span className="text-xs font-semibold">Dostępne opcje:</span>
                <div className="flex flex-wrap gap-0.5 gap-y-[2px] max-h-[54px] overflow-hidden">
                  {product.variants.map((variant) => (
                    <button
                      className={cn(
                        "text-sm px-1 flex text-left items-center h-[26px] rounded-sm bg-primary-100 border border-primary-300 transition-all hover:border-accent !line-clamp-1 text-primary-950/70",
                        selectedVariant === variant &&
                          "text-primary-950 bg-primary-50 border-accent"
                      )}
                      key={variant.title}
                      // onClick={() => setSelectedVariant(variant)}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="text-base-regularh h-full py-2 flex flex-col justify-between text-stone-900">
            <span className="border-t border-emerald-900 px-1 font-semibold text-base inline-block h-12 leading-6 text-ellipsis overflow-hidden">
              {product.title}
            </span>
            <div className="flex justify-between items-center max-w-full overflow-hidden">
              <span className="p-2">cena</span>
              <Button className="px-4">Do koszyka</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPreview
