import { useAppDispatch } from "hooks/store.hooks";
import { useSubscription } from "urql";
import { updateCustomers } from "components/customer/reducers/customerSlice";
import { shippingActions } from "components/customer/reducers/shippingSlice";

import { onCustomerUpdates, onShippingUpdates } from "api";

export const useInitializeSubscriptions = () => {
  const dispatch = useAppDispatch();
  useSubscription({ query: onCustomerUpdates }, (_, response) => {
    if (response?.customers) {
      console.log(
        "[customers] dispatching from subscription",
        response?.customers
      );
      dispatch(updateCustomers(response?.customers));
    }
  });

  useSubscription({ query: onShippingUpdates }, (_, response) => {
    console.log("[shippings] subs, res: ", response);
    if (response?.shippings) {
      console.log(
        "[shippings] dispatching from subscription",
        response?.shippings
      );
      dispatch(shippingActions.addAll(response?.shippings));
    }
  });
};
