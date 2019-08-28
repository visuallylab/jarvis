import { NextPage } from 'next';

import HomeLayout from '@/layouts/Home';
import { i18nNamespace } from '@/constants';

const Service: NextPage = () => {
  return <HomeLayout mode="dark">Hello word</HomeLayout>;
};

Service.getInitialProps = async () => ({
  namespacesRequired: Object.values(i18nNamespace),
});

export default Service;
