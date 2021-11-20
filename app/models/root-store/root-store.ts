import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ProductStoreModel, ProductStore } from "../product-store/product-store"
import { SaleStore, SaleStoreModel } from "../sale-store/sale-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  productStore: types.optional(ProductStoreModel, {} as ProductStore),
  saleStore: types.optional(SaleStoreModel, {} as SaleStore),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
