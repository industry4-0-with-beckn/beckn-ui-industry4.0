import { RetailItem, initItem } from './products'

export interface IProductList {
  productsList: RetailItem[] | []
}

export interface IProductListRootState {
  sortedProductsList: IProductList
}

// export interface IInitItems {
//   item: initItem | any
// }

// export interface IInititemRootState {
//   initDetail: IInitItems
// }
