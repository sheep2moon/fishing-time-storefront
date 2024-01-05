import ProductTemplate from "@modules/products/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductByHandle } from "../../../../lib/medusa-fetch/products"

type Props = {
  params: { handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product } = await getProductByHandle(params.handle)

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Fishing Time`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Fishing Time`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { product } = await getProductByHandle(params.handle)

  if (!product) notFound()
  return <ProductTemplate product={product} />
}
