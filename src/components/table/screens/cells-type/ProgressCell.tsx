import { FC } from "react";
import styled from "styled-components";
import { ProgressStatus } from "types";
import { ProgressString } from "utils";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProgressCircle = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: #ccc;
`;

const progressColor: ProgressString = {
  SIN_INICIAR: "gray",
  EN_CURSO: "orange",
  EN_ESPERA: "purple",
  RETRASADO: "red",
  COMPLETADO: "var(--color-secondary)",
};

const ProgressCell: FC<{ status: ProgressStatus }> = ({ status }) => {
  return (
    <Wrapper>
      <ProgressCircle style={{ backgroundColor: progressColor[status] }} />
      <span>{status}</span>
    </Wrapper>
  );
};

export default ProgressCell;
