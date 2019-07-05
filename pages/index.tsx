import MainLayout from '@/layouts/Main';
import { SITE_TITLE } from '@/constants';

const Index = () => {
  return (
    <MainLayout title={'AI City Dashboard |' + SITE_TITLE}>
      <h1>Hello Jarvis 👋</h1>
      這裡是 index 喔喔喔喔！
    </MainLayout>
  );
};

export default Index;
