import styled from "styled-components";

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 12px;
  color: var(--color-text-dominant);
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  border-bottom: 1px solid var(--color-text-light);
  border-top: 1px solid var(--color-text-light);

  > div:nth-child(n + 2) {
    border-left: 1px solid var(--color-text-light);
  }
`;

export const ColumnName = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 100px;
  height: 100%;
  padding-left: 8px;
  resize: horizontal;
  box-sizing: border-box;
  overflow: hidden;

  > span {
    margin-left: 3px;
    color: var(--color-text-secondary);
  }
  > svg {
    width: 16px;
    height: 16px;
    fill: var(--color-text-secondary);
    /* fill: var(--color-text-dominant); */
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  border-bottom: 1px solid var(--color-text-light);
  position: relative;

  > div.row-offset,
  > div.row-handler {
    display: flex;
    position: absolute;
    top: 0;
    left: -52px;
    width: 50px;
    height: 100%;
  }

  > div.row-handler {
    display: none;

    > div {
      display: flex;
      align-items: center;
    }
  }

  > div.row-cell:nth-child(n + 4) {
    border-left: 1px solid var(--color-text-light);
  }

  &:hover {
    > div.row-handler {
      display: flex;
    }
  }
`;

type RowCellProps = {
  withPadding: boolean;
}

export const RowCell = styled.div<RowCellProps>`
  display: flex;
  align-items: center;
  min-width: 60px;
  height: 100%;
  padding-left: ${props => props.withPadding ? '8px' : 0};
  box-sizing: border-box;

  > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const EditableBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  min-height: 34px;
  min-width: 200px;
  border-radius: 3px;
  background-color: white;
  box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
    rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;
  box-sizing: border-box;

  > div {
    width: 100%;
    height: 100%;
    &:focus {
      outline: 0;
    }
  }

  > input {
    width: 100%;
    outline: 0;
    border: 0;
    padding-left: 8px;
  }

  &:focus {
    outline: 0;
  }
`;

// export const TextBoxWrapper = styled.textarea`
export const TextBoxWrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 0;
  padding: 5px 8px;
  overflow: hidden;

  &:focus {
    outline: 0;
  }
`;
