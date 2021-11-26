import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useNavigation, CommonActions, useRoute } from "@react-navigation/core"
import { useStores } from "../../models"
import { Controller, useForm } from "react-hook-form"
import { translate } from "../../i18n"
import { Picker } from "@react-native-picker/picker"

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
  marginBottom: spacing.medium,
}

export const SaleFormScreen = observer(function SaleFormScreen() {
  // Pull in one of our MST stores
  const { productStore, saleStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const route = useRoute()
  const param = route.params

  const previousScreen = () => navigation.dispatch(CommonActions.goBack())

  const getProductDetails = (id: string) => {
    return productStore.products.find((product) => product.id === id)
  }
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    productStore.getProducts()
    if ("sale" in param) {
      const sale = saleStore.sales.find((sale) => sale.id === param["sale"])
      if (sale) {
        setValue("items", sale.items)
        setValue("client_email", sale.client_email)
        setValue("total", sale.total)
      }
    }
  }, [])

  const onSubmit = async (data) => {
    if ("sale" in param) {
      await saleStore.updateSale(param["sale"].split("/").at(-1), data).then(() => previousScreen())
    } else {
      await saleStore.postSale(data).then(() => previousScreen())
    }
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <View style={HEADER_CONTAINER}>
        <Text preset="header" tx="saleScreen.header" />
      </View>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Picker
            style={{ marginVertical: spacing.medium }}
            onValueChange={(va) => {
              const newValue = getProductDetails(va.toString())
              setValue("items", [newValue])
            }}
          >
            {productStore.products.map((product) => (
              <Picker.Item label={`${product.name} $${product.price}`} value={product.id} />
            ))}
          </Picker>
        )}
        name="items"
      />

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

      <Button
        style={{ marginBottom: spacing.medium }}
        tx="saleScreen.return"
        textStyle={{ fontSize: 16 }}
        onPress={previousScreen}
      />

      <Button textStyle={{ fontSize: 16 }} tx="saleScreen.add" onPress={handleSubmit(onSubmit)} />
    </Screen>
  )
})
