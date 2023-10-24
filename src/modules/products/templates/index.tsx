"use client"

import React, { useEffect, useRef, useState } from "react"
import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import RelatedProducts from "@modules/products/components/related-products"
import ImageGallery from "@modules/products/components/image-gallary"
import MobileActions from "@modules/products/components/mobile-actions"

import ProductActions from "../components/product-actions"
import { PricedProduct } from "@medusajs/client-types"

type ProductTemplateProps = {
  product: PricedProduct
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const info = useRef<HTMLDivElement>(null)
  const inView = useIntersection(info, "0px")
  console.log(product)

  return (
    <ProductProvider product={product}>
      <div className="content-container">
        <div className="grid grid-cols-1 small:grid-cols-2 py-8">
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
