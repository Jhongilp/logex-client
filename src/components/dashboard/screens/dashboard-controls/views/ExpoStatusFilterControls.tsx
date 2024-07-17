import { useAppDispatch, useAppSelector } from "hooks/store.hooks";
import styled, { css } from "styled-components";
import { Crane, Truck, Ship, Warehouse, DoneAllIcon } from "svgs";
import { BtnIcon } from "styles/commons";
import { ExpoStatus } from "types";
import { updateSelectedStatus } from "components/dashboard/reducers/expoSlide";

const ExpoStatusFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-left: 1px solid var(--color-text-light);
  padding: 0 20px;
  margin-left: 20px;
`;

const BtnIconFilter = styled(BtnIcon)<{ $selected: boolean }>`
  ${(props) =>
    props.$selected &&
    css`
      border: 1px solid #2a75d7;
      background-color: var(--color-main-bg-terciary);
    `}
`;

export const ExpoStatusFilterControls = () => {
  const selectedStatus = useAppSelector((state) => state.expos.selectedStatus);
  const dispatch = useAppDispatch();

  const handleStatusFilter = (status: ExpoStatus) => {
    dispatch(updateSelectedStatus(status));
  };

  return (
    <ExpoStatusFilter>
      <BtnIconFilter
        $selected={selectedStatus === "PREVIO_CARGUE"}
        onClick={() => handleStatusFilter("PREVIO_CARGUE")}
      >
        <Warehouse />
      </BtnIconFilter>
      <BtnIconFilter
        $selected={selectedStatus === "TRANSITO_PUERTO"}
        onClick={() => handleStatusFilter("TRANSITO_PUERTO")}
      >
        <Truck />
      </BtnIconFilter>
      <BtnIconFilter
        $selected={selectedStatus === "EN_PUERTO"}
        onClick={() => handleStatusFilter("EN_PUERTO")}
      >
        <Crane />
      </BtnIconFilter>
      <BtnIconFilter
        $selected={selectedStatus === "TRANSITO_INTERNACIONAL"}
        onClick={() => handleStatusFilter("TRANSITO_INTERNACIONAL")}
      >
        <Ship />
      </BtnIconFilter>
      <BtnIconFilter
        $selected={selectedStatus === "EN_DESTINO"}
        onClick={() => handleStatusFilter("EN_DESTINO")}
      >
        <DoneAllIcon />
      </BtnIconFilter>
      <BtnIconFilter
        $selected={selectedStatus === "FINALIZADO"}
        onClick={() => handleStatusFilter("FINALIZADO")}
      >
        <DoneAllIcon />
      </BtnIconFilter>
    </ExpoStatusFilter>
  );
};
