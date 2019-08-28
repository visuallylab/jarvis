import { NextPage } from 'next';

import HomeLayout from '@/layouts/Home';
import { i18nNamespace } from '@/constants';

const Index: NextPage = () => {
  return <HomeLayout>Hello word</HomeLayout>;
};

Index.getInitialProps = async () => ({
  namespacesRequired: Object.values(i18nNamespace),
});

export default Index;
