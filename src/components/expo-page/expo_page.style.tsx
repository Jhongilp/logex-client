import styled from "styled-components";
import { PageHeader } from "styles/commons";

export const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(350px,35%) 1fr;
  grid-template-rows: 1fr;
  width: 95%;
  height: 100%;
  background-color: var(--color-main-bg);
`;

export const ExpoPageHeader = styled(PageHeader)`
  > div.commands {
    width: 100%;
  }
`

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: var(--color-main);
`;


export const ExpoNumber = styled.div`
  display: flex;
  height: 100%;
  width: 200px;
  align-items: center;

  > button {
    a {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
    }
  }

  > span {
    color: var(--color-primary);
    font-weight: 400;
    font-family: "Open Sans";
    font-size: 20px;
  }
`;

export const ExpoDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 60px repeat(9, 35px) auto;
  grid-gap: 6px;

  > div {
    display: flex;
    align-items: center;
    /* flex-direction: column; */
    width: 100%;
    height: 100%;
    padding: 6px;
    /* background-color: var(--color-main-bg); */
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
      /* margin-left: 10px; */
    }
  }

  > div.expo--customer-name {
    grid-area: 1 / 1 / 2 / 13;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-transform: uppercase;
    font-size: 16px;

    span.customer-name {
      font-size: 22px;
      font-weight: bold;
    }
    span.destination {
      font-family: "Roboto";
    }
  }

  > div.expo--booking {
    grid-area: 2 / 1 / 3 / 13;
    > span {
      font-size: 18px;
    }
  }
  > div.expo--bl {
    grid-area: 3 / 1 / 4 / 13;
    > span {
      font-size: 18px;
    }
  }
  
  > div.expo--sailing-city {
    grid-area: 4 / 1 / 5 / 13;
  }
  > div.expo--origin-port {
    grid-area: 5 / 1 / 6 / 13;
  }
  > div.expo--shipper {
    grid-area: 6 / 1 / 7 / 13;
  }
  > div.expo--voyage {
    grid-area: 7 / 1 / 8 / 13;
  }
  > div.expo--broker {
    grid-area: 8 / 1 / 9 / 13;
  }
  > div.expo--custom-broker {
    grid-area: 9 / 1 / 10 / 13;
  }
  > div.expo--transport {
    grid-area: 10 / 1 / 11 / 13;
  }
  > div.expo--schedule {
    grid-area: 11 / 1 / 12 / 13;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    ul {
      display: flex;
      flex-direction: column;
      padding: 0;
      font-size: 14px;

      li {
        display: flex;
        /* justify-content: flex-end; */
        list-style: none;
        height: 24px;
        padding-left: 20px;
        label {
          width: 150px;
        }
        span {
          margin-left: 12px;
        }
      }
    }
  }
`;

// RIGHT COLUMN

export const RightContent = styled.div`
  display: flex;
  margin-left: 5px;
  background-color: var(--color-main);
  overflow-x: auto; 
`;
