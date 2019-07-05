import { FC, useState, useContext } from 'react';
import styled from 'styled-components';

import IdleJarvis from './Idle';
import ListeningJarvis from './Listening';

const Wrapper = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  width: 30%;
  min-width: 200px;
  height: 50vh;
  z-index: ${p => p.theme.z.high};
  border: solid 1px black;
`;

const Jarvis: FC = () => {
  return (
    <Wrapper>
      <IdleJarvis />
      <ListeningJarvis />
    </Wrapper>
  );
};

export default Jarvis;
