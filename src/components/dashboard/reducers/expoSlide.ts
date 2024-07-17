import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ExpoStatus } from "types";

type ExpoReducer = {
  selectedStatus: null | ExpoStatus;
};

const initialState: ExpoReducer = {
  selectedStatus: null,
};

export const expoSlice = createSlice({
  name: "expos",
  initialState,
  reducers: {
    updateSelectedStatus: (state, action: PayloadAction<ExpoStatus>) => {
      console.log(
        "[reducer-expos] update action: ",
        action,
        state.selectedStatus
      );
      return {
        selectedStatus:
          state.selectedStatus === action.payload ? null : action.payload,
      };
    },
  },
});

export const { updateSelectedStatus } = expoSlice.actions;

export default expoSlice.reducer;
