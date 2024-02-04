import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "urql";
import { GetCustomerQuery } from "api/customer.api";
import { EditCustomerForm } from "components/customer/screens/edit-customer-form/EditCustomerForm";
import { Modal } from "styles/Modal/Modal";
import { useMutation } from "urql";
import { DeleteCustomerMutation } from "api/customer.api";

import { ButtonAct } from "styles/commons";
import {
  StyledCustomerDetailsWrapper,
  StyledInfoLabel,
  StyledCustomerActionWrapper,
  StyledDeleteCustomerBtn,
} from "components/customer/customer.styles";

export const CustomerDetails = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [, deleteCustomer] = useMutation(DeleteCustomerMutation);
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [results] = useQuery({
    query: GetCustomerQuery,
    variables: { id: customerId },
  });

  const handleDeleteCustomer = () => {
    deleteCustomer({ id: customerId })
      .then((res) => {
        console.log("[customer] res on delete: ", res);
        navigate(`/customers`);
      })
      .catch((error) => {
        console.log("Error updating customer: ", error);
        setDeleteModalOpen(false);
      });
  };

  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        No es posible obtener datos del cliente en este momento. {error.message}
      </p>
    );

  return (
    <StyledCustomerDetailsWrapper>
      <Modal open={isEditModalOpen} full>
        <EditCustomerForm
          onClose={() => setEditModalOpen(false)}
          customer={data?.customer}
        />
      </Modal>
      <Modal open={isDeleteModalOpen} full>
        <p>¿Desea eliminar {data?.customer?.name}?</p>
        <StyledDeleteCustomerBtn type="button" onClick={handleDeleteCustomer}>
          Eliminar
        </StyledDeleteCustomerBtn>
      </Modal>
      <StyledInfoLabel>
        <label>Nombre</label>
        <span>{data?.customer?.name}</span>
      </StyledInfoLabel>
      <StyledInfoLabel>
        <label>País</label>
        <span>{data?.customer?.country}</span>
      </StyledInfoLabel>
      <StyledInfoLabel>
        <label>Ciudad</label>
        <span>{data?.customer?.city}</span>
      </StyledInfoLabel>
      <StyledInfoLabel>
        <label>Dirección</label>
        <span>{data?.customer?.address}</span>
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
