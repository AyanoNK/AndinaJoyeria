import React, { useEffect, FC } from "react"
import { FlatList, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Header,
  Screen,
  Text,
  AutoImage as Image,
  GradientBackground,
  Button,
} from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"
import { TextInput } from "react-native-gesture-handler"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const CONTAINER_TEXT: TextStyle = {
  marginBottom: 5,
  marginTop: 5,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}

export const DemoListScreen: FC<StackScreenProps<NavigatorParamList, "demoList">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    useEffect(() => {
      async function fetchData() {
        // await characterStore.getCharacters()
      }

      fetchData()
    }, [])

    return (
      <View testID="DemoListScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="demoListScreen.title"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View style={CONTAINER}>
            <Text text="Producto 1" style={CONTAINER_TEXT} />
          </View>
          <View style={CONTAINER}>
            <Text text="Producto 2" style={CONTAINER_TEXT} />
          </View>
          <View style={CONTAINER}>
            <Text text="Producto 3" style={CONTAINER_TEXT} />
          </View>
          <View style={CONTAINER}>
            <Text text="Producto 4" style={CONTAINER_TEXT} />
          </View>
          <View style={CONTAINER}>
            <Text text="Producto 5" style={CONTAINER_TEXT} />
          </View>
          <View style={CONTAINER}>
            <Text text="Producto 6" style={CONTAINER_TEXT} />
          </View>
          <Button>
            <Text text="Agregar producto" style={CONTAINER_TEXT} />
          </Button>
        </Screen>
      </View>
    )
  },
)
