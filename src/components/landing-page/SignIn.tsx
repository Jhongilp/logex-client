import { supabase } from "api";
import { useNavigate } from "react-router-dom";

import {
  SignUpForm,
  SignUpWrapper,
} from "components/landing-page/landing-page.styles";

import { FormCommands } from "styles/Form/form.styles";
import { ButtonAct } from "styles/commons";

export const SignIn = () => {
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

    if (formData.email && formData.password1) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password1,
        });

        if (error) throw error;

        console.log("[signin] data: ", data, error);
        navigate(`/dashboard`);
      } catch (error) {
        console.error(
          "[signup] error signing in: ",
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
