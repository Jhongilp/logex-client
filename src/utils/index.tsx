import { ReactNode } from "react";
import { Crane, Truck, Ship, Warehouse, DoneAllIcon } from "svgs";
import { ExpoStatus, ProgressStatus } from "types";
import { SelectTypeBoxOptionTagList } from "types/table-type/table.types";

type StageString = {
  [K in ExpoStatus]: string;
};

export const expoStatusToString = (stage: ExpoStatus): string => {
  const obj: StageString = {
    PREVIO_CARGUE: "Previo Cargue",
    TRANSITO_PUERTO: "Transito Puerto",
    EN_PUERTO: "En Puerto",
    TRANSITO_INTERNACIONAL: "Transito Internacional",
    EN_DESTINO: "En Destino",
    FINALIZADO: "Finalizado",
  };
  if (!obj[stage]) {
    return obj["PREVIO_CARGUE"];
  }
  return obj[stage];
};

export const progressStatusObj = {
  SIN_INICIAR: "Sin iniciar",
  EN_CURSO: "En curso",
  EN_ESPERA: "En espera",
  RETRASADO: "Retrasado",
  COMPLETADO: "Completado",
};

export const progressStatusToString = (
  progressStatus: ProgressStatus
): string => {
  const obj = progressStatusObj;
  if (!obj[progressStatus]) {
    return obj["SIN_INICIAR"];
  }
  return obj[progressStatus];
};

type stepIconProps = {
  [K in ExpoStatus]: ReactNode;
};

export const stepIcon: stepIconProps = {
  PREVIO_CARGUE: <Warehouse />,
  TRANSITO_PUERTO: <Truck />,
  EN_PUERTO: <Crane />,
  TRANSITO_INTERNACIONAL: <Ship />,
  EN_DESTINO: <DoneAllIcon />,
  FINALIZADO: <DoneAllIcon />,
};

export const uuid = (max: number = 13): string =>
  Math.random()
    .toString(16)
    .substring(15 - max);

export const searchFromOptionList = (
  optionList: SelectTypeBoxOptionTagList,
  query: string
) => {
  let results = [...optionList];
  if (query) {
    results = results.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  }
  return results;
};

export const dateStringToInputDate = (dateString: string = "") => {
  try {
    const dateInput = new Date(dateString).toISOString().slice(0, 10);
    return dateInput;
  } catch (error) {
    console.error("Error parsing date string: ", error);
  }
};