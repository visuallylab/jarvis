import { useContext } from 'react';
import styled from 'styled-components';
import { JarvisContext } from '@/contexts/jarvisContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const Status = styled.div<{ enabled: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${p => (p.enabled ? '#20FC8F' : '#EF2D56')};
`;

const Button = styled.button`
  width: 100px;
  height: 30px;
  margin-left: 10px;
  border: solid 1px ${p => p.theme.colors.smokyBlack};
`;

const IdleJarvis = () => {
  const { jarvis, enabled } = useContext(JarvisContext);
  return (
    <Wrapper>
      <Status enabled={enabled} />
      <Button onClick={() => (enabled ? jarvis!.disable() : jarvis!.enable())}>
        {enabled ? 'disable' : 'enable'}
      </Button>
    </Wrapper>
  );
};

export default IdleJarvis;
