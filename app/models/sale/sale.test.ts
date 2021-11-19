import { SaleModel } from "./sale"

test("can be created", () => {
  const instance = SaleModel.create({})

  expect(instance).toBeTruthy()
})
