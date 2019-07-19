import 'styled-components';

export interface Theme {
  colors: {
    smokyBlack: string;
    smokyWhite: string;
    spaceGray: string;
    grey: string;

    success: string;
    warning: string;
    error: string;

    boxBackground: string;
    boxBorder: string;
  };

  borderRadius: string;

  z: {
    bigger: number;
    high: number;
    superHigh: bumber;
  };

  fontSize: {
    h1: string;
    h2: string;
    h3: string;
    bigger: string;
    smaller: string;
    small: string;
  };
}

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
