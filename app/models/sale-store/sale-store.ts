import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const SaleStoreModel = types
  .model("SaleStore")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type SaleStoreType = Instance<typeof SaleStoreModel>
export interface SaleStore extends SaleStoreType {}
type SaleStoreSnapshotType = SnapshotOut<typeof SaleStoreModel>
export interface SaleStoreSnapshot extends SaleStoreSnapshotType {}
export const createSaleStoreDefaultModel = () => types.optional(SaleStoreModel, {})
