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
            <div>Customer page content here</div>
          </StyledCustomerPageMain>
        </StyledCustomerWrapper>
      </StyledCustomerContent>
    </StyledMain>
  );
};
