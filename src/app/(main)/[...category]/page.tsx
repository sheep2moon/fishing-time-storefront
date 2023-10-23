import { getCategoryByHandle } from "@lib/data"
import CategoryTemplate from "@modules/categories/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: { category: string[] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product_category } = await getCategoryByHandle(params.category).catch(
    (err) => {
      notFound()
    }
  )

  return {
    title: `${product_category.name} | Fishing Time`,
    description: `${product_category.name} - kategoria produktów`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { product_category } = await getCategoryByHandle(params.category).catch(
    (err) => {
      notFound()
    }
  )

  return <CategoryTemplate product_category={product_category} />
}
