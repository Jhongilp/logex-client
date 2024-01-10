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

export const StyledCustomerDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const StyledInfoLabel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 6px;
  color: var(--color-text-dominant);
  box-sizing: border-box;

  > label {
    font-size: 12px;
    color: var(--color-primary);
    margin-bottom: 3px;
    width: 150px;
  }

  > span {
    font-size: 14px;
    font-family: "Roboto";
    text-transform: uppercase;
  }
`;
