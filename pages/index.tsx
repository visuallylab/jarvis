import { NextPage } from 'next';

import MainLayout from '@/layouts/Main';
import { i18nNamespace } from '@/constants';

const Index: NextPage = () => {
  return <MainLayout>Hello word</MainLayout>;
};

Index.getInitialProps = async () => ({
  namespacesRequired: Object.values(i18nNamespace),
});

export default Index;
