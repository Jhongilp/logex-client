import React from "react";

import {
  DateIcon,
  CheckboxIcon,
  EmailContactIcon,
  FileIcon,
  NumbersIcon,
  PhoneContactIcon,
  TextIcon,
  UsersIcon,
} from "svgs";

export enum PropertyType {
  Text,
  Number,
  Select,
  Progress,
  Date,
  Person,
  Files,
  Checkbox,
  URL,
  Email,
  Phone,
}

export type ColumnDefaultValues = {
  icon: JSX.Element;
  defaultWidth: number;
};
export interface ColumnObjectLiteral {
  [key: number]: ColumnDefaultValues;
}

export const columnDefaultByType: ColumnObjectLiteral = {
  [PropertyType.Text]: {
    icon: <TextIcon />,
    defaultWidth: 210,
  },
  [PropertyType.Number]: {
    icon: <NumbersIcon />,
    defaultWidth: 100,
  },
  [PropertyType.Person]: {
    icon: <UsersIcon />,
    defaultWidth: 120,
  },
  [PropertyType.Files]: {
    icon: <FileIcon />,
    defaultWidth: 100,
  },
  [PropertyType.Progress]: {
    icon: <CheckboxIcon />,
    defaultWidth: 100,
  },
  [PropertyType.Select]: {
    icon: <CheckboxIcon />,
    defaultWidth: 100,
  },
  [PropertyType.Checkbox]: {
    icon: <CheckboxIcon />,
    defaultWidth: 100,
  },
  [PropertyType.Email]: {
    icon: <EmailContactIcon />,
    defaultWidth: 120,
  },
  [PropertyType.Phone]: {
    icon: <PhoneContactIcon />,
    defaultWidth: 100,
  },
  [PropertyType.Date]: {
    icon: <DateIcon />,
    defaultWidth: 100,
  },
};

export interface IColumn<T> {
  type: PropertyType;
  name: string;
  fieldName: keyof T;
  minWidth?: number;
}

export type IRow = { [key: string]: any };

export interface IEditableProps {
  value: string | boolean;
  rowId: null | string;
  columnName: null | string;
}

export type TSelectTypeBoxOptionTag = {
  id: string;
  label: string;
  color: string;
  editable: boolean;
  deletable: boolean;
};

export type SelectTypeBoxOptionTagList = TSelectTypeBoxOptionTag[];
export type SelectTypeBoxOptionTagListObj = {
  [key: string]: {
    data: SelectTypeBoxOptionTagList,
    editable: boolean,
  };
};

export type FetchedSelectTypeBoxOptionTag = {
  options: SelectTypeBoxOptionTagList;
};

export type TableProps<T> = {
  tableName: string;
  columns: IColumn<T>[];
  rows: IRow[];
  selectionOptionLists?: SelectTypeBoxOptionTagListObj;
  onNewRow?: (rowId: string) => void;
  onSelection?: (position: string) => void;
  onUpdateData?: (editableValues: IEditableProps) => void;
  onUpdateSelectionOptionList?: (columnOptionList: SelectTypeBoxOptionTagList) => void;
};

export type EditableBoxProps = {
  x: number;
  y: number;
  isVisible: boolean;
  width: number;
  editableValue: string | boolean;
  columnType: PropertyType;
  columnName: string | null;
  onUpdateData?: (newValue: string) => void | undefined;
  onUpdateSelectionOptionList?: (columnOptionList: SelectTypeBoxOptionTagList) => void;
};

export type SelectionOptionLists =
  | {
      selectionOptionLists: SelectTypeBoxOptionTagListObj;
    }
  | undefined;

export type TableContextTest = EditableBoxProps & SelectionOptionLists;
