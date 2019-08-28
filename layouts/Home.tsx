import Head from 'next/head';
import { Fragment } from 'react';
import styled from 'styled-components';

import GlobalStyles from '@/themes/GlobalStyles';
import DarkThemeProvider from '@/themes/DarkThemeProvider';
import NormalizeStyles from '@/themes/NormalizeStyles';
import { SITE_TITLE } from '@/constants';

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 0;
  overflow: hidden;
`;

type TProps = {
  mode?: 'default' | 'dark';
  title?: string;
  children: React.ReactNode;
};

const HomeLayout: React.FunctionComponent<TProps> = ({
  mode = 'default',
  children,
  title = SITE_TITLE,
}) => {
  const ThemeProvider = mode === 'default' ? Fragment : DarkThemeProvider;
  return (
    <ThemeProvider>
      <Main>
        <Head>
          <title>{title}</title>
        </Head>
        <header>home mode: {mode}</header>
        {children}
        <NormalizeStyles />
        <GlobalStyles />
      </Main>
    </ThemeProvider>
  );
};

export default HomeLayout;
