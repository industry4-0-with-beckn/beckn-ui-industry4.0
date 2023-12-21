// initItemSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConfirmRootState, ConfirmItem } from '../lib/types/products'

interface ConfirmItemState {
  confirmDetail: ConfirmItem | null
}

const initialState: ConfirmItemState = {
  confirmDetail: null
}

const confirmItemSlice = createSlice({
  name: 'confirmItem',
  initialState,
  reducers: {
    setConfirmItem: (state, action: PayloadAction<ConfirmItem>) => {
      state.confirmDetail = action.payload
    }
  }
})

export const { setConfirmItem } = confirmItemSlice.actions
export const selectConfirmItem = (state: ConfirmRootState) => state.confirmItem.confirmDetail
export default confirmItemSlice.reducer
