import { useContext } from 'react';
import { animated, useTransition } from 'react-spring';
import MainLayout from '@/layouts/Main';
import { SITE_TITLE } from '@/constants';
import { ActionRouterContext } from '@/contexts/actionRouter';
import Map from '@/components/Traffic/Map';

const pages = [
  ({ style }: any) => (
    <animated.div style={{ ...style }}>
      <h1>City Dashboard</h1>
      <p>Say: Hey Jarvis!</p>
    </animated.div>
  ),
  ({ style }: any) => (
    <animated.div style={{ ...style }}>
      <Map />
    </animated.div>
  ),
];

const Index = () => {
  const { currentIndex } = useContext(ActionRouterContext);
  const transitions = useTransition(currentIndex, p => p, {
    from: { opacity: 0, transform: 'scale(0.8)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.9)' },
  });

  return (
    <MainLayout title={'AI City Dashboard |' + SITE_TITLE}>
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item];
        return <Page key={key} style={props} />;
      })}
    </MainLayout>
  );
};

export default Index;
