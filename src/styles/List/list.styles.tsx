import styled from "styled-components";

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;

  li {
    list-style: none;
    height: 35px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: var(--color-text-dominant);
    transition: background-color ease-in-out 0.3s;
    cursor: pointer;

    &:hover {
      background-color: var(--color-main-bg);
    }

    > span:nth-of-type(1) {
      display: flex;
      height: 100%;
      padding: 0 6px;
      margin-right: 6px;
      /* width: 35px; */
      justify-content: center;
      align-items: center;
    }
  }
`;
