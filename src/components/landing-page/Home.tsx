import styled from "styled-components";
import dashboardImage from "images/logexDashboard.jpg";
import expoImage from "images/expo.jpg";

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
    font-size: 30px;
    font-family: "Roboto";
    font-weight: 400;
    letter-spacing: -1px;
  }

  > p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
  }
`;

const IntroImage = styled.div`
  display: flex;
  margin-bottom: 30px;

  > img {
    width: 100%;
    /* object-fit: none;
    object-position: 0% 0%; */
  }
`;

const BenefitsWrapper = styled.div`
  display: flex;
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  > div.benefit {
    display: flex;
    flex-direction: column;
    gap: 10px;

    > h1 {
      margin: 0;
      font-size: 18px;
      font-family: "Roboto";
      font-weight: 400;
    }

    > p {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
    }
  }
`;

const BenefitsImg = styled.div`
  display: flex;

  > img {
    width: 100%;
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
        información de tus operaciones en un solo lugar y en línea. Reduce
        sobrecostos y estrés laboral gracias a que ahora podrás controlar mejor
        las actividades de tu área de comercio exterior.
      </p>
    </IntroWrapperText>
    <IntroImage>
      <img src={dashboardImage} alt="Home" />
    </IntroImage>
    <BenefitsWrapper className="benefits">
      <BenefitsList className="list-benefits">
        <div className="benefit">
          <h1>Visualiza tus operaciones de comercio exterior</h1>
          <p>
            Rápidamente podrás ver la información más relevante de tus
            exportaciones e importaciones. Filtra según el estado de cada
            operación. Tendrás la tranquilidad de conocer el estado general o
            detallado de tus operaciones.
          </p>
        </div>
        <div className="benefit">
          <h1>Gestiona cada actividad</h1>
          <BenefitsImg className="img-benefits">
            <img src={expoImage} alt="Expo details" />
          </BenefitsImg>
          <p>
            Ya no se te pasará por alto realizar aquella actividad que pondrá en
            riesgo tu exportación. En cada etapa de la cadena de distribución
            física internacional puedes gestionar las actividades previamente
            creadas o aquellas especificas de cada operación.
          </p>
        </div>
        <div className="benefit">
          <h1>Recibe alertas tempranas de las actividades pendientes</h1>
        </div>
        <div className="benefit">
          <h1>
            Almacena y consulta los documentos soportes de tus operaciones de
            exportación e importación
          </h1>
        </div>
        <div className="benefit">
          <h1>Trabajo colaborativo en línea</h1>
        </div>
      </BenefitsList>
    </BenefitsWrapper>
  </Wrapper>
);
