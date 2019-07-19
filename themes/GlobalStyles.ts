import { createGlobalStyle } from 'styled-components';
import { media } from '@/utils/theme';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    background-color: ${p => p.theme.colors.smokyBlack};
    color: ${p => p.theme.colors.smokyWhite};
    font-size: 14px; /* 1em = 14px */
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;

    ${media('largeDesktop')} {
      font-size: 16px;
    }
  }

  p {
    margin: 0;
    font-weight: 300;
  }

  ol, ul {
    list-style: none;
  }

  button {
    outline: none;
    border: none;
    cursor: pointer;
  }
`;
