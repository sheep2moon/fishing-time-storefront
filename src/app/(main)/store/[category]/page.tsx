import { Metadata } from "next"
import InstantSearchWrapper from "../../../../modules/store/components/instant-search-wrapper"
import ProductList from "../../../../modules/store/components/product-list"
import RefinementList from "../../../../modules/store/components/refinement-list"

type StoreProps = {
  params: { category: string }
}

export const metadata: Metadata = {
  title: "Sklep | Fishing Time",
  description: "Przeglądaj wszystkie produkty.",
}
export const dynamic = "force-dynamic"

export default function StorePage({ params: { category } }: StoreProps) {
  return (
    <InstantSearchWrapper category_handle={category}>
      <div className="content-container py-6 lg:grid-cols-[1fr_4fr] grid">
        <div className="flex flex-col">
          <RefinementList attribute="hs_code" title="Producent" />
          <RefinementList attribute="status" title="Status (tylko dla dev)" />
        </div>

        <ProductList />
      </div>
    </InstantSearchWrapper>
  )
  // return <StoreTemplate />
}
