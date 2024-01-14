import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "urql";
import { GetShippingQuery } from "api/customer.api";
import { EditCustomerForm } from "components/customer/screens/edit-customer-form/EditCustomerForm";
import { Modal } from "styles/Modal/Modal";
// import { useMutation } from "urql";

import { ButtonAct } from "styles/commons";
import {
  StyledCustomerDetailsWrapper,
  StyledInfoLabel,
  StyledCustomerActionWrapper,
  StyledDeleteCustomerBtn,
} from "components/customer/customer.styles";
import { IShipping } from "types";

export const ShippingDetails = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  // const [deleteStatus, deleteCustomer] = useMutation(DeleteCustomerMutation);
  const navigate = useNavigate();
  const params = useParams();
  console.log("[shipping-details] params: ", params)
  const [results] = useQuery<{shipping: IShipping}>({
    query: GetShippingQuery,
    variables: { id: parseInt(params?.shippingId) },
  });

  const handleDeleteCustomer = () => {
    // deleteCustomer({ id: customerId })
    //   .then((res) => {
    //     console.log("[customer] res on delete: ", res);
    //     navigate(`/customers`);
    //   })
    //   .catch((error) => {
    //     console.log("Error updating customer: ", error);
    //     setDeleteModalOpen(false);
    //   });
  };

  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        No es posible obtener datos del cliente en este momento. {error.message}
      </p>
    );

  // console.log("deleting result: : ", deleteStatus);
  return (
    <StyledCustomerDetailsWrapper>
      <Modal open={isEditModalOpen} full>
        {/* <EditCustomerForm
          onClose={() => setEditModalOpen(false)}
          customer={data?.customer}
        /> */}
      </Modal>
      <Modal open={isDeleteModalOpen}>
        {/* <p>¿Desea eliminar {data?.customer?.name}?</p> */}
        <StyledDeleteCustomerBtn type="button" onClick={handleDeleteCustomer}>
          Eliminar
        </StyledDeleteCustomerBtn>
      </Modal>
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
