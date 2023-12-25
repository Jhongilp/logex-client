// import { useState } from "react";
import styled from "styled-components";
// import { useSelector } from "react-redux";

// import ExpoTable from "components/dashboard/screens/expo-table/ExpoTable";

import { StyledMain, StyledContent, ContentWrapper } from "styles/commons";

const Content = styled(StyledContent)`
  height: calc(100vh - 105px);
`;

const Customer = () => {
  return (
    <StyledMain>
      <Content>
        <ContentWrapper>
          <h2>CUSTOMERS</h2>
        </ContentWrapper>
      </Content>
    </StyledMain>
  );
};

export default Customer;
