import styled from "styled-components";

import { StyledForm } from "styles/Form/form.styles";

export const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  margin: 0 auto;
  > * {
    margin: 0;
  }
`;

export const SignUpForm = styled(StyledForm)`
  > div.user-company_name {
    grid-area: 1 / 1 / 2 / 7;
  }
  > div.user-company_id {
    grid-area: 1 / 7 / 2 / 13;
  }
  > div.user-first_name {
    grid-area: 2 / 1 / 3 / 7;
  }
  > div.user-second_name {
    grid-area: 2 / 7 / 3 / 13;
  }
  > div.user-first_lastname {
    grid-area: 3 / 1 / 4 / 7;
  }
  > div.user-second_lastname {
    grid-area: 3 / 7 / 4 / 13;
  }
  > div.user-email {
    grid-area: 4 / 1 / 5 / 7;
  }
  > div.user-password1 {
    grid-area: 5 / 1 / 6 / 7;
  }
  > div.user-password2 {
    grid-area: 5 / 7 / 6 / 13;
  }
`;
