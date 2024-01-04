import styled from "styled-components";

import { ICliente } from "types";

import {
  PropertyType,
  IColumn,
  IEditableProps,
} from "types/table-type/table.types";

import Table from "components/table/Table";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-left: 60px;

  > h3 {
    color: var(--color-text-dominant);
  }
`;

const columns: IColumn<ICliente>[] = [
  {
    type: PropertyType.Text,
    name: "Cliente",
    fieldName: "name",
  },
  {
    type: PropertyType.Text,
    name: "País",
    fieldName: "country",
  },
  {
    type: PropertyType.Text,
    name: "Ciudad",
    fieldName: "city",
  },
  {
    type: PropertyType.Text,
    name: "Dirección",
    fieldName: "address",
  },
];

const getEmptyRow = () => {
  const emptyRow: ICliente = {
    id: 0,
    name: "",
    country: "",
    city: "",
    address: "",
  };
  return emptyRow;
};

export const CustomerTable = ({ customers }: { customers: ICliente[] }) => {
  // const [settings, setSettings] = useState<ExpoActivityList>([]);

  // useEffect(() => {
  //   getCompanyExpoDefaultActivities()
  //     .then((res) => {
  //       console.log("getCompanyExpoDefaultActivities: ", res);
  //       setSettings(res);
  //     })
  //     .catch((error) => {});
  // }, []);

  const update = () => {
    // const backup = [...settings];
    // setSettings(newSettings);
    // updateExpoSettings(newSettings)
    //   .then(() => {
    //     console.log("settings updated!");
    //   })
    //   .catch((error) => {
    //     console.warn("Error updating settings: ", error);
    //     setSettings(backup);
    //   });
    return;
  };

  const handleOnNewRow = (todoItemId: string) => {
    return;
    const clone = [...customers];
    const listItemIndex = clone.findIndex(
      (todoItem) => `${todoItem.id}` === todoItemId
    );
    clone.splice(listItemIndex + 1, 0, getEmptyRow());
    // update(clone);
  };

  const handleOnUpdateData = (editableValue: IEditableProps) => {
    return;
    // const clone = [...settings];
    // const { value, rowId, columnName } = editableValue;
    // if (rowId && columnName) {
    //   const rowIndex = clone.findIndex((todoItem) => todoItem.id === rowId);
    //   const row = settings[rowIndex];
    //   clone[rowIndex] = {
    //     ...row,
    //     [columnName]: value,
    //   };
    //   update(clone);
    // }
  };

  return (
    <Wrapper>
      <Table
        tableName="settings_table"
        columns={columns}
        rows={customers}
        onNewRow={handleOnNewRow}
        onUpdateData={handleOnUpdateData}
      />
    </Wrapper>
  );
};
