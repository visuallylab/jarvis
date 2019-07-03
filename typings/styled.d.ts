import 'styled-components';

export interface Theme {
  colors: {
    main: string;
    secondary: string;
  };
}

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
