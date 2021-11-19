import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const SaleModel = types
  .model("Sale")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type SaleType = Instance<typeof SaleModel>
export interface Sale extends SaleType {}
type SaleSnapshotType = SnapshotOut<typeof SaleModel>
export interface SaleSnapshot extends SaleSnapshotType {}
export const createSaleDefaultModel = () => types.optional(SaleModel, {})
