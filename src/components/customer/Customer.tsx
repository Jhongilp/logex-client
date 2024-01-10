import { useState } from "react";
import styled from "styled-components";
// import { useSelector } from "react-redux";

// import ExpoTable from "components/dashboard/screens/expo-table/ExpoTable";
import {
  StyledMain,
  StyledSubHeader,
  ButtonAct,
  SunHeaderContent,
} from "styles/commons";
import {
  StyledCustomerWrapper,
  StyledCustomerContent,
} from "components/customer/customer.styles";
import { Modal } from "styles/Modal/Modal";
import { CreateCustomerForm } from "components/customer/screens/create-customer-form/CreateCustomerForm";
import { AddIcon } from "svgs";
import { CustomerTable } from "components/customer/screens/CustomerTable";

const AddCustomerBtn = styled(ButtonAct)`
  padding: 0 12px 0 6px;
  > svg {
    margin-right: 6px;
    fill: var(--color-main);
  }
`;

const Customer = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <StyledMain>
      <StyledCustomerContent>
        <StyledCustomerWrapper>
          <StyledSubHeader>
            <Modal open={isOpen} full>
              <CreateCustomerForm onClose={() => setOpen(false)} />
            </Modal>
            <SunHeaderContent>
              <AddCustomerBtn onClick={() => setOpen(true)}>
                <AddIcon />
                <span>CLIENTE</span>
              </AddCustomerBtn>
            </SunHeaderContent>
          </StyledSubHeader>
          <h2>CLIENTES</h2>
          {/* <Outlet /> */}
          <CustomerTable />
        </StyledCustomerWrapper>
      </StyledCustomerContent>
    </StyledMain>
  );
};

export default Customer;
