import { useState } from "react";
import styled from "styled-components";
import { StyledSubHeader, SunHeaderContent, ButtonAct } from "styles/commons";
import { Modal } from "styles/Modal/Modal";
import CreateExpoForm from "components/dashboard/screens/createExpoForm/CreateExpoForm";
import { AddIcon } from "svgs";

const AddExpoBtn = styled(ButtonAct)`
  padding: 0 12px 0 6px;
  margin-right: 20px;
  > svg {
    margin-right: 6px;
    fill: var(--color-main);
  }
`;

export default function DashboardControls() {
  const [isOpen, setOpen] = useState(false);

  return (
    <StyledSubHeader>
      <Modal open={isOpen} full>
        {isOpen && <CreateExpoForm onClose={() => setOpen(false)} />}
      </Modal>
      <SunHeaderContent>
        <AddExpoBtn onClick={() => setOpen(true)}>
          <AddIcon />
          <span>Exportación</span>
        </AddExpoBtn>
      </SunHeaderContent>
    </StyledSubHeader>
  );
}
