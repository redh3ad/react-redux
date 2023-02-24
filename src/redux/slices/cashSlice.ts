import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICashSlice {
  cash: number;
}

const initialState: ICashSlice = {
  cash: 0,
};

export const cashSlice = createSlice({
  name: 'cash',
  initialState,
  reducers: {
    addCash(state, action: PayloadAction<number>) {
      state.cash = state.cash + action.payload;
    },
    getCash(state, action: PayloadAction<number>) {
      state.cash = state.cash - action.payload;
    },
  },
});

export const selectCash = (state: RootState) => state.cash;

export const { addCash, getCash } = cashSlice.actions;

export default cashSlice.reducer;
