import styled, { css } from "styled-components";
import {
  ProgressBarProps,
  CheckpointBtnProps,
} from "types/stepper-type/stepper.types";

export const CheckpointStyled = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  margin-top: 20px;
  padding: 0 12px;
  /* border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc; */
`;

export const StepperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: white;
`;

export const ProgressBarContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 2px;
  background-color: #eee;
`;

export const ProgresBarIndicator = styled.div<ProgressBarProps>`
  position: absolute;
  width: ${(props) => props.progress}%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: var(--color-secondary);
`;

export const ProgressBarCheckpoint = styled.div`
  position: absolute;
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: 0;
  left: 0;
  background-color: #ccc;
  z-index: 2;
`;

export const CheckpointWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const CheckpointProgressIndicator = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const CheckpointBtn = styled.button<CheckpointBtnProps>`
  display: flex;
  height: 100%;
  width: 100%;
  border: 0;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: var(--color-text-dominant);
  ${(props) =>
    !props.isActive &&
    css`
      background-color: white;
      border: 1px solid ${props.isCompleted ? "var(--color-secondary)" : "#ddd"};
    `}
  ${(props) =>
    props.isSelected &&
    css`
      border: 2px solid var(--color-primary);
    `}

  &:focus:not(:focus-visible) {
    outline: 0;
  }

  > svg {
    background-color: var(--color-main);
    border-radius: 50%;
    ${(props) =>
      props.isStepIcon &&
      css`
        width: 16px;
        height: 16px;
      `}
    ${(props) =>
      props.isStepIcon &&
      props.isSelected &&
      css`
        width: 28px;
        height: 28px;
      `}
    > circle.progress-ring__circle {
      transition: 0.35s stroke-dashoffset;
      // axis compensation
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }
  }
`;

export const CompleteIndicator = styled(CheckpointProgressIndicator)`
  width: 12px;
  height: 12px;
  top: -3px;
  left: 60%;
  background-color: white;
  border-radius: 50%;
  > svg {
    width: 100%;
    height: 100%;
  }
`;
