import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ShipmentDetails,
  ShipmentTableWrapper,
} from "./shipment_details.style";
import { IContainer, ContainerType } from "types";
import {
  IEditableProps,
  SelectTypeBoxOptionTagList,
} from "types/table-type/table.types";
// import {
//   useContenedores,
//   useShipmentOptionList,
//   createContainer,
//   updateContainer,
//   deleteContainer,
// } from "api/exportaciones.api";
import { updateContainerTypeSettings } from "api/settings.api";
import { ExpoParams } from "types/props.types";
import Table from "components/table/Table";
import { shipmentTableColumns } from "app_constants";
import ContainerSmallView from "components/shipment-details/screens/container-small-view/ContainerSmallView";

const defaultEmptyContainer: IContainer = {
  id: "",
  expoId: "",
  transport_name: "",
  container_number: "",
  vehiculo_id: "",
  booking_id: "",
  type: ContainerType._40HQ,
  date_cargue: 0,
  date_ingreso_puerto: 0,
  date_zarpe: 0,
  peso_neto: 0,
  peso_bruto: 0,
  // index: 0,
  createdAt: 0,
};

export default function Shipment() {
  const selectionOptionLists = useShipmentOptionList();
  const [selectedContainer, setSelectedContainer] =
    useState<null | string>(null);
  const { expoId } = useParams<ExpoParams>();
  // const { expo } = useExpo(expoId);
  // const containerList = expo?.containers || {};
  const { containerList, loading } = useContenedores(expoId);
  const [error, setError] = useState<null | string>(null);

  console.log("expo after containers update: ", containerList);

  const handleClickOnAddContainer = () => {
    const emptyContainer: IContainer = {
      ...defaultEmptyContainer,
      createdAt: Date.now(),
      expoId,
    };
    createContainer(expoId, emptyContainer);
  };

  const handleOnUpdateData = (editableValue: IEditableProps) => {
    console.log("[handleOnUpdateData] editableValue: ", editableValue);

    const clone = [...containerList];
    const { value, rowId, columnName } = editableValue;
    if (rowId && columnName) {
      const rowIndex = clone.findIndex((container) => container.id === rowId);
      const container = containerList[rowIndex];
      if (container) {
        const containerUpdate = { ...container, [columnName]: value };
        updateContainer(expoId, container.id, containerUpdate);
      }
    }
  };

  const handleOnDeleteContainer = () => {
    if (selectedContainer) {
      setError(null);
      deleteContainer(expoId, selectedContainer)
        .then(() => {
          setSelectedContainer(null);
        })
        .catch((error) => {
          console.log("Error trying to delete container");
          setError(error);
        });
    }
  };

  const handleOnUpdateSelectionOptionList = (
    updatedOptionList: SelectTypeBoxOptionTagList
  ) => {
    updateContainerTypeSettings(updatedOptionList);
  };

  const handleOnSelection = (containerId: string) => {
    setSelectedContainer(containerId);
  };

  const handleOnCloseModal = () => {
    setSelectedContainer(null);
  };

  const isShipmentEmpty = !Object.keys(containerList).length;

  return (
    <ShipmentDetails>
      {selectedContainer && (
        <ContainerSmallView
          containerId={selectedContainer}
          onClose={handleOnCloseModal}
          onDeleteContainer={handleOnDeleteContainer}
          error={error}
        />
      )}

      <h1>Detalle del despacho</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {isShipmentEmpty ? (
            <div>
              <button type="button" onClick={handleClickOnAddContainer}>
                AGREGAR CONTENEDOR
              </button>
            </div>
          ) : (
            <ShipmentTableWrapper>
              <Table
                tableName="containers_table"
                columns={shipmentTableColumns}
                rows={containerList}
                selectionOptionLists={selectionOptionLists}
                onUpdateData={handleOnUpdateData}
                onNewRow={handleClickOnAddContainer}
                onSelection={handleOnSelection}
                onUpdateSelectionOptionList={handleOnUpdateSelectionOptionList}
              />
            </ShipmentTableWrapper>
          )}
        </div>
      )}
    </ShipmentDetails>
  );
}
