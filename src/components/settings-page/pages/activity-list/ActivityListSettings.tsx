import styled from "styled-components";
import { useQuery, useMutation } from "urql";
import {
  DefaultExpoActivitiesQuery,
  updateDefaultExpoActivityQuery,
} from "api";

import {
  ExpoActivityList,
  IExpoActivitiesSettings,
  // ProgressStatus,
} from "types";
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

// const getEmptyRow = () => {
//   // const id = uuid();
//   const id = 999999; // temp value
//   const emptyRow: IExpoActivitiesSettings = {
//     id,
//     name: "",
//     responsible: "",
//     status: "PREVIO_CARGUE",
//     enabled: true,
//     optional: false,
//     progress: ProgressStatus["Sin iniciar"],
//   };
//   return emptyRow;
// };

const ActivityListSettings = () => {
  const [, updateDefaultExpoActivity] = useMutation(
    updateDefaultExpoActivityQuery
  );
  const [results] = useQuery<{ defaultExpoActivities: ExpoActivityList }>({
    query: DefaultExpoActivitiesQuery,
  });

  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  // const handleOnNewRow = (todoItemId: string) => {
  const handleOnNewRow = () => {
    // const clone = [...settings];
    // const listItemIndex = clone.findIndex(
    //   (todoItem) => todoItem.id === todoItemId
    // );
    // clone.splice(listItemIndex + 1, 0, getEmptyRow());
    // update(clone);
  };

  const handleOnUpdateData = (editableValue: IEditableProps) => {
    console.log("[settings] [onUpdateData] editableValue: ", editableValue);
    const { value, rowId, columnName } = editableValue;
    const activity = data?.defaultExpoActivities.find((act) => act.id == rowId);
    delete activity.__typename; // urlq property
    const updated = {
      ...activity,
      [columnName]: value,
    };
    updateDefaultExpoActivity({ input: updated })
      .then((res) => {
        console.log("[activity][update] res: ", res);
      })
      .catch((error) => {
        console.log("[activity][update] error: ", error);
      });
  };

  data?.defaultExpoActivities.sort((a, b) => {
    return parseInt(a.id as string) - parseInt(b.id as string);
  });

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
