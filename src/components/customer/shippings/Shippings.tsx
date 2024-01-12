import { useState } from "react";
import styled from "styled-components";
import { ShippingsTable } from "components/customer/shippings/screens/ShippingsTable";
import { Modal } from "styles/Modal/Modal";
import { ButtonActionIcon } from "styles/commons";

import { AddIcon } from "svgs";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* width: fit-content; */
  overflow-y: auto;
`;

export const Shippings = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Wrapper>
      <Modal open={isOpen} full>
        <div>CREATE SHIPPING FORM</div>
      </Modal>
      <ButtonActionIcon type="button" onClick={() => setOpen(true)} $width={200}>
        <AddIcon />
        <span>SHIPPING</span>
      </ButtonActionIcon>

      <ShippingsTable />
    </Wrapper>
  );
};
