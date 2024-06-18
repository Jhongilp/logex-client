import React, { FC } from "react";
import styled from "styled-components";
import { Modal } from "styles/Modal/Modal";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 400px;
`;

type ContainerSmallViewProps = {
  containerId: string | null;
  onClose: () => void;
  onDeleteContainer: () => void;
  error: null | string;
};

const ContainerSmallView: FC<ContainerSmallViewProps> = ({
  containerId,
  onClose,
  onDeleteContainer,
  error,
}) => {
  return (
    <Modal open={!!containerId} full onClose={() => onClose()}>
      <Wrapper>
        <h3>Eliminar contenedor</h3>

        <div>
          <button onClick={onDeleteContainer}>ELIMINAR</button>
        </div>
        {error && (
          <div>
            <span style={{ color: "red" }}>
              Error al eliminar, intentar nuevamente
            </span>
          </div>
        )}
      </Wrapper>
    </Modal>
  );
};

export default ContainerSmallView;
