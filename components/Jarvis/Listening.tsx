import { FC, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import SiriWave from 'siriwave';

import { JarvisContext } from '@/contexts/jarvisContext';
import { JarvisStatus } from '@/services/JarvisService';

const Wrapper = styled(animated.div)`
  position: absolute;
  top: 3vh;
  right: 2vw;
  width: 84%; /* it equals to 25% of window */
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px ${p => p.theme.colors.spaceGray};
  background: ${p => p.theme.colors.smokyBlack};
  border-radius: ${p => p.theme.borderRadius};
  padding: 8px;

  p {
    margin: 5px;
  }
`;

const ListeningJarvis: FC = () => {
  const { status, response } = useContext(JarvisContext);
  const props = useSpring({
    transform: `translateX(${
      status === JarvisStatus.Listening ? '0%' : '150%'
    })`,
  });

  useEffect(() => {
    const siri = new SiriWave({
      container: document.getElementById('jarvis-wave'),
      width: 300,
      height: 50,
      amplitude: 3,
      style: 'ios9',
      autostart: true,
    });
  }, []);

  return (
    <Wrapper style={props}>
      <p>
        <b>What can I help you ?...</b>
      </p>
      <div id="jarvis-wave" />
      <p>{response.message}</p>
    </Wrapper>
  );
};

export default ListeningJarvis;
