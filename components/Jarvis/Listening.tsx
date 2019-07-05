import { FC, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

import { JarvisContext } from '@/contexts/jarvisContext';
import { JarvisStatus } from '@/services/JarvisService';

const Wrapper = styled(animated.div)`
  position: absolute;
  top: 5vh;
  right: 2vw;
  width: 84%; /* it equals to 25% of window */
  border: solid 1px ${p => p.theme.colors.spaceGray};
  background: ${p => p.theme.colors.smokyWhite};
  border-radius: ${p => p.theme.borderRadius};
  padding: 8px;
`;

const ListeningJarvis: FC = () => {
  const { status, response } = useContext(JarvisContext);
  const props = useSpring({
    transform: `translateX(${status === JarvisStatus.Listening ? '0%' : '0%'})`,
  });
  return (
    <Wrapper style={props}>
      <p>
        <b>What can I help you ?...</b>
      </p>
      <p>{response.message}</p>
    </Wrapper>
  );
};

export default ListeningJarvis;
