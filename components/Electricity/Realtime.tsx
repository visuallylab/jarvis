import { FC } from 'react';
import styled from 'styled-components';

import H1 from '@/components/H1';
import UsageBox from './UsageBox';
import PowerBox from './PowerBox';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 5%;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: cenetr;
  justify-content: space-between;
`;

const Title = styled(H1)`
  margin-top: 0.8em;
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
