import { useEffect, useContext, useRef, useCallback } from 'react';
import { animated } from 'react-spring';
import styled from 'styled-components';
import SiriWave from 'siriwave';
import useJarvisSpringProps from '@/hooks/useJarvisSpringProps';
import { JarvisStatus } from '@/services/JarvisService';
import { setListening, resetIdle } from '@/contexts/jarvis/actions';
import { JarvisContext } from '@/contexts/jarvis';

type TProps = {
  size?: number;
};

const Container = styled.div<{ size: number }>`
  position: absolute;
  top: 0;
  right: 0;
  margin: 24px ${props => props.size * 2}px;
  width: ${props => props.size * 5}px;
  height: ${props => props.size * 1.5}px;
`;

const AnimatedWrapper = styled(animated.div)`
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  align-items: center;
  position: absolute;
`;

const Wrapper = styled.div`
  padding: 0;
  border: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  align-items: center;
  background: none;
`;

const Jarvis: React.FC<TProps> = ({ size = 60 }) => {
  const { status, jarvis, enabled, dispatch } = useContext(JarvisContext);
  const { circleProps, siriProps } = useJarvisSpringProps({
    size,
    status,
  });

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const jarvisWave = useRef<any>(null);

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
            dispatch(setListening());
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
            dispatch(setListening());
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

  useEffect(() => {
    const siri = new SiriWave({
      container: document.getElementById('jarvis-wave'),
      width: size * 5,
      height: size * 1.5,
      amplitude: 3,
      style: 'ios9',
      autostart: true,
    });
    return () => {
      siri.stop();
    };
  }, []);

  return (
    <Container size={size}>
      <AnimatedWrapper style={siriProps} ref={wrapperRef}>
        <div id="jarvis-wave" />
      </AnimatedWrapper>
      <Wrapper
        onClick={() =>
          enabled ? jarvis && jarvis.disable() : jarvis && jarvis.enable()
        }
      >
        {circleProps.map((circleProp, i) => (
          <animated.div key={i} style={circleProp} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Jarvis;
