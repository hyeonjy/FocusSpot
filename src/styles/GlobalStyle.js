import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  :root {
    --primary-font: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    --color-primary: #00115e;
    --color-white: #ffffff;
    --color-black: #000000;
    --color-gray: #666666;
    --color-red: red;
  }

  * {
    margin: 0;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  html {
    font-family: var(--primary-font);
    font-size: 16px;
  }

  body {
    /* background-color: var(--background);*/
  } 

  h1 {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    font-family: var(--primary-font);
    font-size: 1rem;
    line-height: 1;
    vertical-align: middle;
    background-color: transparent;
    border: 0;
  }

  button:focus,
  button:active,
  input:focus,
  input:active,
  select:focus,
  select:active,
  textarea:focus,
  textarea:active {
    outline: none;
    box-shadow: none;
  }

  a,
  button {
    cursor: pointer;
  }

  button {
    padding: 0;
  }

  ul,
  ol,
  li {
    padding-left: 0;
    list-style: none;
  }

  address {
    font-style: normal;
  }
`;
