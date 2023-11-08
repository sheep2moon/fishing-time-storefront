"use client"
import { useProductCategories } from "medusa-react"
import Link from "next/link"
import React from "react"
import { cn } from "../../../lib/util/cn"
import { ProductCategory } from "@medusajs/client-types"
type CategoryBreadcrumbsProps = {
  categories: ProductCategory[]
}

const CategoryBreadcrumbs = ({ categories }: CategoryBreadcrumbsProps) => {
  // const { product_categories } = useProductCategories({
  //   include_descendants_tree: true,
  // })

  // const categoriesList = React.useMemo(() => {
  //   const currentCategory = product_categories?.find(
  //     (category) => category.handle === category_handle
  //   )
  //   const categoriesTree = [currentCategory]
  //   let parentCategoryId = currentCategory?.parent_category_id
  //   while (parentCategoryId) {
  //     const parentCategory = product_categories?.find(
  //       (c) => c.id === parentCategoryId
  //     )
  //     categoriesTree.unshift(parentCategory)
  //     parentCategoryId = parentCategory?.parent_category_id
  //   }
  //   return categoriesTree
  // }, [category_handle, product_categories])

  return (
    <ol className="list-none flex gap-2 group p-1 ml-4">
      {categories.map((category, index) => (
        <li key={category?.id} className="">
          <span
            className={cn(
              "mx-2 text-neutral-500 dark:text-neutral-300",
              index === 0 && "hidden"
            )}
          >
            /
          </span>
          <Link
            className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            href={`/store/${category?.handle}`}
          >
            {category?.name}
          </Link>
        </li>
      ))}
    </ol>
  )
}

export default CategoryBreadcrumbs
