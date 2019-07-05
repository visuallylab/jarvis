import 'styled-components';

export interface Theme {
  colors: {
    smokyBlack: string;
    smokyWhite: string;
    spaceGray: string;
    grey: string;
  };

  borderRadius: string;

  z: {
    bigger: number;
    high: number;
    superHigh: bumber;
  };
}

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
