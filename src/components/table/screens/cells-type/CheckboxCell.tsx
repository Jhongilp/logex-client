import React from "react";
import { IColumn } from "types/table-type/table.types";

export type CheckboxOnChangeFn<T> = (
  e: React.ChangeEvent<HTMLInputElement>,
  col: IColumn<T>,
  rowId: string
) => void;

interface TableCheckboxProps<T> {
  onCheckboxChange: CheckboxOnChangeFn<T>;
  checked: boolean;
  col: IColumn<T>;
  rowId: string;
}

function CheckboxCell<T>({
  onCheckboxChange,
  checked,
  col,
  rowId
}: TableCheckboxProps<T>) {
  return (
    <input
      type="checkbox"
      onChange={(e) => onCheckboxChange(e, col, rowId)}
      checked={checked}
    ></input>
  );
};

export default CheckboxCell;
