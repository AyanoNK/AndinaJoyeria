import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SaleModel } from "../sale/sale"
import { withEnvironment } from "../extensions/with-environment"
import { Sale, SaleSnapshot } from ".."
import { flow } from "mobx"
import { GetSalesResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const SaleStoreModel = types
  .model("SaleStore")
  .props({
    sales: types.optional(types.array(SaleModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveSales: (saleSnapshots: SaleSnapshot[]) => {
      const saleModels: Sale[] = saleSnapshots.map((c) => SaleModel.create(c)) // create model instances from the plain objects
      self.sales.replace(saleModels) // Replace the existing data with the new data
    },
  }))
  .actions((self) => ({
    getSales: flow(function* () {
      const result: GetSalesResult = yield self.environment.api.getSales()

      if (result.kind === "ok") {
        self.saveSales(result.sales)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))
type SaleStoreType = Instance<typeof SaleStoreModel>
export interface SaleStore extends SaleStoreType {}
type SaleStoreSnapshotType = SnapshotOut<typeof SaleStoreModel>
export interface SaleStoreSnapshot extends SaleStoreSnapshotType {}
export const createSaleStoreDefaultModel = () => types.optional(SaleStoreModel, {})
