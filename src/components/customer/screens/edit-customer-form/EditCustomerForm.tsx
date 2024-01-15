import React, { useState } from "react";
import styled from "styled-components";
import { ICliente } from "types";
import { BtnIcon, ButtonAct } from "styles/commons";
import { CloseIcon } from "svgs";
import { useMutation } from "urql";
import { UpdateCustomerMutation } from "api/customer.api";

import {
  FormWrapper,
  FormHeader,
  StyledForm,
  CloseFormIconWrapper,
  FormCommands,
} from "styles/Form/form.styles";

const CustomerForm = styled(StyledForm)`
  > div.customer-name {
    grid-area: 1 / 1 / 2 / 13;
  }
  > div.customer-country {
    grid-area: 2 / 1 / 3 / 7;
  }
  > div.customer-city {
    grid-area: 2 / 7 / 3 / 13;
  }
  > div.customer-address {
    grid-area: 3 / 1 / 4 / 13;
  }
`;

type CreateCustomerProps = {
  customer: ICliente;
  onClose: () => void;
};

export const EditCustomerForm = ({
  onClose,
  customer,
}: CreateCustomerProps) => {
  const [, updateCustomer] = useMutation(UpdateCustomerMutation);
  const [error, setError] = useState(false);

  const onCreateCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);
    const data: Partial<ICliente & { userId: string }> = {};
    for (const [key, value] of dataForm) {
      data[key] = value;
    }
    data.id = customer?.id;
    data.userId = "8009653658";

    updateCustomer({ input: data })
      .then((res) => {
        console.log("[customer] res on update: ", res);
        onClose();
      })
      .catch((error) => {
        console.log("Error updating customer: ", error);
        setError(true);
      });
  };

  return (
    <FormWrapper>
      <CloseFormIconWrapper>
        <BtnIcon type="button" onClick={onClose}>
          <CloseIcon />
        </BtnIcon>
      </CloseFormIconWrapper>
      <FormHeader>
        <h3>Crear cliente</h3>
      </FormHeader>

      <CustomerForm id="create-customer-form" onSubmit={onCreateCustomer}>
        <div className="form-field customer-name">
          <label>Nombre</label>
          <input name="name" defaultValue={customer?.name} required></input>
        </div>
        <div className="form-field customer-country">
          <label>País</label>
          <input
            name="country"
            defaultValue={customer?.country}
            required
          ></input>
        </div>
        <div className="form-field customer-city">
          <label>Ciudad</label>
          <input name="city" defaultValue={customer?.city} required></input>
        </div>
        <div className="form-field customer-address">
          <label>Dirección</label>
          <input
            name="address"
            defaultValue={customer?.address}
            required
          ></input>
        </div>
      </CustomerForm>
      <FormCommands>
        <ButtonAct onClick={onClose}>Cancelar</ButtonAct>
        <ButtonAct form="create-customer-form">Editar</ButtonAct>
      </FormCommands>
      {error && (
        <div>
          <span>No se presentó un error. Por favor volver a intentar</span>
        </div>
      )}
    </FormWrapper>
  );
};
