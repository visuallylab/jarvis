import { FC } from 'react';
import styled from 'styled-components';

import H1 from '@/components/H1';
import UsageBox from './UsageBox';
import PowerBox from './PowerBox';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  padding: 1em 4%;
`;

const Title = styled(H1)`
  margin: 0 0.5em 0.75em;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: cenetr;
  justify-content: space-between;
  height: 90%;
`;

const Realtime: FC = () => {
  return (
    <Wrapper>
      <Title>Electricity Dashboard</Title>
      <ContentWrapper>
        <UsageBox width="45%" />
        <PowerBox width="45%" />
      </ContentWrapper>
    </Wrapper>
  );
};

export default Realtime;
