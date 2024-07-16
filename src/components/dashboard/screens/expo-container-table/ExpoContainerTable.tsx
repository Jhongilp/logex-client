import { useQuery } from "urql";
import { GetExposWithContainers } from "api";
import {
  MainBoardWrapper,
  TableWrapper,
} from "components/dashboard/screens/expo-table/expo_table.style";
import { ExpoList } from "types/props.types";
import Table from "components/table/Table";
import { expoContainerTableColumns } from "app_constants";
import { IBooking, IContainer, IExpo, IShipping } from "types";

type FlatExpoData = IExpo & IBooking & IShipping & IContainer;
const flatExpoData = (expos: ExpoList = []) => {
  const containerList: FlatExpoData[] = [];
  expos.forEach((expo) => {
    if (expo.containers.length) {
      expo.containers.forEach((container) => {
        const expoFlatData = {
          consecutivo: expo.consecutivo,
          createdAt: expo.createdAt,
          globalProgress: expo.globalProgress,
          status: expo.status,
          customerName: expo.customer?.name,
          ...expo.booking,
          ...expo.shipping,
          ...container,
        };
        containerList.push(expoFlatData);
      });
    }
  });
  return containerList;
};

export const ExpoContainerTable = () => {
  const [results] = useQuery<{ expos: ExpoList }>({
    query: GetExposWithContainers,
  });

  const exportaciones: ExpoList = results?.data?.expos ?? [];
  const exportacionesFlat = flatExpoData(exportaciones);
  console.log("[expo-containers][exportaciones] ", exportaciones);
  console.log("[expo-containers][flat data] ", exportacionesFlat);
  // TODO I need to flatten the data to be able to show it in the table - IBooking, IShipping, IContainer

  return (
    <MainBoardWrapper>
      <TableWrapper>
        <Table
          tableName="expo-container-list_table"
          columns={expoContainerTableColumns}
          rows={exportacionesFlat}
          // selectionOptionLists={selectionOptionLists}
          // onUpdateData={handleOnUpdateData}
          // onNewRow={handleClickOnAddContainer}
          // onSelection={handleOnSelection}
          // onUpdateSelectionOptionList={handleOnUpdateSelectionOptionList}
        />
      </TableWrapper>
    </MainBoardWrapper>
  );
};
