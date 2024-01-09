import { useState } from "react";
import styled from "styled-components";
// import { useSelector } from "react-redux";

// import ExpoTable from "components/dashboard/screens/expo-table/ExpoTable";
import {
  StyledMain,
  StyledContent,
  ContentWrapper,
  StyledSubHeader,
  ButtonAct,
  SunHeaderContent,
} from "styles/commons";
import { Modal } from "styles/Modal/Modal";
import { CreateCustomerForm } from "components/customer/screens/CreateCustomerForm";
import { AddIcon } from "svgs";
import { Outlet } from "react-router-dom";

const Content = styled(StyledContent)`
  height: calc(100vh - 105px);
`;

const Wrapper = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

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
      <Content>
        <Wrapper>
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
          <Outlet />
        </Wrapper>
      </Content>
    </StyledMain>
  );
};

export default Customer;
