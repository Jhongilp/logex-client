import styled from "styled-components";
import { StyledContent, ContentWrapper } from "styles/commons";

export const StyledCustomerContent = styled(StyledContent)`
  height: calc(100vh - 105px);
`;

export const StyledCustomerWrapper = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

export const StyledCustomerPageMain = styled(StyledContent)`
  background-color: white;
  justify-content: flex-start;
  gap: 20px;
`;
