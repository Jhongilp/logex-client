import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
`;

export const Home = () => (
  <Wrapper>
    <div>
      <h1>CONTROLA TUS OPERACIONES DE COMERCIO EXTERIOR</h1>
      <p>
        Plataforma online que te permite coordinar fácilmente tus operaciones de
        comercio exterior.
      </p>
    </div>
    <div></div>
  </Wrapper>
);
