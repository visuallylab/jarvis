import { FC } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { FaBolt } from 'react-icons/fa';
import H3 from '@/components/H3';

const Wrapper = styled.div`
  margin-bottom: 1.5em;
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Ratio = styled(animated.p)<{ color: string }>`
  font-weight: 700;
  font-size: 4em;
  letter-spacing: 2px;
  margin-left: 10px;
  color: ${p => p.color};
`;

const StatusText = styled.span`
  font-size: ${p => p.theme.fontSize.bigger};
  color: ${p => p.color};
  letter-spacing: 1px;
  margin-top: 5px;
`;

const COLORS = ['#59e2c2'];

const BackupStatus: FC<{ data: { value: number; ratio: number } }> = ({
  data,
}) => {
  const { value, ratio } = data;
  const props = useSpring({ number: data.ratio, from: { number: 0 } });
  let statusText = '';
  let color = COLORS[0];

  if (ratio >= 10) {
    statusText = 'SUPPLY GREAT';
    color = COLORS[0];
  } else if (ratio < 10 && ratio > 6) {
    statusText = 'SUPPLY TIGHT';
    color = COLORS[1];
  } else if (ratio <= 6) {
    statusText = 'WARNING';
    color = COLORS[2];
  }

  return (
    <Wrapper>
      <H3 noBold={true}>Backup status:</H3>
      <div style={{ textAlign: 'center' }}>
        <StatusWrapper>
          <FaBolt
            style={{ marginRight: '.25em', marginTop: '3px' }}
            color={color}
            size="3.5em"
          />
          <Ratio color={color}>
            {props.number.interpolate(x => `${x.toFixed(1)}%`)}
          </Ratio>
        </StatusWrapper>
        <StatusText color={color}>( {statusText} )</StatusText>
      </div>
    </Wrapper>
  );
};

export default BackupStatus;
