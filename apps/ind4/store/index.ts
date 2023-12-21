import { configureStore } from '@reduxjs/toolkit'
import specialOfferProductsReducer from './specialOfferProducts-slice'
import newestProductReducer from './newestProduct-slice'
import SortedProductsListReducer from './sortedProductList-slice'
import cartUiReducer from './cartUI-slice'
import cartSliceReducer from './cart-slice'
import userInfoReducer from './user-slice'
import sideNavBarReducer from './sideNavBar-slice'
import megaMenuReducer from './megaMenu-slice'
import activeMenuItemReducer from './activeMenuItem-slice'
import settingBoxReducer from './settingBox-slice'
import scholarshipCartReducer from './scholarshipCart-slice'
import favoriteReducer from './favorite-slice'
import responseDataReducer from './responseData-slice'
import initItemReducer from './init-slice'
import confirmItemReducer from './confirm-slice'

const store = configureStore({
  reducer: {
    specialOfferProductsList: specialOfferProductsReducer,
    newestProductsList: newestProductReducer,
    sortedProductsList: SortedProductsListReducer,
    cartUi: cartUiReducer,
    cart: cartSliceReducer,
    userInfo: userInfoReducer,
    sideNavBar: sideNavBarReducer,
    megaMenu: megaMenuReducer,
    activeMenuItem: activeMenuItemReducer,
    settingBox: settingBoxReducer,
    favorite: favoriteReducer,
    transactionId: responseDataReducer,
    quoteResponse: responseDataReducer,
    customerDetails: responseDataReducer,
    initResponse: responseDataReducer,
    scholarshipCart: scholarshipCartReducer,
    initItem: initItemReducer,
    confirmItem: confirmItemReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store
