import { useState } from "react";
import styled from "styled-components";
import { useQuery } from "urql";
import { GetExposQuery } from "api";

import ExpoTable from "components/dashboard/screens/expo-table/ExpoTable";
import DashboardControls from "components/dashboard/screens/dashboard-controls/DashboardControls";
import { ExpoList } from "types/props.types";
import { ExpoContainerTable } from "components/dashboard/screens/expo-container-table/ExpoContainerTable";
import { StyledMain, StyledContent, ContentWrapper } from "styles/commons";

import { ExpoViewMode } from "types/props.types";

const Content = styled(StyledContent)`
  height: calc(100vh - 105px);
`;



const Dashboard = () => {
  const [expoViewMode, setExpoViewMode] = useState<ExpoViewMode>("expo-resume");
  const [results] = useQuery<{ expos: ExpoList }>({
    query: GetExposQuery,
  });

  // const exportaciones: ExpoList = useSelector(
  //   (state: StateType) => state.exportaciones
  // );
  const exportaciones: ExpoList = results?.data?.expos;
  console.log("[exportaciones] ", exportaciones);
  return (
    <StyledMain>
      <DashboardControls onExpoViewChange={setExpoViewMode} expoViewMode={expoViewMode}/>
      <Content>
        <ContentWrapper>
          {expoViewMode === "expo-resume" ? (
            <ExpoTable exportaciones={exportaciones} />
          ) : (
            <ExpoContainerTable />
          )}
        </ContentWrapper>
      </Content>
    </StyledMain>
  );
};

export default Dashboard;
