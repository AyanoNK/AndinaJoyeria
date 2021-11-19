import { flow } from "mobx"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Product, ProductModel, ProductSnapshot } from "../product/product"
import { withEnvironment } from "../extensions/with-environment"
import { GetProductsResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const ProductStoreModel = types
  .model("ProductStore")
  .props({
    products: types.optional(types.array(ProductModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveProducts: (productSnapshots: ProductSnapshot[]) => {
      const productModels: Product[] = productSnapshots.map((c) => ProductModel.create(c)) // create model instances from the plain objects
      self.products.replace(productModels) // Replace the existing data with the new data
    },
  }))
  .actions((self) => ({
    getProducts: flow(function* () {
      const result: GetProductsResult = yield self.environment.api.getProducts()
      if (result.kind === "ok") {
        self.saveProducts(result.products)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))

type ProductStoreType = Instance<typeof ProductStoreModel>
export interface ProductStore extends ProductStoreType {}
type ProductStoreSnapshotType = SnapshotOut<typeof ProductStoreModel>
export interface ProductStoreSnapshot extends ProductStoreSnapshotType {}
export const createProductStoreDefaultModel = () => types.optional(ProductStoreModel, {})
