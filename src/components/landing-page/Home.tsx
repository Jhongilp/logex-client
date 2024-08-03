import styled from "styled-components";
import dashboardImage from "images/logexDashboard.jpg";

const Wrapper = styled.div`
  display: grid;
  flex-direction: column;
`;

const IntroWrapperText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  > h1 {
    margin: 0;
    font-size: 32px;
    font-family: "Roboto";
    font-weight: 400;
    letter-spacing: -1px;
  }

  > p {
    margin: 0;
    font-size: 14px;
  }
`;

const IntroImage = styled.div`
  display: flex;

  > img {
    width: 100%;
    /* object-fit: none;
    object-position: 0% 0%; */
  }
`;

export const Home = () => (
  <Wrapper>
    <IntroWrapperText>
      <h1>Controla tus operaciones de comercio exterior</h1>
      <p>
        Plataforma online que te permite coordinar fácilmente tus operaciones de
        comercio exterior.
      </p>
      <p>
        Ya no manejes más hojas de cálculo, con Logex puedes llevar toda la
        información de tus operaciones en un solo lugar, en línea y evitando la
        duplicidad de información.
      </p>
    </IntroWrapperText>
    <IntroImage>
      <img src={dashboardImage} alt="Home" />
    </IntroImage>
  </Wrapper>
);
