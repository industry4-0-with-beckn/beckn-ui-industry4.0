import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ProductDetails from '../components/productDetails'
import { RetailItem } from '../lib/types/products'
import { fromBinary } from '../utilities/common-utils'

const Product = () => {
  const router = useRouter()
  const { productDetails } = router.query
  const [product, setProduct] = useState<RetailItem | null>(null)

  useEffect(() => {
    if (productDetails) {
      setProduct(JSON.parse(fromBinary(window.atob(productDetails as string))))
    }
  }, [productDetails])

  if (!product) {
    return <></>
  }

  return <ProductDetails product={product} />
}

export default Product
