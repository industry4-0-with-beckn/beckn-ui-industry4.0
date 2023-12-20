// initDetailsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initItem } from '../lib/types/products'

interface InitDetailsState {
  initDetails: initItem | null
}

const initialState: InitDetailsState = {
  initDetails: null
}

const initDetailsSlice = createSlice({
  name: 'initDetails',
  initialState,
  reducers: {
    setInitDetails: (state, action: PayloadAction<initItem>) => {
      state.initDetails = action.payload
    },
    clearInitDetails: state => {
      state.initDetails = null
    }
  }
})

export const initDetailsActions = initDetailsSlice.actions
export default initDetailsSlice.reducer
