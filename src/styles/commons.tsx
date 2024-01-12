import styled, { css } from "styled-components";

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-main);
  flex-grow: 1;
`;

type ContentProps = {
  fullview?: boolean;
};

export const StyledContent = styled.div<ContentProps>`
  display: flex;
  /* height: calc(100% - 105px); */
  height: 100%;
  width: ${(props) => (props.fullview ? "75%" : "100%")};
  justify-content: center;
  padding: 30px 0;
  background-color: var(--color-main-bg);

  @media (max-width: 1200px) {
    padding: 30px 12px;
  }
`;

export const StyledSubHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid var(--color-text-light);
  box-sizing: border-box;
`;

export const SunHeaderContent = styled.div`
  display: flex;
  height: 30px;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 80%;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  background-color: var(--color-main);
  overflow-y: auto;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

// PAGES

export const PageWrapper = styled(StyledMain)`
  /* overflow-y: auto; */
  font-family: "Roboto";
`;
export const PageHeader = styled(StyledSubHeader)`
  position: relative;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 12px;
  box-sizing: border-box;
`;

export const PageContent = styled(StyledContent)`
  padding: 12px;
  box-sizing: border-box;
`;

// COMPONENTS TESTING GITHUB
export const Button = styled.button<{ $width?: number }>`
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: transparent;
  ${(props) =>
    props.$width &&
    css`
      width: ${props.$width}px;
    `}

  &:active {
    transform: translateY(-1px);
  }
  &:disabled {
    transform: none;
    /* opacity: 0.6; */
    cursor: not-allowed;
    background-color: var(--color-text);
  }

  &:focus:not(:focus-visible) {
    outline: 0;
  }
`;

export const ButtonAct = styled(Button)`
  height: 30px;
  min-width: 80px;
  padding: 0 12px;
  border-radius: 3px;
  background-color: var(--color-primary);
  color: var(--color-main);
`;

export const BtnIcon = styled(Button)`
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 2px;
  transition: background-color ease-in-out 0.2s;

  &:hover {
    background-color: var(--color-main-bg);
  }
`;

export const ButtonActionIcon = styled(ButtonAct)`
  /* padding: 0 12px 0 6px; */
  > svg {
    margin-right: 6px;
    fill: var(--color-main);
  }
`;

/** LIST */

export const StyledMenuListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: var(--color-main-bg);

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    padding: 0 12px;

    a {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      font-size: 16px;
      font-weight: 400;
      color: var(--color-text-dominant);

      &:active,
      &::visited {
        color: var(--color-text-dominant);
      }
    }
  }

  li:hover {
    /* background-color: var(--color-main-bg); */
    background-color: var(--color-main-bg-terciary);
  }

  li.active {
    background-color: var(--color-main-bg-terciary);
    border-left: 2px solid var(--color-text-secondary);

    > a {
      font-weight: bold;
    }
  }
`;
