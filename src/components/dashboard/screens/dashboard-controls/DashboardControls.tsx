import React, { useState } from "react";
import styled from "styled-components";
import { StyledSubHeader, SunHeaderContent, ButtonAct, BtnIcon } from "styles/commons";
import { Modal } from "styles/Modal/Modal";
import CreateExpoForm from "components/dashboard/screens/createExpoForm/CreateExpoForm";
import CloneExpoForm from "components/dashboard/screens/createExpoForm/CloneExpoForm";
import { AddIcon, OpenInFullIcon } from "svgs";

const AddExpoBtn = styled(ButtonAct)`
  padding: 0 12px 0 6px;
  margin-right: 20px;
  > svg {
    margin-right: 6px;
    fill: var(--color-main);
  }
`;

export default function DashboardControls({
  onChangeView
}: {
  onChangeView: () => void
}) {
  const [isOpen, setOpen] = useState(false);
  const [isCloneOpen, setCloneOpen] = useState(false);

  return (
    <StyledSubHeader>
      <Modal open={isOpen || isCloneOpen} full>
        {isOpen && <CreateExpoForm onClose={() => setOpen(false)} />}
        {isCloneOpen && <CloneExpoForm onClose={() => setCloneOpen(false)} />}
      </Modal>
      <SunHeaderContent>
        <AddExpoBtn onClick={() => setOpen(true)}>
          <AddIcon />
          <span>Exportación</span>
        </AddExpoBtn>
        <AddExpoBtn onClick={() => setCloneOpen(true)}>
          <AddIcon />
          <span>Clonar</span>
        </AddExpoBtn>
        {/* <BtnIcon onClick={onChangeView}>
          <OpenInFullIcon />
        </BtnIcon> */}
      </SunHeaderContent>
    </StyledSubHeader>
  );
}
