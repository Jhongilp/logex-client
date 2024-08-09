import { useState } from "react";
import { supabase } from "api";
import { ICompany, IUser, RoleName } from "types";
import { useMutation } from "urql";
import { CreateUserMutation } from "api";
import styled, { keyframes } from "styled-components";

import {
  SignUpForm,
  SignUpWrapper,
} from "components/landing-page/landing-page.styles";

import { FormCommands } from "styles/Form/form.styles";
import { ButtonAct } from "styles/commons";

const loader = keyframes`
  100% {transform: rotate(.5turn)}
`;

const Loader = styled.div`
  width: 50px;
  aspect-ratio: 1;
  --c: no-repeat radial-gradient(farthest-side, #828184 92%, #0000);
  background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%,
    var(--c) 0 50%;
  background-size: 10px 10px;
  animation: ${loader} 1s infinite;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: 3px;
    background: repeating-conic-gradient(#0000 0 35deg, #514b82 0 90deg);
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(100% - 3px),
      #000 0
    );
    border-radius: 50%;
  }
`;

const Requesting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ThanksForJoining = () => {
  return (
    <div>
      <h1>Gracias por unirte a la lista de espera!</h1>
      <p>Pronto nos pondremos en contacto contigo.</p>
    </div>
  );
};

type JoinState = "unset" | "requesting" | "joined" | "error";

export const WaitingListForm = () => {
  const [joinState, setJoin] = useState<JoinState>("unset");
  const [, createUser] = useMutation(CreateUserMutation);

  const onCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setJoin("requesting");
    const elementsArr = Array.from(e.currentTarget.elements) as (
      | HTMLInputElement
      | HTMLButtonElement
    )[];
    const formData = elementsArr.reduce<{ [key: string]: string }>(
      (accum, input) => {
        if (input.name) {
          accum[input.name] = input.value;
        }
        return accum;
      },
      {}
    );

    const company: ICompany = {
      // nit: formData.company_id,
      nit: formData.company_name,
      name: formData.company_name,
      country: formData.country,
      city: formData.city,
    };

    const user: IUser = {
      id: "",
      email: formData.email,
      first_name: formData.first_name,
      // second_name: formData.second_name,
      second_name: "",
      first_lastname: formData.first_lastname,
      second_lastname: formData.second_lastname,
      role: RoleName.ADMIN,
      company,
    };

    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        // password: formData.password1,
        password: "123456",
        options: {
          data: {
            ...user,
          },
        },
      });

      if (error) throw error;
      user.id = data.user.id;
      const userCreated = await createUser({ input: user });
      console.log("[signup] res on create user: ", userCreated);
      setJoin("joined");
    } catch (error) {
      console.error(
        "[signup] error creating user: ",
        error instanceof Error ? error.message : error
      );
      setJoin("error");
    }
  };

  if (joinState === "error") {
    return (
      <p>
        Error al unirse a la lista de espera. Por favor danos a conocer el
        problema reportando al email jhongilp@gmail.com. Nos pondremos en
        contacto contigo lo más pronto posible.
      </p>
    );
  }

  if (joinState === "requesting") {
    return (
      <Requesting>
        <p>Uniendo a la lista de espera...</p>
        <Loader />
      </Requesting>
    );
  }

  return joinState === "joined" ? (
    <ThanksForJoining />
  ) : (
    <SignUpWrapper>
      <SignUpForm id="create-user-form" onSubmit={onCreateUser}>
        <div className="form-field user-company_name">
          <label>Nombre de la empresa</label>
          <input required name="company_name"></input>
        </div>
        {/* <div className="form-field user-company_id">
          <label>Nit de la empresa</label>
          <input required name="company_id"></input>
        </div> */}
        <div className="form-field">
          <label>País</label>
          <input required name="country"></input>
        </div>
        <div className="form-field ">
          <label>Ciudad</label>
          <input required name="city"></input>
        </div>
        <div className="form-field user-first_name">
          <label>Nombre</label>
          <input required name="first_name"></input>
        </div>
        {/* <div className="form-field user-second_name">
          <label>Segundo nombre</label>
          <input name="second_name"></input>
        </div> */}
        <div className="form-field user-first_lastname">
          <label>Apellido</label>
          <input required name="first_lastname"></input>
        </div>
        <div className="form-field user-second_lastname">
          <label>Teléfono o celular</label>
          <input required name="second_lastname"></input>
        </div>
        <div className="form-field user-email">
          <label>Email</label>
          <input required type="email" name="email"></input>
        </div>
        {/* <div className="form-field user-password1">
          <label>Contraseña</label>
          <input
            required
            type="password"
            minLength={4}
            name="password1"
          ></input>
        </div>
        <div className="form-field user-password2">
          <label>Confirmar contraseña</label>
          <input
            required
            type="password"
            minLength={4}
            name="password2"
          ></input>
        </div> */}
      </SignUpForm>
      <FormCommands>
        <ButtonAct form="create-user-form">Unirse a lista de espera</ButtonAct>
      </FormCommands>
    </SignUpWrapper>
  );
};
