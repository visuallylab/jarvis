import { FC } from 'react';
import styled from 'styled-components';
import BackupStatus from './BackupStatus';
import UsageLinechart from './UsageLinechart';
import CurrentUsage from './CurrentUsage';
import { TUsageData } from '@/utils/electricity';

const Wrapper = styled.div<{ width?: string }>`
  width: ${p => p.width || '100%'};
  background-color: ${p => p.theme.colors.boxBackground};
  border-radius: ${p => p.theme.borderRadius};
  border: solid 1px ${p => p.theme.colors.boxBorder};
  box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.1) inset;
  padding: 0.5em 1em;
`;

export type TData = {
  iconUri: string;
  title: string;
  value: number;
  ratio: number;
};

type TProps = {
  width?: string;
  data: TUsageData[];
  hours: number[];
};

const UsageBox: FC<TProps> = ({ width, data, hours }) => {
  const latestData = data[data.length - 1];

  return (
    <Wrapper width={width}>
      <BackupStatus value={latestData.backupCapacity} lastHigh={3885} />
      <CurrentUsage
        useValue={latestData.useValue}
        maxValue={latestData.maxProvide}
        estimateHighValue={latestData.estimatedHigh}
        pieHeight={200}
      />
      <UsageLinechart data={data} hours={hours} />
    </Wrapper>
  );
};

export default UsageBox;
