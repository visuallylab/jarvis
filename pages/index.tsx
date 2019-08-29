import { NextPage } from 'next';

import HomeLayout from '@/layouts/Home';
import Landing from '@/components/home/Landing';
import Design from '@/components/home/Design';
import { i18nNamespace } from '@/constants';

const Index: NextPage = () => {
  return (
    <HomeLayout mode="light">
      <Landing />
      <Design />
    </HomeLayout>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: Object.values(i18nNamespace),
});

export default Index;
