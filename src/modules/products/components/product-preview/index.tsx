import clsx from "clsx"
import Link from "next/link"
import Thumbnail from "../thumbnail"
import { cn } from "../../../../lib/util/cn"
import { ProductVariant } from "@medusajs/client-types"

export type ProductPreviewProps = {
  title: string
  handle: string | null
  thumbnail: string | null
  is_available?: boolean
  variants: ProductVariant[]
  price?: {
    calculated_price: string
    original_price: string
    difference: string
    price_type: "default" | "sale"
  }
}

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  variants,
  price,
  is_available,
}: ProductPreviewProps) => {
  console.log()

  return (
    <div className={cn("shadow-lg shadow-slate-300 rounded-md p-1 w-full")}>
      <Link href={`/products/${handle}`} className="block w-full max-w-xs">
        <div className=" flex flex-col justify-between h-full">
          <div className=" p-1 ">
            <Thumbnail thumbnail={thumbnail} size="full" />
          </div>
          <div className="text-base-regularh h-full py-2 flex flex-col justify-between text-stone-900">
            <span className="border-t border-emerald-900 px-1 font-semibold text-base inline-block h-12 leading-6 text-ellipsis overflow-hidden">
              {title}
            </span>
            <div className="flex items-center px-1">
              {price ? (
                <>
                  {price.price_type === "sale" && (
                    <span className="line-through text-gray-500">
                      {price.original_price}
                    </span>
                  )}
                  <span
                    className={cn(
                      "font-semibold text-secondary-900 text-lg shadow-sm text-right w-full",
                      {
                        "text-rose-500": price.price_type === "sale",
                      }
                    )}
                  >
                    {price?.original_price.replace("PLN", "") + "zł"}
                  </span>
                </>
              ) : (
                <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductPreview
