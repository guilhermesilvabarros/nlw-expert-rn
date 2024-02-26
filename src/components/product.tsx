import { Ref, forwardRef } from 'react'
import {
  Image,
  ImageRequireSource,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

type ProductDataProps = {
  title: string
  description: string
  thumbnail: ImageRequireSource
  quantity?: number
}

type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps
}

function ProductComponent(
  { data, ...rest }: ProductProps,
  ref: Ref<TouchableOpacity>,
) {
  return (
    <TouchableOpacity
      ref={ref}
      className="w-full flex-row items-center pb-4"
      activeOpacity={0.6}
      {...rest}
    >
      <Image
        className="h-20 w-20 rounded-md"
        source={data.thumbnail}
        alt={`${data.title} - thumbnail`}
      />

      <View className="ml-3 flex-1">
        <View className="flex-row items-center">
          <Text className="flex-1 font-subtitle text-base text-slate-100">
            {data.title}
          </Text>

          {data.quantity && (
            <Text className="font-subtitle text-sm text-lime-400">
              x{data.quantity}
            </Text>
          )}
        </View>

        <Text className="mt-0.5 font-body text-xs leading-5 text-slate-400">
          {data.description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export const Product = forwardRef(ProductComponent)
