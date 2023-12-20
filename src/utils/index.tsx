import { ReactNode } from "react";
import { Crane, Truck, Ship, Warehouse, DoneAllIcon } from "svgs";
import { ExpoStatus } from "types";
import { SelectTypeBoxOptionTagList } from 'types/table-type/table.types'

export const stepIcon: { [key: string]: ReactNode } = {
  [ExpoStatus.PrevioCargue]: <Warehouse />,
  [ExpoStatus.TransitoPuerto]: <Truck />,
  [ExpoStatus.EnPuerto]: <Crane />,
  [ExpoStatus.TransitoInternacional]: <Ship />,
  [ExpoStatus.EnDestino]: <DoneAllIcon />,
};

export const uuid = (max: number = 13): string =>
  Math.random()
    .toString(16)
    .substring(15 - max);

export const searchFromOptionList = (optionList: SelectTypeBoxOptionTagList, query: string) => {
  let results = [...optionList];
  if (query) {
    results = results.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  }
  return results;
};
