import { Outlet } from "react-router-dom";
import { useQuery } from "urql";
import { StyledMain, StyledSubHeader, SunHeaderContent } from "styles/commons";
import { CustomerMenuList } from "components/customer/screens/CustomerMenuList";
import { GetCustomerQuery } from "api/customer.api";

import {
  StyledCustomerWrapper,
  StyledCustomerContent,
  StyledCustomerPageMain,
} from "components/customer/customer.styles";

export const CustomerPage = () => {
  const [results] = useQuery({
    query: GetCustomerQuery,
    variables: { id: 1 },
  });

  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  console.log("get customer query: ", results);
  return (
    <StyledMain>
      <StyledCustomerContent>
        <StyledCustomerWrapper>
          <StyledSubHeader>
            <SunHeaderContent>{data?.customer?.name}</SunHeaderContent>
          </StyledSubHeader>
          <StyledCustomerPageMain>
            <CustomerMenuList />
            <Outlet />
          </StyledCustomerPageMain>
        </StyledCustomerWrapper>
      </StyledCustomerContent>
    </StyledMain>
  );
};
