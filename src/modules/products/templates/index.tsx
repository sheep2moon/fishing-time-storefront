"use client"

import React, { useEffect, useRef, useState } from "react"
import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import RelatedProducts from "@modules/products/components/related-products"
import ImageGallery from "@modules/products/components/image-gallary"
import MobileActions from "@modules/products/components/mobile-actions"

import ProductActions from "../components/product-actions"
import { PricedProduct } from "@medusajs/client-types"
import CategoryBreadcrumbs from "../../store/components/category-breadcrumbs"
import { Button } from "../../common/components/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

type ProductTemplateProps = {
  product: PricedProduct
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const info = useRef<HTMLDivElement>(null)
  const inView = useIntersection(info, "0px")
  const router = useRouter()
  console.log(product)

  return (
    <ProductProvider product={product}>
      <div className="content-container">
        <div className="p-1 flex items-center">
          <Button variant="ghost" onClick={() => router.back()}>
            <ChevronLeft /> Wróć
          </Button>
          {product.categories && (
            <CategoryBreadcrumbs categories={product.categories} />
          )}
        </div>
        <div className="grid grid-cols-1 small:grid-cols-2 py-8 w-full bg-primary-100/40">
          <ImageGallery images={product?.images || []} />
          <ProductActions product={product} />
        </div>
        <div className="content-container my-16 px-6 small:px-8 small:my-32">
          <RelatedProducts product={product} />
        </div>
      </div>
    </ProductProvider>
  )
}

export default ProductTemplate
