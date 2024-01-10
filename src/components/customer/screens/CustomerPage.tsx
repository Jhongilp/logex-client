import { Outlet } from "react-router-dom";
import { StyledMain, StyledSubHeader, SunHeaderContent } from "styles/commons";
import { CustomerMenuList } from "components/customer/screens/CustomerMenuList";
import {
  StyledCustomerWrapper,
  StyledCustomerContent,
  StyledCustomerPageMain,
} from "components/customer/customer.styles";

export const CustomerPage = () => {
  return (
    <StyledMain>
      <StyledCustomerContent>
        <StyledCustomerWrapper>
          <StyledSubHeader>
            <SunHeaderContent>CUSTOMER NAME</SunHeaderContent>
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
