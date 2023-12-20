import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 20px;
  color: var(--color-text-dominant);
  border-bottom: 1px solid var(--color-text-light);
  
  > h3 {
    margin: 0;
  }
`

export const CloseFormIconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10px;
  right: 10px;
  width: 35px;
  height: 35px;

  & > button {
    height: 100%;
    width: 100%;
  }
`

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-row-gap:    20px;
  grid-column-gap: 10px;
  width: 100%;
  margin-bottom: 20px;

  > div.form-field {
    display: flex;
    flex-direction: column;

    > label {
      font-size: 12px;
      color: var(--color-primary);
      margin-bottom: 3px;
      font-family: 'Roboto';
    }

    > input {
      height: 35px;
      border: none;
      background-color: var(--color-main-bg);
      padding: 0 0 0 12px;
    }
  }

  > div.consignee {
    grid-area: 1 / 1 / 2 / 7;
  }
  > div.notify {
    grid-area: 1 / 7 / 2 / 13;
  }
  > div.country {
    grid-area: 2 / 1 / 3 / 6;
  }
  > div.city {
    grid-area: 2 / 6 / 3 / 11;
  }
  > div.transport-mode {
    grid-area: 2 / 11 / 3 / 13;
  }
  > div.address {
    grid-area: 3 / 1 / 4 / 13;
  }
  > div.contact-name {
    grid-area: 5 / 1 / 6 / 5;
  }
  > div.email {
    grid-area: 5 / 5 / 6 / 10;
  }
  > div.phone {
    grid-area: 5 / 10 / 6 / 13;
  }
  > div.observations {
    grid-area: 6 / 1 / 7 / 13;
    
    > input {
      height: 80px;
    }
  }

`;

export const InputField = styled.div`

`;


export const FormCommands = styled.div`
  display: flex;
  width: 100;
  justify-content: center;
  align-items: center;
  height: 40px;
  /* margin-top: 20px; */
  margin-top: auto;

  > button:nth-of-type(1) {
    margin-right: 6px;
    background-color: var(--color-text);
    justify-content: center;
  }
  > button:nth-of-type(2) {
    justify-content: center;
    margin-left: 6px;
  }
`