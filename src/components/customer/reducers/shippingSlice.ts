import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IShipping } from "types";

const initialState: IShipping[] = [];

export const shippingSlice = createSlice({
  name: "shippings",
  initialState,
  reducers: {
    addAll: (_state, action: PayloadAction<IShipping[]>) => {
      // console.log("[reducer-shippings] update action: ", action)
      return [...action.payload];
    },
    add: (state, action: PayloadAction<IShipping>) => {
      // console.log("[reducer-shippings] update action: ", action)
      return [...state, action.payload];
    },
  },
});

export const shippingActions = { ...shippingSlice.actions };

export default shippingSlice.reducer;
