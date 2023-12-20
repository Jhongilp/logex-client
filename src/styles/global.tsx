import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    --color-main: #FFFFFF;
    --color-main-dark: #000000;
    --color-main-bg: #F6F7F9;
    --color-main-bg-secondary: #DEDEDC;
    --color-main-bg-terciary: #EFEFEF;
    --color-main-bg-dark: #051E34;
    --color-main-bg-light: #11293F;

    --color-primary: #2A75D7;
    --color-primary-dark: #004AA5;
    --color-primary-darker: #0478FF;
    --color-primary-light: #6CA3FF;
    --color-secondary: #00BCD4;
    --color-secondary-dark: #008BA3;
    --color-secondary-light: #62EFFF;

    --color-text: #476282;
    --color-text-dominant: #484950;
    --color-text-light: #BAC1C7;
    --color-text-secondary: #6c7984;

    --color-danger: #ED6969;
    --color-danger-lt: #FDEEEE;

  }

  a {
    text-decoration: none;
     /* &:active {
      color: 
     } */
  }
`;
