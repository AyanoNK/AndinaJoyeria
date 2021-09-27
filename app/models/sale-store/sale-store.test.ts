import { SaleStoreModel } from "./sale-store"

test("can be created", () => {
  const instance = SaleStoreModel.create({})

  expect(instance).toBeTruthy()
})
