import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { Product, ProductSnapshot, Sale, SaleSnapshot } from "../../models"

const convertProduct = (raw: any): ProductSnapshot => {
  const rawFields = raw.fields
  return {
    id: raw.name,
    name: rawFields.name.stringValue,
    price: +rawFields.price.integerValue,
    stock: +rawFields.stock.integerValue,
    picture: rawFields.picture.stringValue,
  }
}
const convertSale = (raw: any): SaleSnapshot => {
  const rawFields = raw.fields

  return {
    id: raw.name,
    items: rawFields.product.arrayValue.values.map(
      (product) => product.mapValue.fields.item.referenceValue,
    ),
    client_email: rawFields.client_email.stringValue,
    total: +rawFields.total.integerValue,
  }
}

const prepareProduct = (product: any) => {
  return {
    fields: {
      name: {
        stringValue: product.name,
      },
      picture: {
        stringValue: product.picture
          ? product.picture
          : "https://scontent.fbog3-1.fna.fbcdn.net/v/t1.18169-9/13255908_1209844265692314_2149408519842123103_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeGwwoObNhQGl36hDDc6_yFLCiVZ0rCXgiEKJVnSsJeCIXgZx7G0PHrCJcFklReonCPbrJG9QJkFbHNJV_gnOTEG&_nc_ohc=eIzv4552eDYAX-v-oMj&_nc_ht=scontent.fbog3-1.fna&oh=6a333082ab18beaeda2e87269a41367a&oe=61B8B42B",
      },
      price: {
        integerValue: parseInt(product.price, 10),
      },
      stock: {
        integerValue: parseInt(product.stock, 10),
      },
    },
  }
}
const prepareSale = (sale: any) => {
  const total = sale.items.reduce((total, item) => total + item.price, 0)

  const dataModeler = {
    fields: {
      client_email: {
        stringValue: sale.client_email,
      },
      product: {
        arrayValue: {
          values: [],
        },
      },
      total: {
        integerValue: total,
      },
    },
  }

  sale.items.forEach((item) =>
    dataModeler.fields.product.arrayValue.values.push({
      mapValue: {
        fields: {
          item: { referenceValue: item.id },
          quantity: {
            integerValue: "1",
          },
        },
      },
    }),
  )

  console.tron.log(dataModeler)
  return dataModeler
}

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getProducts(): Promise<Types.GetProductsResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get("/product")
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawProducts = response.data.documents
      const resultProducts: ProductSnapshot[] = rawProducts.map(convertProduct)
      return { kind: "ok", products: resultProducts }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async postProduct(data: Product): Promise<Types.GetProductsResult> {
    // make the api call
    const convertedProduct = prepareProduct(data)
    const response: ApiResponse<any> = await this.apisauce.post("/product", convertedProduct)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawProducts = response.data.documents
      const resultProducts: ProductSnapshot[] = rawProducts.map(convertProduct)
      return { kind: "ok", products: resultProducts }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getSales(): Promise<Types.GetSalesResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get("/sale")
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawSales = response.data.documents
      const resultSales: SaleSnapshot[] = rawSales.map(convertSale)
      return { kind: "ok", sales: resultSales }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async postSale(data: Sale): Promise<Types.GetSalesResult> {
    // make the api call
    const convertedSale = prepareSale(data)
    const response: ApiResponse<any> = await this.apisauce.post("/sale", convertedSale)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawSales = response.data.documents
      const resultSales: SaleSnapshot[] = rawSales.map(convertSale)
      return { kind: "ok", sales: resultSales }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = (raw) => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
