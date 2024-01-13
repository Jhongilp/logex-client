import { useState } from "react";
import { CreateShippingProps } from "types/props.types";
import { BtnIcon, ButtonAct } from "styles/commons";
import {
  FormWrapper,
  FormHeader,
  StyledForm,
  CloseFormIconWrapper,
  FormCommands,
} from "styles/Form/form.styles";
// import { createShipping } from "api/customers.api";
import { IShipping } from "types";
import { CloseIcon } from "svgs";
import { useMutation } from "urql";
import { CreateShippingMutation } from "api/customer.api";

export const CreateShippingForm = ({
  onClose,
  customerId,
}: CreateShippingProps) => {
  const [shippingResult, createShipping] = useMutation(CreateShippingMutation);
  const [error, setError] = useState(false);

  const onCreateShipping = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elementsArr = Array.from(e.currentTarget.elements) as (
      | HTMLInputElement
      | HTMLButtonElement
    )[];
    const formData = elementsArr.reduce<{ [key: string]: string }>(
      (accum, input) => {
        if (input.id) {
          accum[input.id] = input.value;
        }
        return accum;
      },
      {}
    );

    const shipping: Omit<IShipping, "id"> = {
      consignee: formData.consignee,
      notify: formData.notify,
      country: formData.country,
      city: formData.city,
      transport_mode: formData.transport_mode,
      address: formData.address,
      contact: formData.contact,
      email: formData.email,
      phone: formData.phone,
      obs: formData.obs,
      customerId
    };

    console.log("formData: ", formData, shipping);
    createShipping({ input: shipping })
      .then((res) => {
        console.log("[shipping] res on create: ", res);
        onClose();
      })
      .catch((error) => {
        console.log("Error creating new shipping: ", error);
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
        <h3>Crear Shipping Instruction</h3>
      </FormHeader>
      <StyledForm id="create-shipping-form" onSubmit={onCreateShipping}>
        <div className="form-field consignee">
          <label>Consignee</label>
          <input required name="consignee" id="consignee"></input>
        </div>
        <div className="form-field notify">
          <label>Notify</label>
          <input required name="notify" id="notify"></input>
        </div>
        <div className="form-field country">
          <label>País destino</label>
          <input required name="country" id="country"></input>
        </div>
        <div className="form-field city">
          <label>Ciudad ingreso aduana</label>
          <input required name="city" id="city"></input>
        </div>
        <div className="form-field transport-mode">
          <label>Modalidad</label>
          <input required name="transport_mode" id="transport_mode"></input>
        </div>
        <div className="form-field address">
          <label>Dirección</label>
          <input required name="address" id="address"></input>
        </div>
        <div className="form-field contact-name">
          <label>Nombre contacto</label>
          <input required name="contact" id="contact"></input>
        </div>
        <div className="form-field email">
          <label>Email</label>
          <input required name="email" id="email"></input>
        </div>
        <div className="form-field phone">
          <label>Teléfono</label>
          <input required name="phone" id="phone"></input>
        </div>
        <div className="form-field observations">
          <label>Observaciones</label>
          <textarea required name="obs" id="obs"></textarea>
        </div>
      </StyledForm>
      <FormCommands>
        <ButtonAct onClick={onClose}>Cancelar</ButtonAct>
        <ButtonAct form="create-shipping-form">Crear Shipping</ButtonAct>
      </FormCommands>
    </FormWrapper>
  );
};
