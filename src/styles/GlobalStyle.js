import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import theme from './theme';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  :root {
    --primary-font: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    --color-primary: #00115e;
    --color-secondary: #ada9ba;
    --color-white: #ffffff;
    --color-black: #000000;
    --color-gray1: #333333;
    --color-gray2: #666666;
    --color-gray3: #999999;
    --color-gray4: #ababab;
    --color-gray5: #cccccc;
    --color-gray6: #dddddd;
    --color-gray7: #eeeeee;
    --color-gray8: #f5f5f5;
    --color-red: #DE0505;
    --drop-shadow: 3px 4px 13px rgba(0, 0, 0, 0.15);
    --inner-width: 1280px; 

    @media ${theme.device.start} {
      --inner-width: 90%;
    }


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

  main { 
    padding: 100px 0;
    overflow: hidden;
  }

  .swal2-popup {
    font-family: var(--primary-font) !important; 
  }
`;
