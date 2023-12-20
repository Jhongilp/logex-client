import { StepList } from 'types/stepper-type/stepper.types';

export enum ExpoStatusNumber {
  PrevioCargue = 1,
  TransitoPuerto,
  EnPuerto,
  TransitoInternacional,
  EnDestino,
  Finalizado,
}

export enum ExpoStatus {
  PrevioCargue = "Previo Cargue",
  TransitoPuerto = "Transito Puerto",
  EnPuerto = "En Puerto",
  TransitoInternacional = "Transito Internacional",
  EnDestino = "En Destino",
  Finalizado = "Finalizado",
}

interface ObjectLiteral {
  [key: number]: ExpoStatus;
}

export const STATUS: ObjectLiteral = {
  1: ExpoStatus.PrevioCargue,
  2: ExpoStatus.TransitoPuerto,
  3: ExpoStatus.EnPuerto,
  4: ExpoStatus.TransitoInternacional,
  5: ExpoStatus.EnDestino,
  6: ExpoStatus.Finalizado,
};

export enum ContainerType {
  _20 = "20'",
  _40 = "40'",
  _40HQ = "40HQ",
  _REFEER = "REFEER",
}

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// export enum ModoTransporte {
//   AEREO,
//   MARITIMO,
//   TERRESTRE,
// }
export enum ModoTransporte {
  AEREO = "AEREO",
  MARITIMO = "MARITIMO",
  TERRESTRE = "TERRESTRE",
}

export enum SupplierRole {
  AGENTE_DE_ADUANAS = "AGENTE DE ADUANAS",
  AGENTE_DE_CARGA = "AGENTE DE CARGA",
  TRANSPORTE_TERRESTRE = "TRANSPORTE TERRESTRE",
  NAVIERA = "NAVIERA",
  SOCIEDAD_PORTUARIA = "SOCIEDAD PORTURARIA",
  OPERADOR_PORTUARIO = "OPERADOR PORTUARIO",
}

interface IContact {}
interface IInspeccion {}
interface ISello {}
interface IIndicador {}
interface ILiquidacion {}
interface IDocument {}

export interface IBroker {
  id: string;
  name: string;
  contactos?: IContact[];
}

export enum Country {
  Ecuador = "Ecuador",
  Peru = "Peru",
  Chile = "Chile",
  Brasil = "Brasil",
  Mexico = "México",
  Espana = "España",
  Belgica = "Bélgica",
  EmiratosArabes = "Emiratos Arabes Unidos",
  EstadosUnidos = "Estados Unidos",
}

export const PuertoZarpeOptions = {
  SPRBUN: "SPRBUN",
  TCBUEN: "TCBUEN",
  SPRCTG: "SPRCTG",
  CONTECAR: "CONTECAR",
  AGUA_DULCE: "AGUA DULCE",
};

export enum SailingPortOptions {
  SPRBUN,
  TCBUEN,
  SPRCTG,
  CONTECAR,
  AGUA_DULCE,
};

export enum OriginCityOptions {
  BOGOTA,
  CALI,
  MEDELLIN,
  BUENAVENTURA,
  CARTAGENA,
  SANTAMARTA,
  BARRANQUILLA,
  TURBO,
  IPIALES,
  CUCUTA,
}

export const CiudadZarpe: { [key: string]: ISealingCity } = {
  BOGOTA: { name: "Bogotá", alias: "BOG" },
  CALI: { name: "Cali", alias: "CLO" },
  MEDELLIN: { name: "Medellín", alias: "MDE" },
  BUENAVENTURA: { name: "Buenaventura", alias: "BUN" },
  CARTAGENA: { name: "Cartagena", alias: "CTG" },
  SANTAMARTA: { name: "Santa Marta", alias: "STA" },
  BARRANQUILLA: { name: "Barranquilla", alias: "B/QUILLA" },
  TURBO: { name: "Turbo", alias: "TURBO" },
  IPIALES: { name: "Ipiales", alias: "IPIALES" },
  CUCUTA: { name: "Cucúta", alias: "CTA" },
};

export interface ISealingCity {
  name: string;
  alias: string;
}

export interface IPuertoZarpe {
  name: string;
  alias: string;
  //   city: ISealingCity;
}

export const PuertoZarpe: { [id: string]: IPuertoZarpe } = {
  SPRBUN: {
    name: "Sociedad Portuaria de Buenaventura",
    alias: PuertoZarpeOptions.SPRBUN,
    // city: CiudadZarpe.BUENAVENTURA,
  },
  TCBUEN: {
    name: "Terminal de Contenedores TCBUEN",
    alias: PuertoZarpeOptions.TCBUEN,
    // city: CiudadZarpe.BUENAVENTURA,
  },
  SPRCTG: {
    name: "Sociedad Portuaria Regional de Cartagena",
    alias: PuertoZarpeOptions.SPRCTG,
    // city: CiudadZarpe.CARTAGENA,
  },
  CONTECAR: {
    name: "Terminal de Contenedores de Cartagena",
    alias: PuertoZarpeOptions.CONTECAR,
    // city: CiudadZarpe.CARTAGENA,
  },
  AGUA_DULCE: {
    name: "Terminal de Contenedores Agua Dulce",
    alias: PuertoZarpeOptions.AGUA_DULCE,
    // city: CiudadZarpe.BUENAVENTURA,
  },
};

export interface ICliente {
  id: string;
  name: string;
  // shippings: IShipping[];
  country: string;
  city: string;
  address: string;
}
export interface ISupplier {
  id: string;
  supplierId: string;
  name: string;
  role: string;
  alias: string;
  createdAt: number;
}
export type SupplierList = ISupplier[]


export interface IShipping {
  consignee: string;
  notify: string;
  country: string;
  city: string;
  transport_mode: string;
  address: string;
  contact: string;
  email: string;
  phone: string;
  obs: string;
  // ciudad_puerto_zarpe?: ISealingCity;
  ciudad_puerto_zarpe?: OriginCityOptions;
  puerto_zarpe?: SailingPortOptions;
}

export interface IContainer {
  id: string;
  expoId: string;
  container_number: string;
  vehiculo_id: string;
  transport_name: string;
  booking_id: string;
  type: ContainerType;
  date_retiro?: number;
  date_cargue: number;
  date_ingreso_puerto: number;
  date_zarpe: number;
  peso_neto: number;
  peso_bruto: number;
  sellos?: ISello[];
  documentos?: string[]; // packing list, invoice, invima, ica, co, others
  inspecciones?: IInspeccion[];
  indicadores?: IIndicador[];
  liquidacion?: ILiquidacion;
  // index: number,
  createdAt: number,
  // [key: string]: string | boolean | number | undefined | ISello;
}

export type ContainerList = {[key: string]: IContainer};
export type ContainerListArray = IContainer[];

export interface IReserva {
  consignee: string;
  notify: string;
  shipping_company: string;
  broker: string;
  transport_mode: ModoTransporte;
  ciudad_puerto_zarpe?: ISealingCity;
  puerto_zarpe: IPuertoZarpe;
  destination_country: string;
  destination_city: string;  
  booking_number: string;
  documento_transporte_id: string;
  name_motonave?: string;
  voyage?: string;
  eta: number;
  etd: number;
  eta_destino: number;
  date_cierre_documental: number;
  date_cierre_fisico: number;
  rollover?: boolean;
  // contenedores: string[];
}

export enum ProgressStatus {
  "Sin iniciar" = "Sin iniciar",
  "En curso" = "En curso",
  "En espera" = "En espera",
  "Retrasado" = "Retrasado", 
  "Completado" = "Completado"
}

export interface IExpoActivitiesSettings {
  id: string;
  name: string;
  status: ExpoStatus;
  progress: ProgressStatus;
  responsible: string;
  optional: boolean;
  enabled: boolean;
  completedAt?: Date | undefined;
  deadline?: Date | undefined;
  // [key: string]: string | boolean | undefined | ProgressStatus | Date;
}

export type ExpoActivityList = IExpoActivitiesSettings[]

export interface IExpo {
  consecutivo: string;
  customer_name: string;
  destination_country?: string;
  puerto_destino?: string;
  transport_mode: ModoTransporte;
  customer_id: string;
  booking?: IReserva;
  selected_shipping?: string;
  // status: ExpoStatusNumber;
  status: ExpoStatus;
  globalProgress: number;
  stagesProgress: StepList;
  todo_list: ExpoActivityList;
  containers?: ContainerList;
  indicatator_month?: Month;
  oc?: string;
  documentos?: string[];
  indicadores?: string[];
  liquidaciones?: string[];
  fecha_envio_documentos?: string;
  docs_tracking_id?: string;
  observaciones?: string[];
  createdAt: number;
}

export interface IVehiculo {
  id: string;
  placa: string;
  driver_id: string;
  empresa_id: string;
}

export interface IEmpresaTransporte {
  id: string;
  name: string;
}

export interface IDriver {
  id: string;
  name: string;
}

export enum RoleName {
  ADMIN,
  COORD,
  AUX
}

export interface IUser {
  email: string;
  first_name: string;
  second_name: string;
  first_lastname: string;
  second_lastname: string;
  company_name: string;
  company_id: string;
  role: RoleName;
}

export interface IUserInput extends IUser {
  password1: string;
  password2: string;
}