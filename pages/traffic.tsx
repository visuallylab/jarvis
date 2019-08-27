import { NextPage } from 'next';
import MainLayout from '@/layouts/Main';
import { SITE_TITLE, i18nNamespace } from '@/constants';
import Map from '@/components/demo/Traffic/Map';

const Traffic: NextPage = () => {
  return (
    <MainLayout title={'AI City Dashboard |' + SITE_TITLE}>
      <Map />
    </MainLayout>
  );
};

Traffic.getInitialProps = async () => ({
  namespacesRequired: Object.values(i18nNamespace),
});
export default Traffic;
