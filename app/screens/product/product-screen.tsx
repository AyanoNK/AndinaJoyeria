import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { Product, Sale, useStores } from "../../models"
import { color, spacing } from "../../theme"
import { CommonActions, useNavigation } from "@react-navigation/core"

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
  const { productStore, saleStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchProducts()
    fetchSales()
  }, [])

  const fetchProducts = () => {
    setRefreshing(true)
    productStore.getProducts()
    setRefreshing(false)
  }
  const fetchSales = () => {
    setRefreshing(true)
    saleStore.getSales()
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
  const renderSale = ({ item }) => {
    const sale: Sale = item
    return (
      <View>
        <Text text={sale.client_email} />
      </View>
    )
  }

  const navigation = useNavigation()

  const previousScreen = () => navigation.dispatch(CommonActions.goBack())
  const productFormScreen = () =>
    navigation.dispatch(
      CommonActions.navigate({
        name: "productForm",
      }),
    )
  // Pull in navigation via hook
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
      <Button testID="next-screen-button" tx="productScreen.return" onPress={previousScreen} />
      <Button
        testID="next-screen-button"
        style={{ marginTop: 30 }}
        tx="productScreen.add"
        onPress={productFormScreen}
      />
    </Screen>
  )
})
