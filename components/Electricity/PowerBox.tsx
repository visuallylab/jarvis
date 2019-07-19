import styled from 'styled-components';
import { FC } from 'react';

const Wrapper = styled.div<{ width?: string }>`
  width: ${p => p.width || '100%'};
  background-color: ${p => p.theme.colors.boxBackground};
  border-radius: ${p => p.theme.borderRadius};
  border: solid 1px ${p => p.theme.colors.boxBorder};
  box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.1) inset;
  padding: 0.5em 1em;
`;

type TProps = {
  width?: string;
};

const PowerBox: FC<TProps> = ({ width }) => {
  return <Wrapper width={width}>power</Wrapper>;
};

export default PowerBox;
