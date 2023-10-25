import { useProductCategories } from "medusa-react"
import React, { useMemo } from "react"
import { useMenu } from "react-instantsearch"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../common/components/card"
import { cn } from "../../../lib/util/cn"
import { ProductCategory } from "@medusajs/medusa"

type CategoryListMenuProps = {
  product_categories: ProductCategory[]
}

const CategoryListMenu = ({ product_categories }: CategoryListMenuProps) => {
  const { refine, items } = useMenu({ attribute: "categories" })

  const handleRefine = (categoryHandle: string) => {
    console.log(items)

    if (items.find((item) => item.value === categoryHandle)?.isRefined) return
    refine(categoryHandle)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kategoria</CardTitle>
      </CardHeader>
      <CardContent>
        {product_categories.map((category) => {
          if (category.parent_category) return
          return (
            <div key={category.id}>
              <button
                onClick={() => handleRefine(category.handle)}
                className={cn(
                  "p-1",
                  items.find((item) => item.value === category.handle)
                    ?.isRefined && "font-bold"
                )}
              >
                {category.name}
              </button>
              {category.category_children.length > 0 && (
                <div className="ml-4 flex flex-col items-start">
                  {category.category_children.map((child1_category) => {
                    if (child1_category.parent_category) return
                    return (
                      <button
                        key={child1_category.id}
                        onClick={() => handleRefine(child1_category.handle)}
                        className={cn(
                          "p-1",
                          items.find(
                            (item) => item.value === child1_category.handle
                          )?.isRefined && "font-bold"
                        )}
                      >
                        {child1_category.name}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default CategoryListMenu
