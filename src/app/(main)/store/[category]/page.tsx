// "use client"
import { Metadata } from "next"
import InstantSearchWrapper from "../../../../modules/store/components/instant-search-wrapper"
import RefinementList from "../../../../modules/store/components/refinement-list"
import { useProductCategories } from "medusa-react"
import CategoryBreadcrumbs from "../../../../modules/store/components/category-breadcrumbs"
import ProductHits from "../../../../modules/store/components/product-hits"
import ProductList from "../../../../modules/store/components/product-list"
import AttributeFilters from "../../../../modules/store/components/attribute-filters"
import CategoryProducts from "../../../../modules/store/components/category-products"
import { Suspense } from "react"

type StoreProps = {
  params: { category: string }
}

export const metadata: Metadata = {
  title: "Sklep | Fishing Time",
  description: "Przeglądaj wszystkie produkty.",
}
// export const dynamic = "force-dynamic"

export default function StorePage({ params: { category } }: StoreProps) {
  return (
    <InstantSearchWrapper category_handle={category}>
      <div className="content-container py-6 lg:grid-cols-[1fr_4fr] grid">
        <AttributeFilters />
        <CategoryProducts category_handle={category} />

        {/* <CategoryBreadcrumbs category_handle={category} /> */}
        {/* <ProductHits /> */}
      </div>
    </InstantSearchWrapper>
  )
  // return <StoreTemplate />
}
