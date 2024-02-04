import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { ShippingsTable } from "components/customer/shippings/screens/shipping-table/ShippingsTable";
import { Modal } from "styles/Modal/Modal";
import { ButtonActionIcon } from "styles/commons";
import { CreateShippingForm } from "components/customer/shippings/screens/create-shipping-form/CreateShippingForm";

import { AddIcon } from "svgs";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* width: fit-content; */
  overflow-y: auto;
`;

export const ShippingList = () => {
  const { customerId } = useParams();
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Modal open={isOpen} full>
        <CreateShippingForm
          onClose={() => setOpen(false)}
          customerId={customerId}
        />
      </Modal>
      <ButtonActionIcon
        type="button"
        onClick={() => setOpen(true)}
        $width={200}
      >
        <AddIcon />
        <span>SHIPPING</span>
      </ButtonActionIcon>
      <ShippingsTable customerId={customerId} />
    </>
  );
};

export const Shippings = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};
