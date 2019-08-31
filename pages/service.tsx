import { NextPage } from 'next';

import HomeLayout from '@/layouts/Home';
import { i18nNamespace } from '@/constants';
import Intro from '@/components/service/Intro';
import Traffic from '@/components/service/Traffic';
import Dashboard from '@/components/service/Dashboard';
import Slogan from '@/components/service/Slogan';
import Projects from '@/components/service/Projects';
import Solutions from '@/components/service/Solutions';

const Service: NextPage = () => {
  return (
    <HomeLayout mode="dark">
      <Intro />
      <Traffic />
      <Dashboard />
      <Slogan />
      <Projects />
      <Solutions />
    </HomeLayout>
  );
};

Service.getInitialProps = async () => ({
  namespacesRequired: Object.values(i18nNamespace),
});

export default Service;
