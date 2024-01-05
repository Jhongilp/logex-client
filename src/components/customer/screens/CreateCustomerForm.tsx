import React, { useState } from "react";
import styled from "styled-components";
// import { createCustomer } from "api/customers.api";
import { ICliente } from "types";
import { BtnIcon, ButtonAct } from "styles/commons";
import { CloseIcon } from "svgs";
import { useMutation } from "urql";
import { CreateCustomerMutation } from "api/customer.api";

import {
  FormWrapper,
  FormHeader,
  StyledForm,
  CloseFormIconWrapper,
  FormCommands,
} from "styles/Form/form.styles";

const CustomerForm = styled(StyledForm)`
  > div.customer-id {
    grid-area: 1 / 1 / 2 / 4;
  }
  > div.customer-name {
    grid-area: 1 / 4 / 2 / 13;
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
  onClose: () => void;
};

export const CreateCustomerForm = ({ onClose }: CreateCustomerProps) => {
  const [customerResult, createCustomer] = useMutation(CreateCustomerMutation);
  const [error, setError] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const onCreateCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("[on submit] e target: ", e.currentTarget.elements);
    e.preventDefault();
    const data: Omit<ICliente, "id"> & { userId: string } = {
      name,
      country,
      city,
      address,
      userId: "8009653658",
    };
    console.log("[createCustomer] data: ", data);
    createCustomer({ input: data })
      .then((res) => {
        console.log("[customer] res on create: ", res);
        onClose();
      })
      .catch((error) => {
        console.log("Error creating the new customer: ", error);
        setError(true);
      });
  };

  console.log("[render][customer] customerResult: ", customerResult);

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
        <div className="form-field customer-id">
          <label>Identificación</label>
          <input
            value={id}
            onChange={(e) => setId(e.currentTarget.value)}
            required
          ></input>
        </div>
        <div className="form-field customer-name">
          <label>Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          ></input>
        </div>
        <div className="form-field customer-country">
          <label>País</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.currentTarget.value)}
            required
          ></input>
        </div>
        <div className="form-field customer-city">
          <label>Ciudad</label>
          <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            required
          ></input>
        </div>
        <div className="form-field customer-address">
          <label>Dirección</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            required
          ></input>
        </div>
      </CustomerForm>
      <FormCommands>
        <ButtonAct onClick={onClose}>Cancelar</ButtonAct>
        <ButtonAct form="create-customer-form">Crear Cliente</ButtonAct>
      </FormCommands>
      {error && (
        <div>
          <span>No se presentó un error. Por favor volver a intentar</span>
        </div>
      )}
    </FormWrapper>
  );
};
