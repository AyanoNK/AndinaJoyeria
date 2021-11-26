import React, { FC } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  SafeAreaView,
  TouchableOpacity,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

const WelcomePNG = require("./welcome.jpg")

const FULL: ViewStyle = { flex: 1, backgroundColor: color.background, justifyContent: "center" }

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const BOWSER: ImageStyle = {
  alignSelf: "center",
  width: "100%",
  height: 720,
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const nextScreen = () => navigation.navigate("sale")

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <TouchableOpacity onPress={nextScreen}>
          <Image source={WelcomePNG} style={BOWSER} />
        </TouchableOpacity>
      </View>
    )
  },
)
