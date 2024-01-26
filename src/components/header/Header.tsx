import { supabase } from "api";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

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
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <h1>LOGEX APP</h1>
      <div>
        <div>
          <button
            type="button"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (!error) {
                navigate("/");
              }
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
