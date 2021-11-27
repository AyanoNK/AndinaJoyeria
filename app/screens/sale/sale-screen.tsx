import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, TextStyle, TouchableOpacity, View, ViewStyle, Linking } from "react-native"
import { Button, Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { Sale, useStores } from "../../models"
import { useNavigation, CommonActions } from "@react-navigation/core"

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
  paddingHorizontal: spacing.large,
}

const HEADER_CONTAINER: ViewStyle = {
  marginTop: spacing.huge,
  marginBottom: spacing.medium,
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
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.small,
}

const ACTION_BUTTON_STYLE: TextStyle = {
  paddingHorizontal: spacing.small,
}

const FLAT_LIST_STYLE = {
  maxHeight: "70%",
  borderRadius: 5,
}
export const SaleScreen = observer(function SaleScreen() {
  // Pull in one of our MST stores
  const { saleStore, productStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchSales()
  }, [])

  const fetchSales = () => {
    setRefreshing(true)
    saleStore.getSales()
    productStore.getProducts()
    setRefreshing(false)
  }

  const handleDeleteSale = (sale: Sale) => {
    saleStore.deleteSale(
      sale.id.split("/")[6],
      saleStore.sales.filter((s) => s.id !== sale.id),
    )
    fetchSales()
  }

  const copyToClipboard = (email: string) => {
    Linking.openURL(`mailto:${email}`)
  }

  const renderSale = ({ item }) => {
    const sale: Sale = item

    const relatedProduct = productStore.products.find((product) => product.id === sale.items[0])
    return (
      <View style={LIST_ITEM_CONTAINER}>
        <View style={LIST_TEXT_CONTAINER}>
          <View style={LIST_LABEL_CONTAINER}>
            <Text text={`Venta del artículo: ${relatedProduct.name}`} />
            <Text text={`ID ${sale.id.split("/")[6]}`} preset="secondary" />
            <Text text={`$${sale.total}`} preset="secondary" />
            <TouchableOpacity onPress={() => copyToClipboard(sale.client_email)}>
              <Text text={`a: ${sale.client_email}`} preset="secondary" />
            </TouchableOpacity>
          </View>
        </View>
        <Button
          tx="saleScreen.edit"
          onPress={() => saleFormScreen(sale)}
          style={ACTION_BUTTON_STYLE}
          disabled
        />
        <Button
          tx="saleScreen.delete"
          style={{ ...ACTION_BUTTON_STYLE, backgroundColor: color.palette.angry }}
          onPress={() => handleDeleteSale(sale)}
        />
      </View>
    )
  }

  // Pull in navigation via hook
  const navigation = useNavigation()
  const saleFormScreen = (thisSale) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: "saleForm",
        params: {
          sale: thisSale.id,
        },
      }),
    )
  }
  const productScreen = () =>
    navigation.dispatch(
      CommonActions.navigate({
        name: "product",
      }),
    )

  const previousScreen = () =>
    navigation.dispatch(
      CommonActions.navigate({
        name: "welcome",
      }),
    )

  return (
    <Screen style={ROOT} preset="fixed">
      <View style={HEADER_CONTAINER}>
        <View style={HEADER_CONTAINER}>
          <Text preset="header" tx="saleScreen.header" />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        {saleStore.sales.length > 0 ? (
          <FlatList
            data={saleStore.sales}
            renderItem={renderSale}
            keyExtractor={(item) => item.id}
            onRefresh={fetchSales}
            refreshing={refreshing}
            style={FLAT_LIST_STYLE}
          />
        ) : (
          <Text tx="saleScreen.noData" />
        )}

        <View style={{ height: "10%" }}>
          <View style={{ flex: 1, justifyContent: "space-evenly" }}>
            <Button testID="next-screen-button" tx="saleScreen.add" onPress={saleFormScreen} />
            <Button
              testID="next-screen-button"
              style={{ marginTop: 30 }}
              tx="saleScreen.return"
              onPress={previousScreen}
            />
            <Button
              testID="next-screen-button"
              tx="saleScreen.seeProducts"
              style={{ marginTop: 30 }}
              onPress={productScreen}
            />
          </View>
        </View>
      </View>
    </Screen>
  )
})
