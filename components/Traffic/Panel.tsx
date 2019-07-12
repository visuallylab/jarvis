import React from 'react';
import styled from 'styled-components';
import Indicator from './Indicator';
import { TrafficStatus, IndicatorMessage, IndicatorColor } from '@/constants';
import Button from './Button';
import LineChart from './LineChart';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 64px 64px 36px 24px;
  pointer-events: none;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ExtraContainer = styled.div`
  flex-grow: 1;
`;

const Info = styled.p<{ large?: boolean }>`
  color: rgba(0, 217, 255, 0.8);
  padding-left: 24px;
  margin: 8px 0;
  font-weight: 100;
  font-size: ${props => (props.large ? '48px' : '18px')};
`;

const VerticalLayoutWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HorizontalLayoutWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: bottom;
`;

const ButtonWrapper = styled.div`
  display: flex;
  max-width: 1300px;
  justify-content: space-between;
`;

type TButton = {
  text: string;
  onClick: () => void;
};

export type TTrafficFlow = Array<{ value: number; time: string }>;

export type TProps = {
  title: string;
  infos: string[];
  buttonConfigs: TButton[];
  status: TrafficStatus;
  trafficFlowData?: TTrafficFlow;
};

const Panel: React.FC<TProps> = React.memo(
  ({ title, infos, buttonConfigs, status, trafficFlowData }) => (
    <Container>
      <HorizontalLayoutWrapper>
        <MainContainer>
          <VerticalLayoutWrapper>
            <Info large={true}>{title}</Info>
            <Indicator
              text={
                status === TrafficStatus.normal
                  ? IndicatorMessage.normal
                  : IndicatorMessage.warning
              }
              color={
                status === TrafficStatus.normal
                  ? IndicatorColor.normal
                  : IndicatorColor.warning
              }
            />
          </VerticalLayoutWrapper>
          {infos.map(info => (
            <Info key={info}>{info}</Info>
          ))}
          <ButtonWrapper>
            {buttonConfigs.map(config => (
              <Button key={config.text} onClick={config.onClick}>
                {config.text}
              </Button>
            ))}
          </ButtonWrapper>
        </MainContainer>
        <ExtraContainer>
          {trafficFlowData && <LineChart data={trafficFlowData} />}
        </ExtraContainer>
      </HorizontalLayoutWrapper>
    </Container>
  ),
);

export default Panel;
