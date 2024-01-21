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
  grid-template-columns: 1fr 1fr;
  > div.user-email {
    grid-column: 1/3;;
  }
`;
