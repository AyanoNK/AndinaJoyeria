import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
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

export const SaleScreen = observer(function SaleScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { saleStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchSales()
  }, [])

  const fetchSales = () => {
    setRefreshing(true)
    saleStore.getSales()
    setRefreshing(false)
  }

  const renderSale = ({ item }) => {
    const sale: Sale = item
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ width: "80%" }}>
          <Text text={`${sale.total.toString()} a ${sale.client_email}`} />
        </View>
        <View style={{ width: "20%" }}>
          <Button
            testID="next-screen-button"
            tx="saleScreen.edit"
            onPress={() => saleFormScreen(item)}
          />
        </View>
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

  const previousScreen = () => navigation.dispatch(CommonActions.goBack())

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={HEADER_CONTAINER}>
        <View style={HEADER_CONTAINER}>
          <Text preset="header" tx="saleScreen.header" />
        </View>
        <FlatList
          data={saleStore.sales}
          renderItem={renderSale}
          keyExtractor={(item) => item.id}
          onRefresh={fetchSales}
          refreshing={refreshing}
        />
      </View>
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
    </Screen>
  )
})
