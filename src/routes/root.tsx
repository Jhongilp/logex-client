import styled from "styled-components";
import Sidebar from "src/components/sidebar/Sidebar";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100%;
  /* overflow: hidden; */
`;

const Main = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: #f6f7f9;
  height: 100%;
`;

export default function Root() {
  return (
    <Wrapper>
      <Main>
        <Sidebar />
      </Main>
    </Wrapper>
  );
}
