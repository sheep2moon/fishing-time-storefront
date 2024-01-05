import React from "react"
import { useCartSheetStore } from "../../../lib/zustand-store/cart-sheet-store"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../common/components/sheet"
import { Button } from "../../common/components/button"
import { ShoppingCartIcon, Trash } from "lucide-react"
import { formatAmount, useCart } from "medusa-react"
import useEnrichedLineItems from "../../../lib/hooks/use-enrich-line-items"
import { useStore } from "../../../lib/context/store-context"
import Thumbnail from "../../products/components/thumbnail"
import Link from "next/link"
import LineItemOptions from "../../common/components/line-item-options"
import LineItemPrice from "../../common/components/line-item-price"
import { InternalLink } from "../../common/components/internal-link"

const CartSheet = () => {
  const { isOpen, close, open } = useCartSheetStore((state) => state)
  const { cart, totalItems } = useCart()
  const items = useEnrichedLineItems()
  const { deleteItem } = useStore()
  return (
    <Sheet open={isOpen} onOpenChange={(isOpen) => (isOpen ? open() : close())}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="gap-2">
          <ShoppingCartIcon />
          <span className="self-end bg-secondary-600 text-primary-50 text-base px-1 rounded-sm">
            {totalItems}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="grid grid-cols-1 grid-rows-[60px_4fr_60px]">
        <SheetHeader>
          <SheetTitle>Koszyk</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto">
          {cart && items?.length ? (
            <>
              <div className="overflow-y-auto max-h-full px-4 grid grid-cols-1 gap-y-8">
                {items
                  .sort((a, b) => {
                    return a.created_at > b.created_at ? -1 : 1
                  })
                  .map((item) => (
                    <div
                      className="grid grid-cols-[1fr_2fr] gap-x-4"
                      key={item.id}
                    >
                      <Thumbnail thumbnail={item.thumbnail} size="full" />
                      <div className="">
                        <h3 className="line-clamp-2">{item.title}</h3>
                        <LineItemOptions variant={item.variant} />
                        <LineItemPrice
                          region={cart.region}
                          item={item}
                          style="tight"
                        />
                        <button
                          onClick={() => deleteItem(item.id)}
                          className=""
                        >
                          Usuń
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div>
              <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                  <span>0</span>
                </div>
                <span>Twój koszyk jest pusty.</span>
                <div>
                  <Link href="/store">
                    <>
                      <span className="sr-only">Nawiguj do sklepu</span>
                      <Button onClick={close}>Przeglądaj produkty</Button>
                    </>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <SheetFooter className="flex sm:justify-between mt-4">
          {cart && cart.region && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-primary-950 font-semibold">Razem:</span>
              <span className="text-large-semi">
                {formatAmount({
                  amount: cart.subtotal || 0,
                  region: cart.region,
                  includeTaxes: false,
                })}
              </span>
            </div>
          )}
          <InternalLink href="/cart" variant="secondary" onClick={close}>
            Idź do koszyka
          </InternalLink>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet
