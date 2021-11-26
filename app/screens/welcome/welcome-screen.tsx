import React, { FC } from "react"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
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
  marginVertical: spacing[5],
  maxWidth: "50%",
  width: "100%",
  height: 300,
}

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const nextScreen = () => navigation.navigate("sale")

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <Image source={WelcomePNG} style={BOWSER} />

        <Button
          testID="next-screen-button"
          style={CONTINUE}
          textStyle={CONTINUE_TEXT}
          tx="welcomeScreen.continue"
          onPress={nextScreen}
        />
      </View>
    )
  },
)
