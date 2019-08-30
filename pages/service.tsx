import { NextPage } from 'next';

import HomeLayout from '@/layouts/Home';
import { i18nNamespace } from '@/constants';
import Intro from '@/components/service/Intro';
import Video from '@/components/service/Video';
import Dashboard from '@/components/service/Dashboard';
import Slogan from '@/components/service/Slogan';
import Projects from '@/components/service/Projects';
import Solutions from '@/components/service/Solutions';
import Footer from '@/components/service/Footer';

const Service: NextPage = () => {
  return (
    <HomeLayout mode="dark">
      <Intro />
      <Video />
      <Dashboard />
      <Slogan />
      <Projects />
      <Solutions />
      <Footer />
    </HomeLayout>
  );
};

Service.getInitialProps = async () => ({
  namespacesRequired: Object.values(i18nNamespace),
});

export default Service;
