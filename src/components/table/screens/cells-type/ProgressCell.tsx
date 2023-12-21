import React, { FC } from "react";
import styled from "styled-components";
import { ProgressStatus } from "types";

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

const progressColor = {
  [ProgressStatus["Sin iniciar"]]: "gray",
  [ProgressStatus["En curso"]]: "orange",
  [ProgressStatus["En espera"]]: "purple",
  [ProgressStatus["Retrasado"]]: "red",
  [ProgressStatus["Completado"]]: "var(--color-secondary)",
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
