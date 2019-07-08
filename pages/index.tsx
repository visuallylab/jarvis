import MainLayout from '@/layouts/Main';
import { SITE_TITLE } from '@/constants';

const Index = () => {
  return (
    <MainLayout title={'AI City Dashboard |' + SITE_TITLE}>
      <h1>City Dashboard</h1>
      <p>Say: Hey Jarvis!</p>
    </MainLayout>
  );
};

export default Index;
