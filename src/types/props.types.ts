import React from "react";
import {
  IExpo,
  ICliente,
  IShipping,
  IUser,
  ExpoActivityList,
  ContainerListArray,
  SupplierList,
  ExpoStatus,
} from "types";

export interface ISettingsReducer {
  expo: ExpoActivityList;
}

export type ExpoParams = {
  expoId: string;
};

export interface MenuExpoLink {
  to: string;
  label: string;
}

export type StateType = {
  exportaciones: ExpoList;
  customers: CustomerList;
  users: IUser;
  settings: ISettingsReducer;
};

export type ExpoList = { [expoId: string]: IExpo };
export type CustomerList = { [customerId: string]: ICliente };
export type ShippingList = { [shippingId: string]: IShipping };

export type SelectableShippingProps = {
  shippings: ShippingList;
  onSelectShipping: (event: React.SyntheticEvent<HTMLInputElement>) => void;
};

export type TableExpoProps = { exportaciones: ExpoList };

export type ExpoIdProp = {
  expoId: string;
};

export type FetchExpo = {
  expo: IExpo;
  loading: boolean;
};

export type FetchSupplierList = {
  supplierList: SupplierList;
  loading: boolean;
};

export type FetchContainerList = {
  containerList: ContainerListArray;
  loading: boolean;
};

export type FetchExpoActivities = {
  activityList: ExpoActivityList;
  loading: boolean;
};

export type ExpoItemProps = {
  expo: IExpo;
};

export type CustomerParams = {
  customerId: string;
};

export type CreateShippingProps = {
  customerId: string;
  onClose: () => void;
};

export type EditShippingProps = {
  customerId: string;
  onClose: () => void;
  shippingId: string | null;
};

export type UpdateExpoProgressProps = {
  todo_list: ExpoActivityList,
  globalProgress: number,
  status: ExpoStatus
}


// icons
type Size = "small" | "medium" | "regular";
export type IconType = {
  size?: Size;
  width?: number;
  height?: number;
};
