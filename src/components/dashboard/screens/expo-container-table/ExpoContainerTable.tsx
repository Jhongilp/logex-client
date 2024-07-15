import { useQuery } from "urql";
import { GetExposWithContainers } from "api";
import {
  MainBoardWrapper,
  TableWrapper,
} from "components/dashboard/screens/expo-table/expo_table.style";
import { ExpoList } from "types/props.types";

export const ExpoContainerTable = () => {
  const [results] = useQuery<{ expos: ExpoList }>({
    query: GetExposWithContainers,
  });

  const exportaciones: ExpoList = results?.data?.expos;
  console.log("[exportaciones] ", exportaciones);
  return (
    <MainBoardWrapper>
      <TableWrapper>Expo container table</TableWrapper>
    </MainBoardWrapper>
  );
};
