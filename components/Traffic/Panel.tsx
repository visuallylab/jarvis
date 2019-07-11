import React from 'react';
import styled from 'styled-components';
import Indicator from './Indicator';
import { TrafficStatus, IndicatorMessage, IndicatorColor } from '@/constants';
import Button from './Button';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 64px 64px 36px 24px;
  pointer-events: none;
`;

const Info = styled.p<{ large?: boolean }>`
  color: rgba(0, 217, 255, 0.8);
  padding-left: 24px;
  margin: 8px 0;
  font-weight: 100;
  font-size: ${props => (props.large ? '48px' : '18px')};
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-left: 24px;
  flex: 1;
  max-width: 1300px;
  justify-content: space-between;
`;

type TButton = {
  text: string;
  onClick: () => void;
};

type TProps = {
  title: string;
  infos: string[];
  buttonConfigs: TButton[];
  status: TrafficStatus;
};

const Panel: React.FC<TProps> = React.memo(
  ({ title, infos, buttonConfigs, status }) => (
    <Container>
      <FlexWrapper>
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
      </FlexWrapper>
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
    </Container>
  ),
);

export default Panel;
