import { useContext } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { JarvisContext } from '@/contexts/jarvisContext';
import { JarvisStatus } from '@/services/JarvisService';

const Wrapper = styled(animated.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-top: 2vh;
`;

const Status = styled.div<{ enabled: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${p => (p.enabled ? '#20FC8F' : '#EF2D56')};
  margin-right: 10px;
`;

const Button = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  height: 30px;
  border: solid 1px ${p => p.theme.colors.spaceGray};
  background-color: ${p => p.theme.colors.spaceGray};
  border-radius: ${p => p.theme.borderRadius};
  margin: 0 10px;
`;

const IdleJarvis = () => {
  const { jarvis, enabled, status } = useContext(JarvisContext);
  const style = useSpring({
    opacity: status === JarvisStatus.Idle ? 1 : 0,
  });
  return (
    <Wrapper style={style}>
      <p>Jarvis: </p>
      <Button onClick={() => (enabled ? jarvis!.disable() : jarvis!.enable())}>
        <Status enabled={enabled} />
        {enabled ? 'enabled' : 'not running'}
      </Button>
    </Wrapper>
  );
};

export default IdleJarvis;
