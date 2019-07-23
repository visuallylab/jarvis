import { useContext } from 'react';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';

import MainLayout from '@/layouts/Main';
import { SITE_TITLE } from '@/constants';
import { ActionRouterContext } from '@/contexts/actionRouter';
import Map from '@/components/Traffic/Map';

const AnimatedWrapper = styled(animated.div)`
  width: 100%;
  height: 100%;
`;

const IntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const pages = [
  ({ style }: any) => (
    <AnimatedWrapper style={style}>
      <IntroWrapper>
        <h1>City Dashboard</h1>
        <p>Say: Hey Jarvis!</p>
      </IntroWrapper>
    </AnimatedWrapper>
  ),
  ({ style }: any) => (
    <AnimatedWrapper style={style}>
      <Map />
    </AnimatedWrapper>
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
