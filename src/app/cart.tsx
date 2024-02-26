import { Feather } from '@expo/vector-icons'
import { Link, useNavigation } from 'expo-router'
import { useState } from 'react'
import { Alert, Linking, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button } from '@/components/button'
import { Header } from '@/components/header'
import { Input } from '@/components/input'
import { LinkButton } from '@/components/link-button'
import { Product } from '@/components/product'
import { ProductCartProps, useCartStore } from '@/stores/cart-store'
import { formatToCurrency } from '@/utils/functions/format-to-currency'

const PHONE_NUMBER = process.env.EXPO_PUBLIC_PHONE_NUMBER

export default function Cart() {
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const cartStore = useCartStore()
  const navigation = useNavigation()

  const total = formatToCurrency(
    cartStore.products.reduce((total, product) => {
      return product.price * product.quantity + total
    }, 0),
  )

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert('Remover', `Deseja remover ${product.title} do carrinho?`, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Remover',
        onPress: () => cartStore.remove(product.id),
      },
    ])
  }

  function handleOrder() {
    if (deliveryAddress.trim().length === 0) {
      return Alert.alert('Pedido', 'Informe o endereço de entrega.')
    }

    const productsToOrder = cartStore.products
      .map((product) => `\n${product.quantity} ${product.title}`)
      .join(';')

    const message = `🍔 NOVO PEDIDO! \n\nEntregar em: ${deliveryAddress} \n${productsToOrder} \n\nValor total: ${total}`

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`,
    )

    cartStore.clear()
    return navigation.goBack()
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={180}
      >
        <View className="flex-1 p-5">
          {cartStore.products.length > 0 ? (
            <>
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => {
                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      asChild
                    >
                      <Product
                        onLongPress={() => handleProductRemove(product)}
                        data={product}
                      />
                    </Link>
                  )
                })}
              </View>

              <View className="mb-4 mt-5 flex-row items-center gap-2 pt-4">
                <Text className="font-subtitle text-xl text-white">Total:</Text>
                <Text className="font-heading text-2xl text-lime-400">
                  {total}
                </Text>
              </View>

              <Input
                value={deliveryAddress}
                onChangeText={setDeliveryAddress}
                onSubmitEditing={handleOrder}
                blurOnSubmit={true}
                enablesReturnKeyAutomatically={true}
                returnKeyType="next"
                placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
              />
            </>
          ) : (
            <Text className="my-8 text-center font-body text-slate-400">
              Seu carrinho está vazio.
            </Text>
          )}
        </View>
      </KeyboardAwareScrollView>

      <View className="gap-5 p-5">
        <Button
          disabled={cartStore.products.length === 0}
          style={cartStore.products.length === 0 && { opacity: 0.5 }}
          onPress={handleOrder}
        >
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  )
}
