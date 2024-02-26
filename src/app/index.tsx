import { Link } from 'expo-router'
import { useState, useRef } from 'react'
import { View, FlatList, SectionList, Text } from 'react-native'

import { CategoryButton } from '@/components/category-button'
import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { useCartStore } from '@/stores/cart-store'
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES.at(0))
  const sectionListRef = useRef<SectionList<ProductProps>>(null)
  const cartStore = useCartStore()

  const cartItemsAmount = cartStore.products.reduce((amount, product) => {
    return amount + product.quantity
  }, 0)

  function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory,
    )

    if (!sectionListRef.current) {
      return
    }

    sectionListRef.current.scrollToLocation({
      animated: true,
      sectionIndex,
      itemIndex: 0,
      viewOffset: -20,
    })
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartItemsAmount={cartItemsAmount} />

      <FlatList
        className="mt-5 max-h-10"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => item}
        data={CATEGORIES}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelected(item)}
          />
        )}
      />

      <SectionList
        ref={sectionListRef}
        className="flex-1 p-5"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section }) => (
          <Text className="mb-3  mt-8 font-heading text-xl text-white">
            {section.title}
          </Text>
        )}
      />
    </View>
  )
}
