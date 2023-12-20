import styled from "styled-components";

export const TableWrapper = styled.div`
  box-sizing: border-box;
  /* overflow: hidden; */ 
  /* overflow-y: auto; */
  width: 80%;
  /* box-shadow: 4px 4px 5px -1px var(--color-text-light); */
  box-shadow: 2px 3px 6px 0px rgba(58,58,62,0.7);
`;

export const Table = styled.table`
  position: relative;
  border-collapse: collapse;
  width: 100%;
  font-size: 12px;
  /* border: 1px solid var(--color-text-light); */
`;

export const TableHeader = styled.thead`
  color: var(--color-primary);
  background-color: var(--color-main-bg);

  > tr {
    height: 30px;
    border-bottom: 1px solid var(--color-text-light);

    th {
      position: sticky;
      top: 0;
      text-align: left;
      font-weight: normal;
      padding-left: 6px;
      z-index: 2;
    }
  }
`;

export const TableBody = styled.tbody`
  text-transform: uppercase;

  > tr {
    height: 35px;
    border-bottom: 1px solid var(--color-main-bg);
    transition: background-color ease-in-out 0.2s;

    &:hover {
      background-color: var(--color-main-bg);
    }

    td {
      padding-left: 6px;
    }

    td:last-child {
      position: relative;
      width: 20px;
      button {
        width: 20px;
        display: none;
      }
    }

    &:hover td:last-child {
      button {
        display: flex;
      }
    }
  }
`;
