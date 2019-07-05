import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    background-color: ${p => p.theme.colors.spaceGray};
    color: ${p => p.theme.colors.smokyWhite};
    font-size: 14px;
  }

  @media only screen and (max-width: 768px) {
    p {
      font-weight: 300;
    }
  }
`;
