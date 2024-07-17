import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "components/customer/reducers/customerSlice";
import shippingReducer from "components/customer/reducers/shippingSlice";
import expoSlice from "components/dashboard/reducers/expoSlide";

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    shippings: shippingReducer,
    expos: expoSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
