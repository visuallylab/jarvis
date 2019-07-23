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
  padding: 12px ${props => props.size}px;
  width: ${props => props.size * 15}px;
  height: 50vh;
  z-index: ${p => p.theme.z.high};
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const AnimatedWrapper = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px ${p => p.theme.colors.boxBorder};
  background: ${p => p.theme.colors.smokyBlack};
  border-radius: ${p => p.theme.borderRadius};
  box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.1) inset;
  padding: 8px;
`;

const Title = styled.p`
  font-weight: 500;
`;

const Message = styled.p`
  font-size: ${p => p.theme.fontSize.smaller};
  white-space: pre-line;
`;

const Wrapper = styled.div<{ size: number }>`
  position: absolute;
  border: none;
  padding: 0;
  top: 24px;
  left: 50%;
  right: 0;
  width: ${props => props.size * 5}px;
  height: ${props => props.size * 1.5}px;
  transform: translate3d(-50%, 0, 0);
  display: flex;
  align-items: center;
  background: none;
`;

const Jarvis: React.FC<TProps> = ({ size = 60 }) => {
  const { status, jarvis, enabled, dispatch, title, response } = useContext(
    JarvisContext,
  );
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

  return (
    <Container size={size}>
      <AnimatedWrapper style={siriProps} ref={wrapperRef}>
        <Title>{title}</Title>
        <div id="jarvis-wave" />
        <Message>{response.message}</Message>
      </AnimatedWrapper>
      <Wrapper
        size={size}
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
