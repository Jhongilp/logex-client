import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { ExpoStatus, IExpo } from "types";
import { ExpoParams } from "types/props.types";
import { GetExpoQuery } from "api";
import Checklist from "components/checklist/Checklist";
import Checkpoint, { useExpoStage } from "components/checkpoint/CheckPoint";

import {
  Wrapper,
  ExpoStatusHeader,
  ExpoActivitiesWrapper,
} from "components/expo-page/screens/activity-module/activity_module.style";

export const ActivityModule = () => {
  const { expoId } = useParams<ExpoParams>();
  const [results] = useQuery<{ expo: IExpo }>({
    query: GetExpoQuery,
    variables: { expoId: expoId },
  });
  const { data, fetching, error } = results;
  const [expoStageFilter, setExpoStageFilter] = useState(
    ExpoStatus.PrevioCargue
  );
  // const { expo } = useExpo(expoId);

  const expo = data?.expo;
  const { stages, currentExpoStage } = useExpoStage(expo?.todoList); // ! add default activity list
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

  if (fetching) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>There was an error fetching expo</p>;
  }

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
          list={expo.todoList ?? []}
          expoId={expoId}
          expoStageFilter={expoStageFilter}
        />
      </ExpoActivitiesWrapper>
    </Wrapper>
  );
};
