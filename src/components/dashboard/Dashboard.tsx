import styled from "styled-components";
import { useQuery } from "urql";
import { GetExposQuery } from "api";
// import { useSelector } from "react-redux";

import ExpoTable from "components/dashboard/screens/expo-table/ExpoTable";
import DashboardControls from "components/dashboard/screens/dashboard-controls/DashboardControls";
import { ExpoList } from "types/props.types";

import { StyledMain, StyledContent, ContentWrapper } from "styles/commons";

const Content = styled(StyledContent)`
  height: calc(100vh - 105px);
`;

const Dashboard = () => {
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
      <DashboardControls />
      <div>Dashboard Controls</div>
      <Content>
        <ContentWrapper>
          <ExpoTable exportaciones={exportaciones} />
        </ContentWrapper>
      </Content>
    </StyledMain>
  );
};

export default Dashboard;
