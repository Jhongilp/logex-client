import { useState } from "react";
import styled from "styled-components";
// import { useSelector } from "react-redux";

import ExpoTable from "components/dashboard/screens/expo-table/ExpoTable";
// import DashboardControls from "components/dashboard/screens/dashboard-controls/DashboardControls";
import { ExpoList } from "types/props.types";

import { StyledMain, StyledContent, ContentWrapper } from "styles/commons";

const Content = styled(StyledContent)`
  height: calc(100vh - 105px);
`;

type DashboardView = "resume" | "table";

const Dashboard = () => {
  const [view, setView] = useState<DashboardView>("resume");
  // const exportaciones: ExpoList = useSelector(
    //   (state: StateType) => state.exportaciones
    // );
    const exportaciones: ExpoList = []

  return (
    <StyledMain>
      {/* <DashboardControls
        onChangeView={() =>
          setView((state) => (state === "resume" ? "table" : "resume"))
        }
      /> */}
      <div>Dashboard Controls</div>
      <Content>
        <ContentWrapper>
          {view === "resume" ? (
            <ExpoTable exportaciones={exportaciones} />
          ) : (
            <div>Table view</div>
          )}
        </ContentWrapper>
      </Content>
    </StyledMain>
  );
};

export default Dashboard;
