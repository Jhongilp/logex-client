import styled from "styled-components";
import { BtnIcon } from "styles/commons";
import { Backdrop, CenteredModal } from "styles/Modal/Modal";
import { ButtonAct } from 'styles/commons';

export const ResetOptionBtnIcon = styled(BtnIcon)`
  width: 14px;
  height: 14px;
  margin-left: 8px;
`;

export const MoreOptionBtnIcon = styled(BtnIcon)`
  width: 20px;
  height: 20px;
  margin-left: 8px;

  > svg {
    fill: var(--color-text-light);
  }
`;

export const EditableSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    padding: 8px 8px;
    font-weight: bold;
  }
`;

export const OptionList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 0 6px 0;
  margin: 0;

  li {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 28px;
    padding: 0 6px;

    > svg {
      height: 16px;
      width: 16px;
      fill: var(--color-text-light);
      margin-right: 6px;
    }

    > span.create-option-text {
      margin-right: 6px;
    }

    &:hover {
      background-color: var(--color-main-bg-terciary);
    }
  }
`;

export const CurrentSelection = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  width: 100%;
  height: 33px;
  padding: 0 8px;
  background-color: var(--color-main-bg);
  border-bottom: 1px solid var(--color-text-light);
`;

export const TagEdition = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;

  > div.edition {
    padding: 0 8px;
    input {
      padding-left: 5px;
      text-transform: uppercase;

      height: 30px;
    }
  }

  > div.delete {
    /* padding: 0 8px; */
    display: flex;
    width: 100%;
    height: 30px;
    margin-top: 10px;

    > button {
      width: 100%;
      height: 100%;
      padding: 0 4px;
      justify-content: flex-start;
      gap: 5px;

      &:hover {
        background-color: var(--color-main-bg);
      }
    }
  }
`;

type OptionTagStyleProps = {
  withCancelBtn?: boolean;
};

export const OptionTag = styled.div<OptionTagStyleProps>`
  display: flex;
  align-items: center;
  height: 20px;
  max-width: 75%;
  border-radius: 3px;
  padding: 0 5px;
  background-color: var(--color-main-bg-secondary);
  text-transform: uppercase;
  margin-right: auto;
  > span {
    font-weight: normal;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const InputField = styled.div`
  display: flex;
  height: 100%;

  > input {
    width: 100%;
    border: none;
    outline: 0;
    background-color: inherit;
    text-transform: uppercase;
    color: var(--color-text-dominant);
    &:focus {
      outline: 0;
    }
  }
`;

export const BackdropWrapper = styled(Backdrop)`
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 1;
`;

export const CenteredModalDeleteConfirmation = styled(CenteredModal)`
  width: 300px;
  height: 180px;
  left: calc(50% - 150px);
  top: calc(50% - 90px);
  opacity: 1;
`;

export const DeleteConfirmationContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  gap: 10px;

  > span {
    margin-bottom: 5px;
  }

  > button {

  }
`

export const DeleteOptionBtn = styled(ButtonAct)`
  color: var(--color-danger);
  background-color: white;
  border: 1px solid var(--color-danger);
  justify-content: center;

  &:hover {
    background-color: var(--color-danger-lt);
  }
`
export const CancelDeleteOptionBtn = styled(ButtonAct)`
  color: var(--color-text-dominant);
  background-color: white;
  border: 1px solid var(--color-main-bg-secondary);
  justify-content: center;
  &:hover {
    background-color: var(--color-main-bg);
  }
`