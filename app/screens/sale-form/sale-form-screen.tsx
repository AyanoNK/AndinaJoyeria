import React from "react"
import { observer } from "mobx-react-lite"
import { TextInput, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useNavigation, CommonActions } from "@react-navigation/core"
import { useStores } from "../../models"
import { Controller, useForm } from "react-hook-form"
import { translate } from "../../i18n"

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
  paddingHorizontal: spacing.large,
}

const HEADER_CONTAINER: ViewStyle = {
  marginTop: spacing.huge,
  marginBottom: spacing.medium,
}

const INPUT_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
}

export const SaleFormScreen = observer(function SaleFormScreen() {
  // Pull in one of our MST stores
  const { productStore, saleStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const previousScreen = () => navigation.dispatch(CommonActions.goBack())

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    await productStore.postProduct(data).then(() => previousScreen())
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={HEADER_CONTAINER}>
        <Text preset="header" tx="saleScreen.header" />
      </View>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={INPUT_CONTAINER}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={translate("saleScreen.clientEmail")}
            value={value}
          />
        )}
        name="client_email"
      />
      {errors.client_email && <Text>Este texto es requerido.</Text>}

      <Button testID="next-screen-button" tx="saleScreen.return" onPress={previousScreen} />

      <Button testID="next-screen-button" tx="saleScreen.add" onPress={handleSubmit(onSubmit)} />
    </Screen>
  )
})
