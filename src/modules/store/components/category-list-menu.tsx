import { useProductCategories } from "medusa-react"
import React, { useMemo } from "react"
import { useMenu } from "react-instantsearch"

const CategoryListMenu = () => {
  // const { items } = useMenu({ attribute: "categories" })
  const { product_categories } = useProductCategories({
    include_descendants_tree: true,
  })
  console.log(product_categories)

  // const topLevelCategories = useMemo(
  //   () => product_categories?.filter((c) => !c.parent_category),
  //   [product_categories]
  // )
  // console.log({ topLevelCategories })

  return <div></div>
}

export default CategoryListMenu
