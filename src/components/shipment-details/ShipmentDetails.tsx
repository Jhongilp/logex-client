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
  SelectTypeBoxOptionTagListObj,
} from "types/table-type/table.types";

import Table from "components/table/Table";
import { shipmentTableColumns } from "app_constants";
import ContainerSmallView from "components/shipment-details/screens/container-small-view/ContainerSmallView";
import {
  CreateContainerMutation,
  GetContainerByBookingQuery,
  UpdateContainerMutation,
} from "api";

const defaultEmptyContainer: IContainerInput = {
  containerNumber: "",
  vehicleId: "",
  transportName: "",
  bookingId: "",
  type: "DRY_40HC",
};

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

export default function Shipment() {
  const [error, setError] = useState<null | string>(null);
  const [, createContainer] = useMutation(CreateContainerMutation);
  const [, updateContainer] = useMutation(UpdateContainerMutation);
  const expo = useContext(ExpoContext);

  const [results] = useQuery<{ containers: IContainer[] }>({
    query: GetContainerByBookingQuery,
    variables: { bookingId: expo?.booking?.id },
  });

  // const selectionOptionLists = useShipmentOptionList();
  const selectionOptionLists = containerTypeOptions;
  const [selectedContainer, setSelectedContainer] = useState<null | string>(
    null
  );

  const { data, fetching } = results;
  if (fetching) return <p>Loading...</p>;

  const containerList = data?.containers || [];
  containerList.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
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
    const { rowId, columnName } = editableValue;
    let { value } = editableValue;
    if (rowId && columnName) {
      const rowIndex = clone.findIndex((container) => container.id === rowId);
      const container = containerList[rowIndex];
      if (container) {
        if (
          typeof value === "string" &&
          (columnName === "netWeight" || columnName === "grossWeight")
        ) {
          value = parseFloat(value);
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { createdAt, __typename, ...containerInputData } = container;
        const containerUpdate = { ...containerInputData, [columnName]: value };
        console.log("[handleOnUpdateData] containerUpdate: ", containerUpdate);
        updateContainer({ input: containerUpdate })
          .then((res) => {
            console.log("container updated. ", res);
          })
          .catch((error) => {
            console.log("Error updating container. ", error);
          });
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
