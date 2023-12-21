import React, { FC, useContext } from "react";
import styled from "styled-components";
import { TableContext } from "components/table/Table";
import { IRow } from "types/table-type/table.types";

const EditableDateWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  input {
    width: 100%;
    height: 100%;
    border: 0;
    color: var(--color-text-dominant);
    padding-left: 8px;
  }
`;

const EditableDateTypeBox: FC<{ row: IRow; fieldName: string }> = ({
  row,
  fieldName,
}) => {
  const ctx = useContext(TableContext);
  const { onUpdateData } = ctx;
  let columnDate = null;
  if (fieldName) {
    columnDate = row[fieldName];
  }
  let formattedDate = "";
  if (columnDate) {
    try {
      formattedDate = new Date(parseInt(columnDate as string))
        .toISOString()
        .slice(0, 10);
      
    } catch (error) {
      console.error("Error convrting date: ", error);
    }
  }

  return (
    <EditableDateWrapper className="no-self-close">
      <input
        defaultValue={formattedDate ? formattedDate : ''}
        type="date"
        onBlur={(e) => {
          if(!isNaN(e.currentTarget.valueAsNumber)) {
            onUpdateData?.(e.currentTarget.valueAsNumber.toString());
          }
        }}
      ></input>
    </EditableDateWrapper>
  );
};

export default EditableDateTypeBox;
