import { ExpoStatus } from "types";

export enum CheckpointType {
  SMALL_EMPTY,
  EXPANDED_WITH_ICON,
  COMPLETED_WITH_ICON
}

export interface Step {
  name: string;
  progress: number;
}

export type StepList = Step[];

export type StepClickFn = (name: string) => void;

export interface StepperProps {
  steps: StepList;
  height: number;
  activeStep: string;
  selectedStep: string;
  onStepClick: StepClickFn
}

export interface CheckpointProps {
  position: number;
  size: number;
  barHeight: number;
  progress: number;
  name: string;
  isSelected: boolean;
  isActive: boolean;
  isCompleted: boolean;
  onStepClick: StepClickFn
}

export interface UseExpoStage {
  stages: StepList;
  currentExpoStage: ExpoStatus | string;
}

export interface ProgressBarProps {
  progress: number;
}

export interface CheckpointBtnProps {
  isActive?: boolean;
  isStepIcon?: boolean;
  isCompleted?: boolean;
  isSelected?: boolean;
}