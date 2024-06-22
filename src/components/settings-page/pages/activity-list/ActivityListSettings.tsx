// import { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "urql";
import { DefaultExpoActivitiesQuery } from "api";

// import {
//   getCompanyExpoDefaultActivities,
//   updateExpoSettings,
// } from "api/settings.api";
import {
  ExpoActivityList,
  IExpoActivitiesSettings,
  ProgressStatus,
} from "types";
import { uuid } from "utils";
import {
  PropertyType,
  IColumn,
  IEditableProps,
} from "types/table-type/table.types";

import Table from "components/table/Table";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > h3 {
    color: var(--color-text-dominant);
  }
`;

const columns: IColumn<IExpoActivitiesSettings>[] = [
  {
    type: PropertyType.Text,
    name: "Actividad",
    fieldName: "name",
  },
  {
    type: PropertyType.Person,
    name: "Responsable",
    fieldName: "responsible",
  },
  {
    type: PropertyType.Select,
    name: "Estado",
    fieldName: "status",
  },
  {
    type: PropertyType.Checkbox,
    name: "Habilitado",
    fieldName: "enabled",
  },
  {
    type: PropertyType.Checkbox,
    name: "Opcional",
    fieldName: "optional",
  },
];

const getEmptyRow = () => {
  const id = uuid();
  const emptyRow: IExpoActivitiesSettings = {
    id,
    name: "",
    responsible: "",
    status: "PREVIO_CARGUE",
    enabled: true,
    optional: false,
    progress: ProgressStatus["Sin iniciar"],
  };
  return emptyRow;
};

const ActivityListSettings = () => {
  // const [settings, setSettings] = useState<ExpoActivityList>([]);
  const [results] = useQuery<{ defaultExpoActivities: ExpoActivityList }>({
    query: DefaultExpoActivitiesQuery,
  });

  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  // useEffect(() => {
  //   getCompanyExpoDefaultActivities()
  //     .then((res) => {
  //       console.log("getCompanyExpoDefaultActivities: ", res);
  //       setSettings(res);
  //     })
  //     .catch((error) => {});
  // }, []);

  // const update = (newSettings: ExpoActivityList) => {
  //   // const backup = [...settings];
  //   // setSettings(newSettings);
  //   // updateExpoSettings(newSettings)
  //   //   .then(() => {
  //   //     console.log("settings updated!");
  //   //   })
  //   //   .catch((error) => {
  //   //     console.warn("Error updating settings: ", error);
  //   //     setSettings(backup);
  //   //   });
  // };

  const handleOnNewRow = (todoItemId: string) => {
    // const clone = [...settings];
    // const listItemIndex = clone.findIndex(
    //   (todoItem) => todoItem.id === todoItemId
    // );
    // clone.splice(listItemIndex + 1, 0, getEmptyRow());
    // update(clone);
  };

  const handleOnUpdateData = (editableValue: IEditableProps) => {
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
      <h3>Lista de actividades</h3>
      <Table
        tableName="settings_table"
        columns={columns}
        rows={data?.defaultExpoActivities}
        onNewRow={handleOnNewRow}
        onUpdateData={handleOnUpdateData}
      />
    </Wrapper>
  );
};

export default ActivityListSettings;
