import { IContainer, SupplierRole } from "types";

import {
  PropertyType,
  IColumn,
  SelectTypeBoxOptionTagList,
} from "types/table-type/table.types";

export const initialContainerTypeOptions: SelectTypeBoxOptionTagList = [
  {
    id: "1",
    label: "40HQ",
    color: "",
    editable: true,
    deletable: true,
  },
  {
    id: "2",
    label: "40'",
    color: "",
    editable: true,
    deletable: true,
  },
  {
    id: "3",
    label: "20'",
    color: "",
    editable: true,
    deletable: true,
  },
  {
    id: "4",
    label: "REFEER 20'",
    color: "",
    editable: true,
    deletable: true,
  },
];
export const initialSupplierTypeOptions: SelectTypeBoxOptionTagList = [
  {
    id: "1",
    label: SupplierRole.AGENTE_DE_ADUANAS,
    color: "",
    editable: true,
    deletable: true,
  },
  {
    id: "2",
    label: SupplierRole.AGENTE_DE_CARGA,
    color: "",
    editable: true,
    deletable: true,
  },
  {
    id: "3",
    label: SupplierRole.TRANSPORTE_TERRESTRE,
    color: "",
    editable: false,
    deletable: false,
  },
  {
    id: "4",
    label: SupplierRole.SOCIEDAD_PORTUARIA,
    color: "",
    editable: true,
    deletable: true,
  },
  {
    id: "5",
    label: SupplierRole.OPERADOR_PORTUARIO,
    color: "",
    editable: true,
    deletable: true,
  },
  {
    id: "6",
    label: SupplierRole.NAVIERA,
    color: "",
    editable: true,
    deletable: true,
  },
];

export const shipmentTableColumns: IColumn<IContainer>[] = [
  {
    type: PropertyType.Text,
    name: "# Contenedor",
    fieldName: "container_number",
    minWidth: 150,
  },
  {
    type: PropertyType.Select,
    name: "Tipo",
    fieldName: "type",
    minWidth: 70,
  },
  {
    type: PropertyType.Select,
    name: "Transportador",
    fieldName: "transport_name",
    minWidth: 150,
  },
  {
    type: PropertyType.Text,
    name: "Peso bruto",
    fieldName: "peso_bruto",
    minWidth: 100,
  },
  {
    type: PropertyType.Text,
    name: "Placa",
    fieldName: "vehiculo_id",
    minWidth: 100,
  },
  {
    type: PropertyType.Date,
    name: "Cargue",
    fieldName: "date_cargue",
    minWidth: 100,
  },
  {
    type: PropertyType.Date,
    name: "Ingreso a puerto",
    fieldName: "date_ingreso_puerto",
    minWidth: 100,
  },
  {
    type: PropertyType.Date,
    name: "Zarpe",
    fieldName: "date_zarpe",
    minWidth: 100,
  },
];

export const expoTableColumns: IColumn<IContainer>[] = [
  {
    type: PropertyType.Text,
    name: "# Contenedor",
    fieldName: "container_number",
    minWidth: 150,
  },
];
