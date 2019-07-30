import MainLayout from '@/layouts/Main';
import Realtime from '@/components/Electricity/Realtime';
import { SITE_TITLE, i18nNamespace } from '@/constants';

const Electricity = () => {
  return (
    <MainLayout title={'Electricity |' + SITE_TITLE}>
      <Realtime />
    </MainLayout>
  );
};

Electricity.getInitialProps = () => ({
  namespacesRequired: Object.values(i18nNamespace),
});

export default Electricity;
