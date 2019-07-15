import { useContext } from 'react';
import MainLayout from '@/layouts/Main';
import { SITE_TITLE } from '@/constants';
import { ActionRouterContext } from '@/contexts/actionRouter';
import { TemplateType } from '@/constants/actionRouter';
import Map from '@/components/Traffic/Map';

const Index = () => {
  const { history, currentIndex } = useContext(ActionRouterContext);
  return (
    <MainLayout title={'AI City Dashboard |' + SITE_TITLE}>
      {currentIndex >= 0 &&
      history[currentIndex].templateType === TemplateType.T_Realtime ? (
        <Map />
      ) : (
        <>
          <h1>City Dashboard</h1>
          <p>Say: Hey Jarvis!</p>
        </>
      )}
    </MainLayout>
  );
};

export default Index;
