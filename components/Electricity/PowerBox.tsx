import { FC } from 'react';
import styled from 'styled-components';

import EnergyStatus from './EnergyStatus';
import { TEnergyData } from '@/utils/electricity';

const Wrapper = styled.div<{ width?: string }>`
  width: ${p => p.width || '100%'};
  background-color: ${p => p.theme.colors.boxBackground};
  border-radius: ${p => p.theme.borderRadius};
  border: solid 1px ${p => p.theme.colors.boxBorder};
  box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.1) inset;
  padding: 0.5em 1em;
`;

type TGreenData = {
  wind: number;
  solar: number;
  hydro: number;
  coGen: number;
};

type TFireData = {
  oil: number;
  coal: number;
  lng: number;
};

type TNuclearData = {
  nuclear1: number;
  nuclear2: number;
};

interface IData<T> {
  data: T;
  goal: {
    more: boolean;
    value: number;
  };
}

export type TEnergy = {
  green: IData<TGreenData>;
  fire: IData<TFireData>;
  nuclear: IData<TNuclearData>;
};

type TProps = {
  width?: string;
  data: TEnergyData[];
  hours: number[];
};

const PowerBox: FC<TProps> = ({ width, data, hours }) => {
  const latestEnergy = data[data.length - 1];
  return (
    <Wrapper width={width}>
      <EnergyStatus data={latestEnergy.energy} total={latestEnergy.total} />
    </Wrapper>
  );
};

export default PowerBox;
