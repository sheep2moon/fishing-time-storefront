"use client"

import usePreviews from "@lib/hooks/use-previews"
import { getProductsByCategoryHandle } from "@lib/data"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import { useCart } from "medusa-react"
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

  const indexName = "products"

  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName="products"
      routing={{
        stateMapping: {
          stateToRoute(uiState) {
            console.log(uiState)
            const indexUiState = uiState[indexName]

            return {
              q: indexUiState.query,
              kategoria: indexUiState.refinementList?.categories,
              producent: indexUiState.refinementList?.hs_code,
              page: indexUiState.page,
            }
          },
          routeToState(routeState) {
            return {
              [indexName]: {
                query: routeState.q,
                page: routeState.page,
              },
            }
          },
        },
      }}
    >
      <div className="content-container py-6 lg:grid-cols-[1fr_3fr] grid">
        <div className="flex flex-col gap-2">
          <CategoryListMenu />
          <RefinementList attribute="categories" title="Kategorie" />
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
