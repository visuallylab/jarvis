import { FC, useState } from 'react';
import styled from 'styled-components';

import UsageItem from './UsageItem';
import BackupStatus from './BackupStatus';
import UsageLinechart from './UsageLinechart';
import CurrentUsage from './CurrentUsage';

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
};

const UsageBox: FC<TProps> = ({ width }) => {
  // const [data, setSate] = useState<number>(12.5);

  return (
    <Wrapper width={width}>
      {/* <Table.Container>
        {columnOrder.map(key => (
          <Table.Column key={key}>
            {data.map((d, idx) => (
              <Table.Row key={idx} count={data.length}>
                <UsageItem key={idx} itemKey={key} item={d} />
              </Table.Row>
            ))}
          </Table.Column>
        ))}
      </Table.Container> */}
      <BackupStatus data={{ value: 13902, ratio: 20 }} />
      <CurrentUsage
        useValue={36378}
        maxValue={41920}
        estimateHighValue={39201}
        pieHeight={200}
      />
      <UsageLinechart />
    </Wrapper>
  );
};

export default UsageBox;
