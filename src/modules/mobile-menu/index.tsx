import React, { useEffect, useMemo, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../common/components/sheet"
import { Button } from "../common/components/button"
import { ChevronLeftIcon, ChevronRightIcon, MenuIcon } from "lucide-react"
import { useMobileMenuStore } from "../../lib/zustand-store/mobile-menu-store"
import { useProductCategories } from "medusa-react"
import Link from "next/link"

const MobileMenu = () => {
  const { isOpen, open, close, currentScreen, setCurrentScreen } =
    useMobileMenuStore((state) => state)
  const { product_categories } = useProductCategories()
  const [currentCategoryParentId, setCurrentCategoryParentId] = useState<
    null | string
  >(null)

  const childCategories = useMemo(() => {
    return product_categories?.filter(
      (category) => category.parent_category_id === currentCategoryParentId
    )
  }, [currentCategoryParentId, product_categories])

  const handleCategoryBack = () => {
    if (childCategories && childCategories[0].parent_category_id) {
      const newParentId =
        childCategories[0].parent_category?.parent_category_id || null
      setCurrentCategoryParentId(newParentId)
      if (!newParentId) setCurrentScreen("main")
    }
  }

  return (
    <>
      <Sheet
        open={isOpen}
        onOpenChange={(isOpen) => (isOpen ? open() : close())}
      >
        <SheetTrigger asChild>
          <Button>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-screen grid grid-cols-1 grid-rows-[100px_1fr_100px]"
        >
          <SheetHeader>
            <h1>FishingTime</h1>
          </SheetHeader>
          <div>
            {currentScreen === "main" && (
              <ul className="flex flex-col">
                {product_categories?.map((category) => {
                  if (category.parent_category) return
                  return (
                    <li
                      key={category.id}
                      className="flex justify-between border-t-2 border-primary w-full p-4 bg-primary-200"
                      onClick={() => {
                        setCurrentCategoryParentId(category.id)
                        setCurrentScreen("category")
                      }}
                    >
                      <span>{category.name}</span>
                      <ChevronRightIcon />
                    </li>
                  )
                })}
              </ul>
            )}
            {currentScreen === "category" && (
              <ul>
                <li>
                  <button
                    className="flex bg-primary-300 w-full gap-4 justify-start p-4 rounded-sm"
                    onClick={handleCategoryBack}
                  >
                    <ChevronLeftIcon />
                    Wstecz
                  </button>
                </li>
                {childCategories?.map((category) => {
                  console.log(category.category_children)

                  if (category.category_children.length === 0)
                    return (
                      <li key={category.id} className="" onClick={close}>
                        <Link
                          href={`/${category.handle}`}
                          className="flex justify-between border-t-2 border-primary w-full p-4 bg-primary-200"
                        >
                          <span>{category.name}</span>
                          <ChevronRightIcon />
                        </Link>
                      </li>
                    )
                  return (
                    <li
                      key={category.id}
                      className="flex justify-between border-t-2 border-primary w-full p-4 bg-primary-200"
                      onClick={() => {
                        setCurrentCategoryParentId(category.id)
                        setCurrentScreen("category")
                      }}
                    >
                      <span>{category.name}</span>
                      <ChevronRightIcon />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <SheetFooter>Options</SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileMenu
