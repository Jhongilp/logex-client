import React, { FC, useState } from "react";
import styled from "styled-components";
import { IExpoActivitiesSettings, ProgressStatus } from "types";
import { Modal } from "styles/Modal/Modal";
import { ButtonAct } from "styles/commons";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 400px;
`;

export const DeleteSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: auto;
`;

const DeleteBtn = styled(ButtonAct)`
  background-color: var(--color-danger);
`;

export const ItemProgressStatusInput = styled.div`
  display: flex;
  margin-bottom: 20px;

  label {
    display: flex;
    align-items: center;
  }

  select {
    height: 30px;
    padding: 3px;
    margin: 0 20px;
  }
`;

type TodoItemProps = {
  item: IExpoActivitiesSettings;
  onClose: () => void;
  onUpdateProgress: (progressStatus: ProgressStatus) => void;
  onDelete?: () => void;
};

const TodoItem: FC<TodoItemProps> = ({
  item,
  onClose,
  onUpdateProgress,
  onDelete,
}) => {
  const [progressStatus, setProgressStatus] = useState(
    ProgressStatus["Sin iniciar"]
  );

  const handleOnSelectMode = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as ProgressStatus;
    setProgressStatus(value);
  };

  return (
    <Modal open={!!item} full onClose={() => onClose()}>
      <Wrapper>
        <h3>{item.name}</h3>
        <ItemProgressStatusInput>
          <label>Estado</label>
          <select value={progressStatus} onChange={handleOnSelectMode}>
            <option>{ProgressStatus["Sin iniciar"]}</option>
            <option>{ProgressStatus["En curso"]}</option>
            <option>{ProgressStatus["En espera"]}</option>
            <option>{ProgressStatus["Retrasado"]}</option>
            <option>{ProgressStatus["Completado"]}</option>
          </select>
          <ButtonAct
            type="button"
            onClick={() => onUpdateProgress(progressStatus)}
          >
            GUARDAR
          </ButtonAct>
        </ItemProgressStatusInput>
        <DeleteSection>
          {item?.optional && (
            <DeleteBtn type="button" onClick={onDelete}>
              ELIMINAR
            </DeleteBtn>
          )}
        </DeleteSection>
      </Wrapper>
    </Modal>
  );
};

export default TodoItem;
