import { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "urql";
import { ExpoStatus } from "types";
// import { ExpoStatus, IExpo } from "types";
// import { ExpoParams } from "types/props.types";
// import { GetExpoQuery } from "api";
import Checklist from "components/checklist/Checklist";
import Checkpoint, { useExpoStage } from "components/checkpoint/CheckPoint";
import { ExpoContext } from "components/expo-page/ExpoPage";

import {
  Wrapper,
  ExpoStatusHeader,
  ExpoActivitiesWrapper,
} from "components/expo-page/screens/activity-module/activity_module.style";

export const ActivityModule = () => {
  const expo = useContext(ExpoContext);
  const [expoStageFilter, setExpoStageFilter] =
    useState<ExpoStatus>("PREVIO_CARGUE");

  const { stages, currentExpoStage } = useExpoStage(expo?.todoList); // ! add default activity list
  const handleOnStageFilter = (stageName: ExpoStatus) => {
    setExpoStageFilter(stageName);
  };

  useEffect(() => {
    setExpoStageFilter(currentExpoStage as ExpoStatus);
  }, [currentExpoStage]);

  return (
    <Wrapper>
      <Checkpoint
        steps={stages}
        currentExpoStage={currentExpoStage}
        expoStageSelected={expoStageFilter}
        onStageFilter={handleOnStageFilter}
      />
      <ExpoStatusHeader>
        <span>{expoStageFilter.toUpperCase()}</span>
      </ExpoStatusHeader>
      <ExpoActivitiesWrapper>
        <Checklist
          list={expo.todoList ?? []}
          expoStageFilter={expoStageFilter}
        />
      </ExpoActivitiesWrapper>
    </Wrapper>
  );
};
