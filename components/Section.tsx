import styled from 'styled-components';

type TSectionProps = {
  row?: boolean;
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  fullscreen?: boolean;
};

export default styled.section<TSectionProps>`
  width: 100%;
  height: ${p => (p.fullscreen ? '100vh' : 'initial')};
  padding: ${p => (p.fullscreen ? 0 : '8vh 0')};
  display: flex;
  flex-direction: ${({ row = false }) => (row ? 'row' : 'column')};
  justify-content: center;
  align-items: ${p => p.alignItems || 'center'};
`;
