import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "urql";
import { GetShippingQuery, DeleteShippingMutation } from "api/customer.api";
import { EditShippingForm } from "components/customer/shippings/screens/edit-shipping-form/EditShippingForm";
import { Modal } from "styles/Modal/Modal";
import { useMutation } from "urql";

import { BtnIcon, ButtonAct } from "styles/commons";
import {
  StyledCustomerDetailsWrapper,
  StyledInfoLabel,
  StyledCustomerActionWrapper,
  StyledDeleteCustomerBtn,
} from "components/customer/customer.styles";
import { IShipping } from "types";
import { CloseIcon } from "svgs";
import { FormHeader, CloseFormIconWrapper } from "styles/Form/form.styles";

const DeleteShippingModal = ({ customerId, shippingId, isOpen, onClose }) => {
  const [deleteShippingResult, deleteShipping] = useMutation(
    DeleteShippingMutation
  );
  const navigate = useNavigate();

  const handleDeleteShipping = async () => {
    const res = await deleteShipping({ id: shippingId });
    console.log("[customer] res on delete: ", res);
    if (res?.data?.deleteShipping) {
      onClose();
      navigate(`/customers/${customerId}/shippings`);
    }
  };

  const { fetching, error } = deleteShippingResult;

  if (fetching) return <p>Deleting ...</p>;
  if (error) return <p>Error deleting shipping. {error.message}</p>;

  return (
    <Modal open={isOpen} full>
      <CloseFormIconWrapper>
        <BtnIcon type="button" onClick={onClose}>
          <CloseIcon />
        </BtnIcon>
      </CloseFormIconWrapper>
      <FormHeader>
        <h3>Eliminar shipping</h3>
      </FormHeader>

      <p>¿Desea eliminar shipping instruction?</p>
      <StyledDeleteCustomerBtn type="button" onClick={handleDeleteShipping}>
        Eliminar
      </StyledDeleteCustomerBtn>
    </Modal>
  );
};

export const ShippingDetails = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const { shippingId } = useParams();
  const [results] = useQuery<{ shipping: IShipping }>({
    query: GetShippingQuery,
    variables: { id: shippingId },
  });

  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) {
    return (
      <p>
        No es posible obtener datos del cliente en este momento. {error.message}
      </p>
    );
  }

  return (
    <StyledCustomerDetailsWrapper>
      <Modal open={isEditModalOpen} full>
        <EditShippingForm
          onClose={() => setEditModalOpen(false)}
          shipping={data?.shipping}
        />
      </Modal>
      <DeleteShippingModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        shippingId={shippingId}
        customerId={data?.shipping?.customerId}
      />
      <StyledInfoLabel>
        <label>Consignee</label>
        <span>{data?.shipping?.consignee}</span>
      </StyledInfoLabel>
      <StyledInfoLabel>
        <label>Notify</label>
        <span>{data?.shipping?.notify}</span>
      </StyledInfoLabel>
      <StyledInfoLabel>
        <label>País</label>
        <span>{data?.shipping?.country}</span>
      </StyledInfoLabel>
      <StyledInfoLabel>
        <label>Ciudad</label>
        <span>{data?.shipping?.city}</span>
      </StyledInfoLabel>
      <StyledInfoLabel>
        <label>Dirección</label>
        <span>{data?.shipping?.address}</span>
      </StyledInfoLabel>
      <StyledInfoLabel>
        <label>Contacto</label>
        <span>{data?.shipping?.contact}</span>
      </StyledInfoLabel>
      <StyledInfoLabel>
        <label>Email</label>
        <span>{data?.shipping?.email}</span>
      </StyledInfoLabel>
      <StyledInfoLabel>
        <label>Tel</label>
        <span>{data?.shipping?.phone}</span>
      </StyledInfoLabel>
      <StyledInfoLabel>
        <label>Observaciones</label>
        <span>{data?.shipping?.obs}</span>
      </StyledInfoLabel>
      <StyledCustomerActionWrapper>
        <ButtonAct type="button" onClick={() => setEditModalOpen(true)}>
          Editar
        </ButtonAct>
        <StyledDeleteCustomerBtn
          type="button"
          onClick={() => setDeleteModalOpen(true)}
        >
          Eliminar
        </StyledDeleteCustomerBtn>
      </StyledCustomerActionWrapper>
    </StyledCustomerDetailsWrapper>
  );
};
