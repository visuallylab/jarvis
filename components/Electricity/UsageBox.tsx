import { FC, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

import H3 from '@/components/H3';
import Table from '@/components/Table';
import { getRelativePath } from '@/utils';

const Wrapper = styled.div<{ width?: string }>`
  width: ${p => p.width || '100%'};
`;

type TProps = {
  width?: string;
};

type TData = {
  iconUri: string;
  title: string;
  value: number;
  ratio: number;
};

type TItemProps = { itemKey: string; item: TData };

const AnimatedUsage = styled(animated.div)`
  font-size: 4em;
  font-weight: bold;
`;

const Icon = styled.img`
  width: 3em;
`;

const Item: FC<TItemProps> = ({ itemKey, item }) => {
  const data = item[itemKey as keyof TData];
  const props = useSpring({
    number: typeof data === 'number' ? data : 0,
    from: {
      number: 0,
    },
  });

  switch (itemKey) {
    case 'iconUri': {
      return <Icon src={data as string} />;
    }
    case 'title': {
      return <H3>{data}</H3>;
    }
    case 'ratio': {
      return (
        <AnimatedUsage>
          {props.number.interpolate(x => `${x.toFixed(0)}%`)}
        </AnimatedUsage>
      );
    }
    case 'value': {
      return (
        <animated.div>
          {props.number.interpolate(x => `${x.toFixed(0)} MW`)}
        </animated.div>
      );
    }
    default:
      return null;
  }
};

const UsageBox: FC<TProps> = ({ width }) => {
  const columnOrder = ['iconUri', 'title', 'ratio', 'value'];
  const [data] = useState<TData[]>([
    {
      iconUri: getRelativePath('/static/icon/energy.svg'),
      title: 'Current usage',
      value: 36378,
      ratio: 88,
    },
    {
      iconUri: getRelativePath('/static/icon/max-value.svg'),
      title: 'Estimate max usage',
      value: 36966,
      ratio: 90,
    },
    {
      iconUri: getRelativePath('/static/icon/backup-capacity.svg'),
      title: 'Backup capacity',
      value: 379,
      ratio: 10,
    },
  ]);

  return (
    <Wrapper width={width}>
      <Table.Container>
        {columnOrder.map(key => (
          <Table.Column key={key}>
            {data.map((d, idx) => (
              <Table.Row key={idx} count={data.length}>
                <Item key={idx} itemKey={key} item={d} />
              </Table.Row>
            ))}
          </Table.Column>
        ))}
      </Table.Container>
    </Wrapper>
  );
};

export default UsageBox;
