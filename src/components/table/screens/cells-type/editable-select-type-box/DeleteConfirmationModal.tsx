import React from "react";
import {
  BackdropWrapper,
  CenteredModalDeleteConfirmation,
  DeleteConfirmationContent,
  DeleteOptionBtn,
  CancelDeleteOptionBtn,
} from "components/table/screens/cells-type/editable-select-type-box/editableSelectTypebox.style";

type DeleteConfirmationModalProps = {
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal = ({
  onDelete,
  onCancel
}: DeleteConfirmationModalProps) => {
  return (
    <BackdropWrapper open className="backdrop">
      <CenteredModalDeleteConfirmation visible>
        <DeleteConfirmationContent>
          <span>¿Seguro deseas eliminar esta opción?</span>
          <DeleteOptionBtn onClick={onDelete}>Eliminar</DeleteOptionBtn>
          <CancelDeleteOptionBtn onClick={onCancel}>Cancelar</CancelDeleteOptionBtn>
        </DeleteConfirmationContent>
      </CenteredModalDeleteConfirmation>
    </BackdropWrapper>
  );
};

export default DeleteConfirmationModal;
