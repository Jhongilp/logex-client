import { useAppDispatch } from "hooks/store.hooks";
import { useSubscription } from "urql";
import { updateCustomers } from "components/customer/reducers/customerSlice";
import { onCustomerUpdates } from "api";

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
};
