import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
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
export const SaleFormScreen = observer(function SaleFormScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const previousScreen = () => navigation.dispatch(CommonActions.goBack())

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={HEADER_CONTAINER}>
        <View style={HEADER_CONTAINER}>
          <Text preset="header" tx="saleScreen.header" />
        </View>
      </View>
      <Button testID="next-screen-button" tx="productScreen.return" onPress={previousScreen} />
    </Screen>
  )
})
