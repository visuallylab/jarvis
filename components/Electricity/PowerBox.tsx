import styled from 'styled-components';
import { FC } from 'react';

const Wrapper = styled.div<{ width?: string }>`
  width: ${p => p.width || '100%'};
`;

type TProps = {
  width?: string;
};

const PowerBox: FC<TProps> = ({ width }) => {
  return <Wrapper width={width}>power</Wrapper>;
};

export default PowerBox;
