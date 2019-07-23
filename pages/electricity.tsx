import MainLayout from '@/layouts/Main';
import Realtime from '@/components/Electricity/Realtime';
import { SITE_TITLE } from '@/constants';

const Electricity = () => {
  return (
    <MainLayout title={'Electricity |' + SITE_TITLE}>
      <Realtime />
    </MainLayout>
  );
};

export default Electricity;
