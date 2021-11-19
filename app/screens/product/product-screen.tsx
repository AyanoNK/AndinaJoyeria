import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
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
  // const { productStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)

  // useEffect(() => {
  //   fetchProducts()
  // }, [])

  // const fetchProducts = () => {
  //   setRefreshing(true)
  //   productStore.getProducts()
  //   setRefreshing(false)
  // }

  // console.log(productStore.products)

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={HEADER_CONTAINER}>
        <Text preset="header" tx="productScreen.header" />
      </View>
    </Screen>
  )
})
