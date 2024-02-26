import { ProductProps } from '@/utils/data/products'

import { ProductCartProps } from '../cart-store'

export function add(
  products: ProductCartProps[],
  productToAdd: ProductProps,
): ProductCartProps[] {
  const productAlreadyExists = products.find(
    (item) => item.id === productToAdd.id,
  )

  if (productAlreadyExists) {
    const updatedProducts = products.map((product) => {
      return product.id === productAlreadyExists.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    })

    return updatedProducts
  }

  const updatedProducts = [...products, { ...productToAdd, quantity: 1 }]

  return updatedProducts
}

export function remove(
  products: ProductCartProps[],
  productId: string,
): ProductCartProps[] {
  const updatedProducts = products.map((product) =>
    product.id === productId
      ? {
          ...product,
          quantity: product.quantity > 1 ? product.quantity - 1 : 0,
        }
      : product,
  )

  return updatedProducts.filter((product) => product.quantity > 0)
}
