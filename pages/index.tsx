import { useContext } from 'react';
import MainLayout from '@/layouts/Main';
import { SITE_TITLE } from '@/constants';
import { ActionRouterContext } from '@/contexts/actionRouter';

const Index = () => {
  const { routes, currentIndex } = useContext(ActionRouterContext);
  return (
    <MainLayout title={'AI City Dashboard |' + SITE_TITLE}>
      <h1>City Dashboard</h1>
      <p>Say: Hey Jarvis!</p>
      <p>turing into routes: {JSON.stringify(routes[currentIndex])}</p>
    </MainLayout>
  );
};

export default Index;
