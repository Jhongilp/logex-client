import { Outlet } from "react-router-dom";
import styled from "styled-components";
import HomeNavbar from "./HomeNavbar";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  background-color: #fcfcfc;
  color: #32325d;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  padding: 1em 0 10px;
`;

export const LandingPage = () => {
  return (
    <Wrapper>
      <HomeNavbar />
      <Container>
        <Outlet />
      </Container>
    </Wrapper>
  );
};
