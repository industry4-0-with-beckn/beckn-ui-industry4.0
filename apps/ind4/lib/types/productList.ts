import { RetailItem, initItem } from './products'

export interface IProductList {
  productsList: RetailItem[] | []
}

export interface IProductListRootState {
  sortedProductsList: IProductList
}

export interface IInititemRootState {
  initDetail: any
}
