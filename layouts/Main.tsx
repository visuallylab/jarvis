import React, { useContext } from 'react';
import Head from 'next/head';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Jarvis from '@/components/Jarvis';
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
  const { status, response } = useContext(JarvisContext);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div>Jarvis: {response.message}</div>
      <p>state: {status}</p>
      {children}
      <Jarvis />
      <Footer />
      <NormalizeStyles />
      <GlobalStyles />
    </>
  );
};

export default MainLayout;
