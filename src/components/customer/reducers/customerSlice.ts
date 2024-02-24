import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "store";
import { ICliente } from "types";

// interface CustomerState {
//   customers: ICliente[];
// }

// const initialState: CustomerState = {
//   customers: [],
// };
const initialState: ICliente[] = []

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    updateCustomers: (_state, action: PayloadAction<ICliente[]>) => {
      console.log("[reducer-customers] update action: ", action)
      return [...action.payload]
    },
  },
});

export const { updateCustomers } = customerSlice.actions;

export default customerSlice.reducer;
