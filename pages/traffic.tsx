import { NextFC } from 'next';
import MainLayout from '@/layouts/Main';
import { SITE_TITLE, i18nNamespace } from '@/constants';
import Map from '@/components/Traffic/Map';

const Traffic: NextFC = () => {
  return (
    <MainLayout title={'AI City Dashboard |' + SITE_TITLE}>
      <Map />
    </MainLayout>
  );
};

Traffic.getInitialProps = () => ({
  namespacesRequired: Object.values(i18nNamespace),
});
export default Traffic;
