import { FC, useContext, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import SiriWave from 'siriwave';

import { JarvisStatus } from '@/services/JarvisService';
import { JarvisContext } from '@/contexts/jarvis';
import { setStatus, resetIdle } from '@/contexts/jarvis/actions';

const Wrapper = styled(animated.div)`
  position: absolute;
  top: 2vh;
  right: 2vw;
  width: 84%; /* it equals to 25% of window */
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 2px ${p => p.theme.colors.spaceGray};
  background: rgba(70, 73, 76, 0.95);
  border-radius: ${p => p.theme.borderRadius};
  padding: 8px;
  box-shadow: 0px 0px 5px 2px #353535;

  p {
    margin: 5px;
  }
`;

// TODO:
// [refactor] (1): when stop we couldn't stop and setAmplitude(0) bug

const ListeningJarvis: FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const jarvisWave = useRef<any>(null);
  const { status, response, dispatch, title } = useContext(JarvisContext);
  const props = useSpring({
    transform: `translateX(${status === JarvisStatus.Idle ? '150%' : '0%'})`,
  });

  const startWave = useCallback(() => {
    jarvisWave.current.setSpeed(0.2);
    jarvisWave.current.setAmplitude(3);
    jarvisWave.current.start();
  }, [jarvisWave.current]);

  const stopWave = useCallback(() => {
    jarvisWave.current.setSpeed(0);
    jarvisWave.current.setAmplitude(0);
    jarvisWave.current.stop();
  }, [jarvisWave.current]);

  useEffect(() => {
    if (jarvisWave.current) {
      switch (status) {
        case JarvisStatus.Active: {
          // when show up animation over, let user know they can speak
          setTimeout(() => {
            startWave();
            dispatch(setStatus(JarvisStatus.Listening, "I'm listening..."));
          }, 1300);
          return;
        }
        case JarvisStatus.Success: {
          stopWave();
          setTimeout(() => dispatch(resetIdle()), 1000);
          break;
        }
        case JarvisStatus.Error: {
          stopWave();
          setTimeout(() => {
            startWave();
            dispatch(setStatus(JarvisStatus.Listening, "I'm listening..."));
          }, 1000);
          break;
        }
        case JarvisStatus.Idle: {
          stopWave();
          return;
        }
      }
    }
  }, [status]);

  useEffect(() => {
    if (wrapperRef.current) {
      jarvisWave.current = new SiriWave({
        container: document.getElementById('jarvis-wave'),
        width: wrapperRef.current.offsetWidth * 0.8,
        height: 40,
        style: 'ios9',
        amplitude: 3,
        autostart: true,
      });

      // siriwave.js has some bug,
      // so we need to autostart then stop immediately
      jarvisWave.current.stop();
      jarvisWave.current.setAmplitude(3);
    }
  }, []);

  return (
    <Wrapper style={props} ref={wrapperRef}>
      <p>
        <b>{title}</b>
      </p>
      <div id="jarvis-wave" />
      <p>{response.message}</p>
    </Wrapper>
  );
};

export default ListeningJarvis;
