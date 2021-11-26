import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ImageStyle, View, ViewStyle } from "react-native"
import { AutoImage, Button, Icon, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { Product, useStores } from "../../models"
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
  display: "flex",
  flexDirection: "row",
}

const LIST_ITEM_CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  backgroundColor: color.palette.darkBlue,
  marginVertical: spacing.small,
  borderRadius: spacing.small,
}

const LIST_TEXT_CONTAINER: ViewStyle = {
  width: "80%",
  flex: 1,
  justifyContent: "center",
}

const LIST_LABEL_CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: "column",
}

const LIST_IMAGE_CONTAINER: ViewStyle = {
  width: "20%",
}

const IMAGE_BORDER: ViewStyle = {
  width: 55,
  height: 55,
  padding: 5,
  borderWidth: 1,
  borderColor: color.palette.white,
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 5,
}

const IMAGE_STYLE: ImageStyle = {
  width: 40,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  height: 40,
  resizeMode: "contain",
}

const FLAT_LIST_STYLE = {
  maxHeight: "70%",
  borderRadius: 5,
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
      <View style={LIST_ITEM_CONTAINER}>
        <View style={LIST_IMAGE_CONTAINER}>
          <View style={IMAGE_BORDER}>
            <AutoImage source={{ uri: product.picture }} style={IMAGE_STYLE} />
          </View>
        </View>

        <View style={LIST_TEXT_CONTAINER}>
          <View style={LIST_LABEL_CONTAINER}>
            <Text text={product.name} preset="bold" />
            <Text text={`ID ${product.id.split("/")[6]}`} preset="secondary" />
            <Text text={`$${product.price}`} preset="secondary" />
            <Text text={`${product.stock} en inventario`} preset="secondary" />
          </View>
        </View>
      </View>
    )
  }

  const navigation = useNavigation()

  const previousScreen = () =>
    navigation.dispatch(
      CommonActions.navigate({
        name: "sale",
      }),
    )
  const productFormScreen = () =>
    navigation.dispatch(
      CommonActions.navigate({
        name: "productForm",
      }),
    )
  // Pull in navigation via hook
  return (
    <Screen style={ROOT} preset="fixed">
      <View style={HEADER_CONTAINER}>
        <View>
          <Text preset="header" tx="productScreen.header" />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        {productStore.products.length > 0 ? (
          <FlatList
            data={productStore.products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            onRefresh={fetchProducts}
            refreshing={refreshing}
            style={FLAT_LIST_STYLE}
          />
        ) : (
          <Text text="No hay productos" />
        )}
        <View style={{ height: "10%" }}>
          <View style={{ flex: 1, justifyContent: "space-evenly" }}>
            <Button
              testID="next-screen-button"
              tx="productScreen.return"
              onPress={previousScreen}
            />
            <Button
              testID="next-screen-button"
              style={{ marginTop: 30 }}
              tx="productScreen.add"
              onPress={productFormScreen}
            />
          </View>
        </View>
      </View>
    </Screen>
  )
})
