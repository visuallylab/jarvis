import App, { Container } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import AppContextsProvider from '@/contexts/AppContextsProvider';
import theme from '@/themes/theme';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <AppContextsProvider>
            <Component {...pageProps} />
          </AppContextsProvider>
        </ThemeProvider>
      </Container>
    );
  }
}
