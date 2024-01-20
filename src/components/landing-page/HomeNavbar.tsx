import { Link } from "react-router-dom";
import styled from "styled-components";
// background-color: #FCFCFC;

const Nav = styled.nav`
  display: flex;
  height: 60px;
  width: 100%;
  background-color: #fff;
  color: #32325d;
  > ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    > li {
      display: flex;
      align-items: center;
      margin-right: 40px;
    }
  }
`;

const HomeNavbar = () => (
  <Nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/signin">Sing In</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
    </ul>
  </Nav>
);

export default HomeNavbar;
