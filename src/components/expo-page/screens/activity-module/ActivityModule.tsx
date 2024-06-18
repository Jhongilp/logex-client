import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ExpoStatus } from "types";
import { ExpoParams } from "types/props.types";
import { useExpo } from "api/exportaciones.api";
import Checklist from "components/checklist/Checklist";
import Checkpoint, { useExpoStage } from "components/checkpoint/CheckPoint";

import {
  Wrapper,
  ExpoStatusHeader,
  ExpoActivitiesWrapper,
} from "components/expo-page/screens/activity-module/activity_module.style";

const ActivityModule = () => {
  const [expoStageFilter, setExpoStageFilter] = useState(
    ExpoStatus.PrevioCargue
  );
  const { expoId } = useParams<ExpoParams>();
  const { expo } = useExpo(expoId);
  const { stages, currentExpoStage } = useExpoStage(expo?.todo_list);
  const handleOnStageFilter = (stageName: string) => {
    setExpoStageFilter(stageName as ExpoStatus);
  };

  useEffect(() => {
    setExpoStageFilter(currentExpoStage as ExpoStatus);
  }, [currentExpoStage]);

  // const handleRestoreActivityList = () => {
  //   console.log("_handleRestoreActivityList ");

  //   restoreExpoChecklist(expoId)
  //     .then((res) => {
  //       console.log("_handleRestoreActivityList res: ", res);
  //     })
  //     .catch((err) => {
  //       console.log("_handleRestoreActivityList error: ", err);
  //     });
  // };

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
        {/* <button onClick={handleRestoreActivityList}>RESTORE</button> */}
      </ExpoStatusHeader>
      <ExpoActivitiesWrapper>
        <Checklist
          list={expo.todo_list ?? []}
          expoId={expoId}
          expoStageFilter={expoStageFilter}
        />
      </ExpoActivitiesWrapper>
    </Wrapper>
  );
};

export default ActivityModule;
