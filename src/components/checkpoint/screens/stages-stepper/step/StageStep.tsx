import React, { FC, useState, useRef, useEffect } from "react";
import { CheckpointProps } from "types/stepper-type/stepper.types";
import {
  ProgressBarCheckpoint,
  CheckpointWrapper,
  CheckpointProgressIndicator,
  CheckpointBtn,
  CompleteIndicator
} from "components/checkpoint/check_point.styles";

import { DoneIcon } from "svgs";
import { stepIcon } from 'utils';

type CircularProgressProps = {
  progress: number;
  name: string;
};

const CheckpointCircularProgress: FC<
  CircularProgressProps & CheckpointProps
> = ({
  progress,
  position,
  size,
  barHeight,
  name,
  isActive,
  isCompleted,
  isSelected,
  onStepClick,
}) => {
  const [circumference, setCircumference] = useState(0);
  const [cssStyle, setStyle] = useState({
    strokeDasharray: `${0} ${0}`,
    strokeDashoffset: `${0}`,
  });

  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const radio = circleRef?.current?.r?.baseVal?.value;
    if (radio) {
      const circumference = radio * 2 * Math.PI;
      const offset = circumference - (progress / 100) * circumference;
      const style = {
        strokeDasharray: `${circumference} ${circumference}`,
        strokeDashoffset: `${offset}`,
      };
      setCircumference(circumference);
      setStyle(style);
    }
  }, [progress]);

  useEffect(() => {
    const offset = circumference - (progress / 100) * circumference;
    const style = {
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: `${offset}`,
    };
    setStyle(style);
  }, [progress, circumference]);

  return (
    <ProgressBarCheckpoint
      style={{
        left: `calc(${position}% - ${size / 2}px)`,
        top: `${-(size / 2 - barHeight / 2)}px`,
        width: size,
        height: size,
      }}
    >
      <CheckpointWrapper>
        <CheckpointBtn isActive title={name} onClick={() => onStepClick(name)}>
          <svg
            className="progress-ring"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
          >
            <circle
              ref={circleRef}
              className="progress-ring__circle"
              stroke="var(--color-secondary)"
              strokeWidth={isActive ? 1 : 0}
              fill="var(--color-main-bg)"
              r="11"
              cx="12"
              cy="12"
              style={isActive ? cssStyle : {}}
            />
          </svg>
        </CheckpointBtn>

        {!isActive && (
          <CheckpointProgressIndicator>
            <CheckpointBtn
              isCompleted={isCompleted}
              isSelected={isSelected}
              isStepIcon
              title={name}
              onClick={() => onStepClick(name)}
            >
              {stepIcon[name]}
            </CheckpointBtn>
          </CheckpointProgressIndicator>
        )}
        {isActive && (
          <CheckpointProgressIndicator>
            <CheckpointBtn
              isActive
              title={name}
              onClick={() => onStepClick(name)}
            >{`${progress}%`}</CheckpointBtn>
          </CheckpointProgressIndicator>
        )}

        {isCompleted && (
          <CompleteIndicator>
              <DoneIcon />
          </CompleteIndicator>
        )}
      </CheckpointWrapper>
    </ProgressBarCheckpoint>
  );
};

export default CheckpointCircularProgress;
