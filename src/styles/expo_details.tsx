import styled, { css } from "styled-components";

export const ExpoDetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 50px 60px 100px 1fr;
  grid-gap: 6px;
  margin-bottom: 10px;
  color: var(--color-text-dominant);
`;

export const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-transform: uppercase;
  font-size: 16px;
  padding-left: 6px;
  color: var(--color-text-dominant);

  span.customer-name {
    font-size: 22px;
    font-weight: bold;
  }
  span.destination {
    font-family: "Roboto";
  }
`;

export const BookingNumber = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 6px;
`;

export const SealingInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 6px;
`;

export const DataField = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 6px;
`;

type DataContentProps = {
  emphasize?: boolean;
};

export const DataContent = styled.div<DataContentProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 6px;
  background-color: var(--color-main-bg);
  box-sizing: border-box;

  > label {
    font-size: 12px;
    font-weight: bold;
    color: var(--color-main-bg-dark);
    margin-bottom: 3px;
  }

  > span {
    font-size: 14px;
    font-family: "Roboto";
    padding-left: 6px;
    text-transform: uppercase;

    ${(props) =>
      props.emphasize &&
      css`
        font-size: 22px;
        font-weight: bold;
      `}
  }
`;

export const BrokersAndSchedule = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 6px;
`;

export const Schedule = styled.div`
  grid-area: 1 / 2 / 4 / 3;
  display: flex;
  flex-direction: column;
  padding: 0 6px;
  background-color: var(--color-main-bg);

  > label {
    font-size: 12px;
    font-weight: bold;
    color: var(--color-main-bg-dark);
  }

  ul {
    display: flex;
    flex-direction: column;
    padding: 0;

    li {
      display: flex;
      justify-content: space-between;
      list-style: none;
    }
  }
`;
