import Head from 'next/head';
import styled from 'styled-components';

import Jarvis from '@/components/Jarvis';
import GlobalStyles from '@/themes/GlobalStyles';
import NormalizeStyles from '@/themes/NormalizeStyles';
import { SITE_TITLE } from '@/constants';

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 0;
  overflow: hidden;
`;

type TProps = {
  title?: string;
  children: React.ReactNode;
};

const MainLayout: React.FunctionComponent<TProps> = ({
  children,
  title = SITE_TITLE,
}) => {
  return (
    <Main>
      <Head>
        <title>{title}</title>
      </Head>
      <Jarvis size={20} />
      {children}
      <NormalizeStyles />
      <GlobalStyles />
    </Main>
  );
};

export default MainLayout;
