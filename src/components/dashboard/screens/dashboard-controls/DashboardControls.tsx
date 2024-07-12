import { useState } from "react";
import styled from "styled-components";
import {
  StyledSubHeader,
  SunHeaderContent,
  ButtonAct,
  BtnIcon,
} from "styles/commons";
import { DashboardIcon, OpenInFullIcon } from "svgs";
import { Modal } from "styles/Modal/Modal";
import CreateExpoForm from "components/dashboard/screens/createExpoForm/CreateExpoForm";
import { AddIcon } from "svgs";
import { ExpoViewMode } from "types/props.types";

const AddExpoBtn = styled(ButtonAct)`
  padding: 0 12px 0 6px;
  margin-right: 20px;
  > svg {
    margin-right: 6px;
    fill: var(--color-main);
  }
`;

export default function DashboardControls({
  onExpoViewChange,
  expoViewMode,
}: {
  onExpoViewChange: (mode: ExpoViewMode) => void;
  expoViewMode: ExpoViewMode;
}) {
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
        {expoViewMode === "expo-resume" ? (
          <BtnIcon
            type="button"
            onClick={() => onExpoViewChange("container-list")}
          >
            <OpenInFullIcon />
          </BtnIcon>
        ) : (
          <BtnIcon
            type="button"
            onClick={() => onExpoViewChange("expo-resume")}
          >
            <DashboardIcon />
          </BtnIcon>
        )}
      </SunHeaderContent>
    </StyledSubHeader>
  );
}
