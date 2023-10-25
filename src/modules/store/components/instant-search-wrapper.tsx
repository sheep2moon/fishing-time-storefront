"use client"

import { InstantSearchNext } from "react-instantsearch-nextjs"
import { searchClient } from "../../../lib/search-client"
import { Configure } from "react-instantsearch"
import { useProductCategories } from "medusa-react"

type InstantSearchWrapperProps = {
  category_handle: string
  children: React.ReactNode
}
const indexName = "products"

const InstantSearchWrapper = ({
  children,
  category_handle,
}: InstantSearchWrapperProps) => {
  console.log(category_handle)
  const { product_categories } = useProductCategories({
    include_descendants_tree: true,
  })
  return (
    <InstantSearchNext
      indexName={indexName}
      searchClient={searchClient}
      routing={{
        stateMapping: {
          stateToRoute(uiState) {
            console.log("routing", uiState)
            const products = uiState[indexName]
            const params: Map<string, string> = new Map()
            const selectedCategory = products.menu?.categories
            if (selectedCategory) {
              const category_handle = product_categories?.find(
                (c) => c.name === selectedCategory
              )?.handle
              params.set("kategoria", category_handle || selectedCategory)
              console.log({ category_handle })
            }
            if (products.refinementList?.hs_code) {
              const branding = products.refinementList.hs_code
              params.set("producent", branding.join("+"))
            }
            return {
              q: products.query,
              kategoria: params.get("kategoria"),
              producent: params.get("producent"),
              page: products.page,
            }
          },
          routeToState(routeState) {
            console.log("ss")

            return {
              [indexName]: {
                query: routeState.q,
                page: routeState.page,
                menu: {
                  categories: routeState.kategoria || "",
                },
              },
            }
          },
        },
      }}
    >
      <Configure filters={`categories=${category_handle}`} />
      {children}
    </InstantSearchNext>
  )
}

export default InstantSearchWrapper
