import React, { useRef, useEffect, useState, useCallback } from "react";
import { ProgressStatus } from "types";

import {
  IColumn,
  IRow,
  PropertyType,
  TableProps,
  columnDefaultByType,
  IEditableProps,
  TableContextTest,
} from "types/table-type/table.types";

import {
  TableContainer,
  TableHeader,
  ColumnName,
  Row,
  RowCell,
} from "components/table/styles/_table.styles";
import { BtnIcon } from "styles/commons";
import CheckboxCell, {
  CheckboxOnChangeFn,
} from "components/table/screens/cells-type/CheckboxCell";
import TextCell from "components/table/screens/cells-type/TextCell";
import ProgressCell from "components/table/screens/cells-type/ProgressCell";
import EditableDateTypeBox from "components/table/screens/cells-type/EditableDateTypeBox";
import EditableBox from "components/table/screens/editable-box/EditableBox";

import { AddIcon, DragIcon } from "svgs";

const ctxDefaultValue = {
  x: 0,
  y: 0,
  isVisible: false,
  width: 200,
  editableValue: "",
  columnType: PropertyType.Text,
  onUpdateData: undefined,
  columnName: "",
  selectionOptionLists: {},
  onUpdateSelectionOptionList: undefined,
};

export const TableContext =
  React.createContext<TableContextTest>(ctxDefaultValue);

function getCellType<T>(
  type: PropertyType,
  row: IRow,
  onChange: CheckboxOnChangeFn<T>,
  col: IColumn<T>,
  checked: boolean
) {
  const text = row[col.fieldName as string];
  let progress = ProgressStatus["Sin iniciar"];
  // TODO: this might be wrong, the correct way should col.fieldName === PropertyType.Progress
  if (col.fieldName === "progress") {
    progress = row[col.fieldName as string] as ProgressStatus;
  }
  switch (type) {
    case PropertyType.Checkbox: {
      return (
        <CheckboxCell
          onCheckboxChange={onChange}
          col={col}
          rowId={row.id}
          checked={checked}
        />
      );
    }
    case PropertyType.Progress: {
      return <ProgressCell status={progress} />;
    }
    case PropertyType.Date: {
      return (
        <EditableDateTypeBox row={row} fieldName={col.fieldName as string} />
      );
    }
    default: {
      return <TextCell text={text as string} />;
    }
  }
}

export function Table<T>({
  tableName,
  columns,
  rows,
  selectionOptionLists,
  onNewRow,
  onSelection,
  onUpdateData,
  onUpdateSelectionOptionList,
}: TableProps<T>) {
  const [width, setWidth] = useState(() => {
    return columns.reduce((accum: any, col) => {
      accum[col.fieldName] = 60;
      return accum;
    }, {});
  });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isEditableBoxVisible, setBoxVisible] = useState(false);
  const [currentEditableColumnWidth, setEditableColumnWidth] = useState(200);
  const [columnType, setColumnType] = useState(PropertyType.Text);
  const [editableValue, setEditableValue] = useState<IEditableProps>({
    value: "",
    rowId: null,
    columnName: "",
  });

  const refs = useRef(new Map()).current;

  useEffect(() => {
    const closeEditableBoxFn = (e: any) => {
      // console.log("[closeEditableBoxFn] target: ", e.target);

      if (
        e.target?.closest?.(".row-cell") ||
        e.target?.closest?.(".no-self-close") ||
        e.target?.closest?.(".tag-edition-modal") ||
        e.target?.closest?.(".backdrop")
      ) {
        return;
      }
      if (isEditableBoxVisible) {
        setBoxVisible(false);
      }
    };
    window.addEventListener("click", closeEditableBoxFn);
    return () => {
      window.removeEventListener("click", closeEditableBoxFn);
    };
  }, [isEditableBoxVisible]);

  useEffect(() => {
    const widthSettings = window.localStorage.getItem(tableName);
    if (widthSettings) {
      try {
        const parsedWidthSettings = JSON.parse(widthSettings);
        setWidth(parsedWidthSettings);
      } catch (error) {
        console.log("Error trying to parse width settings. ", error);
      }
    }
  }, [tableName]);

  useEffect(() => {
    const ro = new ResizeObserver((entries: any) => {
      for (let entry of entries) {
        const id = entry.target?.id;
        const w =
          entry.borderBoxSize?.[0]?.inlineSize ||
          entry.borderBoxSize?.inlineSize; // fix Firefox issue

        setWidth((state: any) => {
          const update = {
            ...state,
            [id]: w,
          };
          const strWidthSettings = JSON.stringify(update);
          window.localStorage.setItem(tableName, strWidthSettings);
          return update;
        });
      }
    });
    for (let ref of refs.values()) {
      ro.observe(ref as any);
    }

    return () => {
      ro?.disconnect();
    };
  }, [refs, tableName]);

  const handleClick = useCallback(
    (e: React.MouseEvent, col: IColumn<T>, row: IRow) => {
      const isCheckbox = col.type === PropertyType.Checkbox;
      const isDatebox = col.type === PropertyType.Date;
      const editableBoxNotNeeded = isCheckbox || isDatebox;
      const { x, y } = e.currentTarget.getBoundingClientRect();
      setEditableValue({
        value: row[col.fieldName as string] as string,
        rowId: row.id,
        columnName: col.fieldName as string,
      });
      setEditableColumnWidth(width[col.fieldName]);
      setPosition({ x, y });
      setBoxVisible((state) => (editableBoxNotNeeded ? false : !state));
      setColumnType(col.type);
    },
    [width]
  );
  // when user is updating date cells and use the keyboard. Without this, when calling onUpdateData it will get the wrong cell values
  const handleFocus = useCallback((col: IColumn<T>, row: IRow) => {
    setEditableValue({
      value: row[col.fieldName as string] as string,
      rowId: row.id,
      columnName: col.fieldName as string,
    });
  }, []);

  const handleOnUpdateData = useCallback(
    (newValue: string = "") => {
      setBoxVisible(false);
      const data: IEditableProps = {
        ...editableValue,
        value: newValue,
      };
      onUpdateData?.(data);
    },
    [onUpdateData, editableValue]
  );

  const handleOnChangeCheckbox = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      col: IColumn<T>,
      rowId: string
    ) => {
      const data: IEditableProps = {
        columnName: col.fieldName as string,
        rowId,
        value: e.currentTarget.checked,
      };
      onUpdateData?.(data);
    },
    [onUpdateData]
  );

  const ctxValue = {
    rows,
    x: position.x,
    y: position.y,
    isVisible: isEditableBoxVisible,
    width: currentEditableColumnWidth,
    editableValue: editableValue.value,
    columnType: columnType,
    columnName: editableValue.columnName,
    onUpdateData: handleOnUpdateData,
    selectionOptionLists: selectionOptionLists || {},
    onUpdateSelectionOptionList,
  };

  const valueTableContext = useRef<TableContextTest>({ ...ctxValue });
  valueTableContext.current = { ...ctxValue };

  return (
    <TableContext.Provider value={valueTableContext.current}>
      <TableContainer>
        <TableHeader>
          {columns.map((col) => {
            return (
              <ColumnName
                key={col.fieldName as string}
                ref={(inst) =>
                  inst === null
                    ? refs.delete(col.fieldName)
                    : refs.set(col.fieldName, inst)
                }
                style={{
                  minWidth: col.minWidth
                    ? col.minWidth
                    : columnDefaultByType[col.type].defaultWidth,
                  width: width[col.fieldName],
                }}
                id={col.fieldName as string}
              >
                {columnDefaultByType[col.type].icon}
                <span>{col.name}</span>
              </ColumnName>
            );
          })}
        </TableHeader>

        {rows.map((row, i) => {
          return (
            <Row key={`row-${row.id}`}>
              <div className="row-offset"></div>
              <div className="row-handler">
                <BtnIcon type="button" onClick={() => onNewRow?.(row.id)}>
                  <AddIcon />
                </BtnIcon>
                <BtnIcon type="button" onClick={() => onSelection?.(row.id)}>
                  <DragIcon />
                </BtnIcon>
              </div>

              {columns.map((col, j) => {
                let checked = false;
                if (col.type === PropertyType.Checkbox) {
                  checked = row[col.fieldName as string] as boolean;
                }
                return (
                  <RowCell
                    withPadding={col.type !== PropertyType.Date}
                    className="row-cell"
                    key={`row-${j}-${col.fieldName}`}
                    style={{ width: width[col.fieldName] }}
                    onClick={(event: React.MouseEvent) =>
                      handleClick(event, col, row)
                    }
                    onFocus={() => handleFocus(col, row)}
                  >
                    {getCellType(
                      col.type,
                      row,
                      handleOnChangeCheckbox,
                      col,
                      checked
                    )}
                  </RowCell>
                );
              })}
            </Row>
          );
        })}
        {isEditableBoxVisible && <EditableBox />}
      </TableContainer>
    </TableContext.Provider>
  );
}

export default Table;
