"use client"

import usePreviews from "@lib/hooks/use-previews"
import { getProductsByCategoryHandle } from "@lib/data"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import { useCart, useProductCategories } from "medusa-react"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { searchClient } from "../../lib/search-client"
import {
  InstantSearchNext,
  InstantSearchNextRouting,
} from "react-instantsearch-nextjs"
import {} from "react-instantsearch"
import ProductList from "./components/product-list"
import RefinementList from "./components/refinement-list"
import CategoryListMenu from "./components/category-list-menu"

const StoreTemplate = () => {
  const { cart } = useCart()
  const { ref, inView } = useInView()
  const { product_categories } = useProductCategories({
    include_descendants_tree: true,
  })
  const indexName = "products"

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.href.includes("store")) window.location.reload()
    }
    window.addEventListener("popstate", handleRouteChange)
    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [])

  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName="products"
      // initialUiState={{
      //   products: {},
      // }}
      onStateChange={({ uiState, setUiState }) => {
        // console.log("search state change", uiState)

        setUiState(uiState)
      }}
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
      <div className="content-container py-6 lg:grid-cols-[1fr_3fr] grid">
        <div className="flex flex-col gap-2">
          {product_categories && (
            <CategoryListMenu product_categories={product_categories} />
          )}
          {/* <RefinementList attribute="categories" title="Kategorie" /> */}
          <RefinementList attribute="hs_code" title="Producent" />
        </div>
        <div>
          <ProductList />
        </div>
      </div>
    </InstantSearchNext>
  )
}

export default StoreTemplate
