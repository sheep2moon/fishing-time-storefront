"use client"

import { InstantSearchNext } from "react-instantsearch-nextjs"
import { searchClient } from "../../../lib/search-client"
import { Configure, useConfigure, useMenu } from "react-instantsearch"
import { useProductCategories } from "medusa-react"

type InstantSearchWrapperProps = {
  category_handle: string
  children: React.ReactNode
}
const indexName = "products"

const removeUndefinedValues = (
  obj: Record<string, any>
): Record<string, any> => {
  const entries = Object.entries(obj).filter(
    ([_, value]) => value !== undefined
  )
  return Object.fromEntries(entries)
}

const InstantSearchWrapper = ({
  children,
  category_handle,
}: InstantSearchWrapperProps) => {
  return (
    <InstantSearchNext
      indexName={indexName}
      searchClient={searchClient}
      routing
      // routing={{
      //   stateMapping: {
      //     stateToRoute(uiState) {
      //       console.log("routing", uiState)
      //       const products = uiState[indexName]
      //       const params: Map<string, string> = new Map()
      //       if (products.refinementList?.hs_code) {
      //         const branding = products.refinementList.hs_code
      //         params.set("producent", branding.join("+"))
      //       }
      //       return {
      //         q: products.query,
      //         producent: params.get("producent"),
      //         page: products.page,
      //       }
      //     },
      //     routeToState(routeState) {
      //       console.log("routestate", routeState)
      //       const hs_code = routeState.producent
      //         ? decodeURIComponent(routeState.producent).split("+")
      //         : undefined
      //       const refinements = {
      //         hs_code,
      //       }
      //       const refinementList = removeUndefinedValues(refinements)
      //       return {
      //         [indexName]: {
      //           query: routeState.q,
      //           page: routeState.page,
      //           refinementList,
      //           configure: {
      //             filters: `categories=${category_handle}`,
      //           },
      //         },
      //       }
      //     },
      //   },
      // }}
    >
      <Configure facetFilters={[`categories=${category_handle}`]} />
      {children}
    </InstantSearchNext>
  )
}

export default InstantSearchWrapper
