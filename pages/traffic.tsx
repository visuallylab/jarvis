import MainLayout from '@/layouts/Main';
import { SITE_TITLE } from '@/constants';
import Map from '@/components/Traffic/Map';

const Traffic = () => {
  return (
    <MainLayout title={'AI City Dashboard |' + SITE_TITLE}>
      <Map />
    </MainLayout>
  );
};

export default Traffic;
