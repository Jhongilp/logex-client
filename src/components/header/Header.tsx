import React from "react";
// import { useDispatch } from 'react-redux'
import styled from "styled-components"
// import { signOut } from '../../firebase/auth'
// import { useHistory } from 'react-router-dom'

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  /* border-bottom: 1px solid #eee; */
  height: 45px;
  background-color: var(--color-primary);
  color: var(--color-main);
  padding-left: 20px;

  h1 {
    margin: 0;
  }
`;

const Header = () => {
  // let history = useHistory();
  // const dispatch = useDispatch();
  return (
    <StyledHeader>
      <h1>LOGEX APP</h1>
      <div>
        <div>
          <button type="button" onClick={() => {
            // signOut();
            // dispatch({type: 'USER_LOGOUT'})
            // history.push("/")
          }}>Logout</button>
        </div>
      </div>
    </StyledHeader>
  );
}


export default Header;
