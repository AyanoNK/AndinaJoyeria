import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { Product, useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
  paddingHorizontal: spacing.large,
}

const HEADER_CONTAINER: ViewStyle = {
  marginTop: spacing.huge,
  marginBottom: spacing.medium,
}

export const ProductScreen = observer(function ProductScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { productStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    setRefreshing(true)
    productStore.getProducts()
    setRefreshing(false)
  }

  const renderProduct = ({ item }) => {
    const product: Product = item
    return (
      <View>
        <Text text={product.name} />
      </View>
    )
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={HEADER_CONTAINER}>
        <Text preset="header" tx="productScreen.header" />
      </View>
      <FlatList
        data={productStore.products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        onRefresh={fetchProducts}
        refreshing={refreshing}
      />
    </Screen>
  )
})
