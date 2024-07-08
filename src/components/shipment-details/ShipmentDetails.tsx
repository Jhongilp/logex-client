import { useState, useContext } from "react";
import { useMutation, useQuery } from "urql";
import { ExpoContext } from "components/expo-page/ExpoPage";
import {
  ShipmentDetails,
  ShipmentTableWrapper,
} from "./shipment_details.style";
import { IContainer, IContainerInput } from "types";
import {
  IEditableProps,
  SelectTypeBoxOptionTagList,
} from "types/table-type/table.types";

import Table from "components/table/Table";
import { shipmentTableColumns } from "app_constants";
import ContainerSmallView from "components/shipment-details/screens/container-small-view/ContainerSmallView";
import { CreateContainerMutation, GetContainerByBookingQuery } from "api";

const defaultEmptyContainer: IContainerInput = {
  containerNumber: "",
  vehicleId: "",
  transportName: "",
  bookingId: "",
  type: "DRY_40HC",
};

export default function Shipment() {
  const [error, setError] = useState<null | string>(null);
  const [, createContainer] = useMutation(CreateContainerMutation);
  const expo = useContext(ExpoContext);


  const [results] = useQuery<{ containers: IContainer[] }>({
    query: GetContainerByBookingQuery,
    variables: { bookingId: expo?.booking?.id },
  });

  // const selectionOptionLists = useShipmentOptionList();
  const selectionOptionLists = {};
  const [selectedContainer, setSelectedContainer] = useState<null | string>(
    null
  );

  const { data, fetching } = results;
  if (fetching) return <p>Loading...</p>;

  const containerList = data?.containers || [];
  // const containerList = expo?.containers || {};
  // const { containerList, loading } = useContenedores(expoId);
  // const { containerList, loading } = { containerList: [], loading: false };
  

  console.log("expo after containers update: ", containerList);

  const handleClickOnAddContainer = () => {
    if (!expo?.booking?.id) {
      console.error("No booking number found in expo. Cannot add container.");
      return;
    }
    const { consecutivo, booking } = expo;
    console.log("[add container] emptyContainer: ", consecutivo, booking?.id);
    const emptyContainer: IContainerInput = {
      ...defaultEmptyContainer,
      bookingId: booking?.id,
    };
    createContainer({ input: emptyContainer })
      .then((res) => {
        console.log("container created. ", res);
      })
      .catch((error) => {
        console.log("Error creating container. ", error);
      });
    // createContainer(expoId, emptyContainer);
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
        console.log("[handleOnUpdateData] containerUpdate: ", containerUpdate);
        // updateContainer(expoId, container.id, containerUpdate);
      }
    }
  };

  const handleOnDeleteContainer = () => {
    if (selectedContainer) {
      setError(null);
      // deleteContainer(expoId, selectedContainer)
      //   .then(() => {
      //     setSelectedContainer(null);
      //   })
      //   .catch((error) => {
      //     console.log("Error trying to delete container");
      //     setError(error);
      //   });
    }
  };

  const handleOnUpdateSelectionOptionList = (
    updatedOptionList: SelectTypeBoxOptionTagList
  ) => {
    // updateContainerTypeSettings(updatedOptionList);
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
      {fetching ? (
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
