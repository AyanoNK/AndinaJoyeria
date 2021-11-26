import React from "react"
import { observer } from "mobx-react-lite"
import { TextInput, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useNavigation, CommonActions } from "@react-navigation/core"
import { Controller, useForm } from "react-hook-form"
import { translate } from "../../i18n"
import { useStores } from "../../models"

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

export const ProductFormScreen = observer(function ProductFormScreen() {
  // Pull in one of our MST stores
  const { productStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const previousScreen = () => navigation.dispatch(CommonActions.goBack())

  const SaleScreen = () =>
    navigation.dispatch(
      CommonActions.navigate({
        name: "sale",
      }),
    )

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    await productStore.postProduct(data).then(() => SaleScreen())
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <View style={HEADER_CONTAINER}>
        <Text preset="header" tx="productScreen.header" />
      </View>
      <Text preset="header" tx="productScreen.productName" />

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
            placeholder={translate("productScreen.productName")}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name && <Text>Este texto es requerido.</Text>}

      <Text preset="header" tx="productScreen.productPicture" />

      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={INPUT_CONTAINER}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={translate("productScreen.productPicture")}
            value={value}
          />
        )}
        name="picture"
      />

      <Text preset="header" tx="productScreen.productPrice" />

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
            placeholder={translate("productScreen.productPrice")}
            value={value}
            keyboardType="numeric"
          />
        )}
        name="price"
      />
      {errors.price && <Text>Este texto es requerido.</Text>}

      <Text preset="header" tx="productScreen.productStock" />

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
            placeholder={translate("productScreen.productStock")}
            value={value}
            keyboardType="numeric"
          />
        )}
        name="stock"
      />
      {errors.stock && <Text>Este texto es requerido.</Text>}

      <Button
        textStyle={{ fontSize: 16 }}
        style={{ marginTop: 15 }}
        tx="productScreen.return"
        onPress={previousScreen}
      />
      <Button
        textStyle={{ fontSize: 16 }}
        style={{ marginTop: 30 }}
        tx="productScreen.add"
        onPress={handleSubmit(onSubmit)}
      />
    </Screen>
  )
})
