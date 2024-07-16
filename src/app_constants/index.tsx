import { IBooking, IContainer, IExpo, IShipping, SupplierRole } from "types";

import {
  PropertyType,
  IColumn,
  SelectTypeBoxOptionTagList,
  SelectTypeBoxOptionTagListObj,
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
  createdAt: new Date(),
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
    minWidth: 120,
  },
  {
    type: PropertyType.Date,
    name: "Ingreso a puerto",
    fieldName: "datePortEntry",
    minWidth: 120,
  },
  {
    type: PropertyType.Date,
    name: "Zarpe",
    fieldName: "dateSail",
    minWidth: 120,
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

type ExpoContainerTableColumnKeys = IExpo & IContainer & IShipping & IBooking;
export const expoContainerTableColumns: IColumn<ExpoContainerTableColumnKeys>[] =
  [
    {
      type: PropertyType.Text,
      name: "# Contenedor",
      fieldName: "containerNumber",
      minWidth: 150,
    },
    {
      type: PropertyType.Text,
      name: "Expo",
      fieldName: "consecutivo",
      minWidth: 150,
    },
    {
      type: PropertyType.Text,
      name: "Cliente",
      fieldName: "customer",
      minWidth: 150,
    },
    {
      type: PropertyType.Text,
      name: "Estado",
      fieldName: "status",
      minWidth: 150,
    },
    {
      type: PropertyType.Text,
      name: "Reserva",
      fieldName: "bookingNumber",
      minWidth: 150,
    },

    {
      type: PropertyType.Text,
      name: "País destino",
      fieldName: "country",
      minWidth: 150,
    },
    {
      type: PropertyType.Text,
      name: "Puerto zarpe",
      fieldName: "cityBondPort",
      minWidth: 150,
    },
  ];

export const containerTypeOptions: SelectTypeBoxOptionTagListObj = {
  type: {
    data: [
      {
        id: "1",
        label: "DRY_20",
        color: "blue",
        editable: false,
        deletable: false,
      },
      {
        id: "2",
        label: "DRY_40",
        color: "blue",
        editable: false,
        deletable: false,
      },
      {
        id: "3",
        label: "DRY_40HC",
        color: "blue",
        editable: false,
        deletable: false,
      },
      {
        id: "4",
        label: "REEFER_20",
        color: "blue",
        editable: false,
        deletable: false,
      },
      {
        id: "5",
        label: "REEFER_40",
        color: "blue",
        editable: false,
        deletable: false,
      },
      {
        id: "6",
        label: "REEFER_40HC",
        color: "blue",
        editable: false,
        deletable: false,
      },
    ],
    editable: false,
  },
};
