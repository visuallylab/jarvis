import styled from 'styled-components';

type TSectionProps = {
  row?: boolean;
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  justifyContent?: 'center' | 'flex-start' | 'flex-end';
  fullscreen?: boolean;
  src?: string;
};

export default styled.section<TSectionProps>`
  position: relative;
  width: 100%;
  height: ${p => (p.fullscreen ? '100vh' : 'initial')};
  display: flex;
  flex-direction: ${({ row = false }) => (row ? 'row' : 'column')};
  justify-content: ${p => p.justifyContent || 'center'};
  align-items: ${p => p.alignItems || 'center'};
  min-height: ${p => (p.fullscreen ? '100vh' : 'initial')};
  ${p =>
    p.src &&
    `
    background: url(${p.src}) no-repeat center/cover;
  `}
  z-index: 1;
`;
