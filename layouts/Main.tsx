import React, { useContext } from 'react';
import Head from 'next/head';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalStyles from '@/themes/GlobalStyles';
import NormalizeStyles from '@/themes/NormalizeStyles';
import { SITE_TITLE } from '@/constants';
import { JarvisContext } from '@/contexts/jarvisContext';

type TProps = {
  title?: string;
  children: React.ReactNode;
};

const MainLayout: React.FunctionComponent<TProps> = ({
  children,
  title = SITE_TITLE,
}) => {
  const { enabled, start, stop, responseList } = useContext(
    JarvisContext,
  );
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <button onClick={() => (enabled ? stop() : start())}>
        {enabled ? 'stop' : 'start'}
      </button>
      <p>responses: {responseList.length}</p>
      {children}
      <Footer />
      <NormalizeStyles />
      <GlobalStyles />
    </>
  );
};

export default MainLayout;
