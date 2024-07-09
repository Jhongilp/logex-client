import { IContainer, IExpo, IShipping, SupplierRole } from "types";

import {
  PropertyType,
  IColumn,
  SelectTypeBoxOptionTagList,
} from "types/table-type/table.types";

const initialShipping: IShipping = {
  id: "",
  consignee: "",
  notify: "",
  country: "",
  city: "",
  address: "",
  phone: "",
  email: "",
  transport_mode: "",
  obs: "",
  customerId: "",
  contact: "",
};

export const initialExpo: IExpo = {
  consecutivo: "",
  customer: {
    name: "",
  },
  status: "PREVIO_CARGUE",
  globalProgress: 0,
  todoList: [],
  shipping: initialShipping,
  createdAt: 0,
};

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
    fieldName: "containerNumber",
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
    fieldName: "transportName",
    minWidth: 150,
  },
  {
    type: PropertyType.Text,
    name: "Peso neto",
    fieldName: "netWeight",
    minWidth: 100,
  },
  {
    type: PropertyType.Text,
    name: "Peso bruto",
    fieldName: "grossWeight",
    minWidth: 100,
  },
  {
    type: PropertyType.Text,
    name: "Placa",
    fieldName: "vehicleId",
    minWidth: 100,
  },
  {
    type: PropertyType.Date,
    name: "Cargue",
    fieldName: "dateLoad",
    minWidth: 100,
  },
  {
    type: PropertyType.Date,
    name: "Ingreso a puerto",
    fieldName: "datePortEntry",
    minWidth: 100,
  },
  {
    type: PropertyType.Date,
    name: "Zarpe",
    fieldName: "dateSail",
    minWidth: 100,
  },
];

export const expoTableColumns: IColumn<IContainer>[] = [
  {
    type: PropertyType.Text,
    name: "# Contenedor",
    fieldName: "containerNumber",
    minWidth: 150,
  },
];
