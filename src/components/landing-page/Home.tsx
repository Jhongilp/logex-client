import styled from "styled-components";
import dashboardImage from "images/logexDashboard.jpg";

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  /* grid-template-columns: 1fr minmax(200px, auto); */
  grid-template-columns: 4fr 8fr;
  grid-gap: 20px;
  padding-top: 4em;
`;

// const IntroWrapper = styled.div`
//   display: flex;
//   gap: 20px;
// `;

const IntroWrapperText = styled.div`
  display: flex;
  flex-direction: column;

  > h1 {
    margin: 0;
    font-size: 46px;
    font-family: "Roboto";
    font-weight: 400;
  }
`;

const IntroImage = styled.div`
  display: flex;
  width: 100%;

  > img {
    width: 100%;
    object-fit: none;
    object-position: 0% 0%;
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
