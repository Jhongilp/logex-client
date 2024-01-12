import { useState } from "react";

import {
  StyledMain,
  StyledSubHeader,
  ButtonActionIcon,
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
              <ButtonActionIcon type="button" onClick={() => setOpen(true)}>
                <AddIcon />
                <span>CLIENTE</span>
              </ButtonActionIcon>
            </SunHeaderContent>
          </StyledSubHeader>
          <h2>CLIENTES</h2>
          <CustomerTable />
        </StyledCustomerWrapper>
      </StyledCustomerContent>
    </StyledMain>
  );
};

export default Customer;
