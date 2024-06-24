import { FC, useEffect, useState } from "react";
import {
  StepperProps,
  CheckpointProps,
} from "types/stepper-type/stepper.types";
import CheckpointCircularProgress from "components/checkpoint/screens/stages-stepper/step/StageStep";
import {
  StepperWrapper,
  ProgressBarContainer,
  ProgresBarIndicator,
} from "components/checkpoint/check_point.styles";
import { ExpoStatus } from "types";

const STEP_SIZE = 40;
const STEP_SIZE_SMALL = 26;

const getStepPosition = (stepsQty: number, index: number) => {
  const offset = 10; // 0 - 100, treat as %, 2 sides (left and right)
  const gap = (100 - offset * 2) / (stepsQty - 1);
  const stepPosition = gap * index + offset;
  return stepPosition;
};

const Checkpoint: FC<CheckpointProps> = ({
  position,
  size,
  barHeight,
  progress,
  name,
  isSelected,
  isActive,
  isCompleted,
  onStepClick,
}) => {
  return (
    <CheckpointCircularProgress
      progress={progress}
      position={position}
      size={size}
      barHeight={barHeight}
      name={name}
      isSelected={isSelected}
      isActive={isActive}
      isCompleted={isCompleted}
      onStepClick={onStepClick}
    />
  );
};

const Stepper: FC<StepperProps<ExpoStatus>> = ({
  steps,
  height,
  onStepClick,
  activeStep,
  selectedStep,
}) => {
  const [progress, setProgress] = useState(0);
  const length = steps.length;
  const indexActiveStep = steps.findIndex((step) => step.name === activeStep);
  useEffect(() => {
    const progress = getStepPosition(length, indexActiveStep);
    setProgress(progress);
  }, [length, activeStep, indexActiveStep]);

  return (
    <StepperWrapper>
      <ProgressBarContainer>
        {steps.map((step, i) => {
          const stepPosition = getStepPosition(steps.length, i);
          const isCompleted = step.progress === 100;
          const isSelected = step.name === selectedStep;
          const isActive = step.name === activeStep;
          let size = STEP_SIZE_SMALL;
          if (isActive || isSelected) {
            size = STEP_SIZE;
          }

          return (
            <Checkpoint
              key={step.name}
              position={stepPosition}
              size={size}
              barHeight={height}
              progress={step.progress}
              name={step.name}
              isSelected={isSelected}
              isActive={isActive}
              isCompleted={isCompleted}
              onStepClick={onStepClick}
            />
          );
        })}

        <ProgresBarIndicator $progress={progress} />
      </ProgressBarContainer>
    </StepperWrapper>
  );
};

export default Stepper;
