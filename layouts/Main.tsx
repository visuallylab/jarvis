import Head from 'next/head';

import Section from '@/components/Section';
import Jarvis from '@/components/Jarvis';
import GlobalStyles from '@/themes/GlobalStyles';
import NormalizeStyles from '@/themes/NormalizeStyles';
import { SITE_TITLE } from '@/constants';

type TProps = {
  title?: string;
  children: React.ReactNode;
};

const MainLayout: React.FunctionComponent<TProps> = ({
  children,
  title = SITE_TITLE,
}) => {
  return (
    <Section fullscreen={true}>
      <Head>
        <title>{title}</title>
      </Head>
      <Jarvis size={20} />
      {children}
      <NormalizeStyles />
      <GlobalStyles />
    </Section>
  );
};

export default MainLayout;
