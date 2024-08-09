import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { LogexLogo } from "svgs"
import logexLogo from "images/logexLogo.jpg";
import { ButtonAct } from "styles/commons";
// background-color: #FCFCFC;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 60px;
  width: 80%;
  background-color: #fff;
  color: #32325d;
  margin: 0 auto;
  > ul {
    display: flex;
    /* justify-content: flex-end; */
    align-items: center;
    height: 100%;
    margin: 0;
    padding: 0;
    > li {
      display: flex;
      align-items: center;
      /* margin-right: 40px; */
    }
  }
`;

const LogexLogoImg = styled.div`
  display: flex;
  height: 40px;
  width: 100px;
  justify-content: center;
  align-items: center;

  > img {
    width: 100%;
    /* object-fit: none;
    object-position: 0% 0%; */
  }
`;

const HomeNavbar = () => {
  const navigate = useNavigate();
  // const isLocalhost = window.location.hostname === "localhost";
  const isLocalhost = false;

  const handleOnJoin = () => {
    navigate("/waiting-list");
  };

  return (
    <Nav>
      {/* <LogexLogoImg>
        <img src={logexLogo} alt="Logex logo" />
      </LogexLogoImg> */}

      {isLocalhost ? (
        <ul>
          <li>
            <Link to="/">
              <LogexLogoImg>
                <img src={logexLogo} alt="Logex logo" />
              </LogexLogoImg>
            </Link>
          </li>
          <li>
            <Link to="/signin">Sing In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/">
              <LogexLogoImg>
                <img src={logexLogo} alt="Logex logo" />
              </LogexLogoImg>
            </Link>
          </li>
          <li>
            <ButtonAct type="button" onClick={handleOnJoin}>
              Únete a la lista de espera
            </ButtonAct>
          </li>
        </ul>
      )}
    </Nav>
  );
};

export default HomeNavbar;
