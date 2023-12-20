import styled, { css } from "styled-components";

export const MainBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  flex-grow: 1;
  color: var(--color-text-dominant);
`;

export const TableWrapper = styled.div`
  height: 100%;
  box-sizing: border-box;
`;

export const ExpoTable = styled.table`
  position: relative;
  border-collapse: collapse;
  width: 100%;
`;

export const TableHeader = styled.thead`
  color: var(--color-text-dominant);
`;

export const TableBody = styled.tbody`
  width: 100%;
  height: 100%;
`;

export const RowHeader = styled.tr`
  height: 35px;

  th {
    position: sticky;
    top: 0;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
    background-color: #f6f7f9;
    padding-left: 10px;
    text-align: left;
    font-family: "Open Sans";
    font-size: 14px;
    font-weight: normal;
    z-index: 2;
  }
`;

export const Row = styled.tr`
  height: 60px;
  border-bottom: 1px solid var(--color-text-light);

  a {
    text-decoration: underline;
    color: var(--color-primary);
    :visited {
      color: var(--color-primary);
    }
    :active {
      color: var(--color-danger);
    }
  }
`;

export const Cell = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 10px;
  font-weight: 100;

  > span.upper {
    font-weight: bold;
    height: 25px;
    color: var(--color-text-dominant);
  }

  > span.lower {
    font-family: "Open Sans";
    font-size: 12px;
    font-weight: 400;
  }
`;

export const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 230px;
  text-transform: none;
`;

type RowProps = {
  upper?: boolean;
  lower?: boolean;
};

export const StatusRow = styled.div<RowProps>`
  display: flex;
  align-items: ${(props) => (props.lower ? "baseline" : "center")};
  width: 100%;
  height: 100%;

  > div.status-icon {
    /* margin-left: auto; */
    margin-right: 6px;
  }

  > span {
    font-size: 14px;
    font-weight: 400;
  }

  & > span {
    ${(props) =>
      props.lower &&
      css`
        font-size: 12px;
      `}
  }
`;

export const Circle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-secondary);
  margin-right: 8px;
`;

type StatusProgressProps = {
  progress: number;
};

export const StatusProgress = styled.div<StatusProgressProps>`
  position: relative;
  width: 70%;
  height: 3px;
  background-color: var(--color-text-light);
  margin-right: 8px;

  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: ${({ progress }) => `${progress}%`};
    height: 100%;
    background-color: var(--color-primary);
  }
`;
