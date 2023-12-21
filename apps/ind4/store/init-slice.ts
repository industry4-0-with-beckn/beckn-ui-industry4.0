// initItemSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IInititemRootState } from '../lib/types/products'
interface InitItemState {
  initDetail: initItem | null
}

const initialState: InitItemState = {
  initDetail: null
}

const initItemSlice = createSlice({
  name: 'initItem',
  initialState,
  reducers: {
    setInitItem: (state, action: PayloadAction<initItem>) => {
      state.initDetail = action.payload
    }
  }
})

export const { setInitItem } = initItemSlice.actions
export const selectInitItem = (state: IInititemRootState) => state.initItem.initDetail
export default initItemSlice.reducer
