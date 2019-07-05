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
  const { enabled, jarvis, status, response } = useContext(JarvisContext);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div>Jarvis: {response.message}</div>
      <button onClick={() => (enabled ? jarvis!.disable() : jarvis!.enable())}>
        {enabled ? 'disable jarvis' : 'enable jarvis'}
      </button>
      <p>state: {status}</p>
      {children}
      <Footer />
      <NormalizeStyles />
      <GlobalStyles />
    </>
  );
};

export default MainLayout;
