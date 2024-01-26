import { supabase } from "api";
import { useNavigate } from "react-router-dom";
import { ICompany, IUser, RoleName } from "types";
import { useMutation } from "urql";
import { CreateUserMutation } from "api";

import {
  SignUpForm,
  SignUpWrapper,
} from "components/landing-page/landing-page.styles";

import { FormCommands } from "styles/Form/form.styles";
import { ButtonAct } from "styles/commons";

export const SignIn = () => {
  const [, createUser] = useMutation(CreateUserMutation);
  const navigate = useNavigate();

  const onCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    if (formData.password1 && formData.password1 === formData.password2) {
      const company: ICompany = {
        nit: formData.company_id,
        name: formData.company_name,
        country: formData.country,
        city: formData.city,
      };

      const user: IUser = {
        id: "",
        email: formData.email,
        first_name: formData.first_name,
        second_name: formData.second_name,
        first_lastname: formData.first_lastname,
        second_lastname: formData.second_lastname,
        role: RoleName.ADMIN,
        company,
      };

      try {
        const { data, error } = await supabase.auth.signUp({
          email: user.email,
          password: formData.password1,
          options: {
            data: {
              ...user,
            },
          },
        });

        if (error) throw error;

        console.log("[signup] data: ", data, error);
        user.id = data.user.id;
        const userCreated = await createUser({ input: user });
        console.log("[signup] res on create user: ", userCreated);
        navigate(`/dashboard`);
      } catch (error) {
        console.error(
          "[signup] error creating user: ",
          error instanceof Error ? error.message : error
        );
      }
    }
  };

  return (
    <SignUpWrapper>
      <SignUpForm id="signin-user-form" onSubmit={onCreateUser}>
        <div className="form-field user-email">
          <label>Email</label>
          <input required type="email" name="email"></input>
        </div>
        <div className="form-field user-password1">
          <label>Contraseña</label>
          <input
            required
            type="password"
            minLength={4}
            name="password1"
          ></input>
        </div>
      </SignUpForm>
      <FormCommands>
        <ButtonAct form="signin-user-form">Ingresar</ButtonAct>
      </FormCommands>
    </SignUpWrapper>
  );
};
