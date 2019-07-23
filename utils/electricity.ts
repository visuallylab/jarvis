import dayjs from 'dayjs';
import { TEnergy } from '@/components/Electricity/PowerBox';

export const MAX_PROVIDE = 2800 + Math.floor(Math.random() * 1200) + 1000;

export type TEnergyData = {
  hour: number;
  minute: number;
  sec: number;
  energy: TEnergy;
  total: number;
};

export type TUsageData = {
  hour: number;
  minute: number;
  sec: number;
  useValue: number;
  estimatedHigh: number;
  maxProvide: number;
  backupCapacity: number;
};

const createBase: () => TEnergy = () => ({
  green: {
    data: {
      wind: 12.8,
      solar: 38.7,
      hydro: 50.2,
      coGen: 134.4,
    },
    goal: {
      more: true,
      value: 20,
    },
  },
  fire: {
    data: {
      oil: 37.2,
      coal: 1240.6,
      lng: 848.2,
    },
    goal: {
      more: false,
      value: 50,
    },
  },
  nuclear: {
    data: {
      nuclear1: 129.7,
      nuclear2: 260,
    },
    goal: {
      more: false,
      value: 20,
    },
  },
});

export const createCurrentData = () => {
  const start = dayjs()
    .startOf('day')
    .valueOf(); // seconds
  const end = dayjs().valueOf();

  const usageData: TUsageData[] = [];
  const energyData: TEnergyData[] = [];
  const hours: number[] = [];
  const base = createBase();
  const current: TEnergy = createBase();
  let nextUseSeconds = start;

  for (let i = start; i <= end; i += 1000) {
    if (i === nextUseSeconds) {
      const hour = dayjs(i).hour();
      const minute = dayjs(i).minute();
      const sec = dayjs(i).second();
      if (hours.length === 0 || hours[hours.length - 1] !== hour) {
        hours.push(hour);
      }

      let random = 0;

      if (i !== start) {
        random = Math.floor(Math.random() * 100);

        if (random % 2) {
          Object.keys(current).forEach(key => {
            Object.keys(current[key].data).forEach(k => {
              current[key].data[k] += Math.random() * 3;
              if (current[key].data[k] >= base[key].data[k] + 300) {
                current[key].data[k] -= Math.random() * 300 + 200;
              }
            });
          });
        } else {
          Object.keys(current).forEach(key => {
            Object.keys(current[key].data).forEach(k => {
              current[key].data[k] -= Math.random() * 2;
              if (
                current[key].data[k] <= base[key].data[k] - 300 ||
                current[key].data[k] < 0
              ) {
                current[key].data[k] = base[key].data[k];
              }
            });
          });
        }
      }

      const total = Object.values(current).reduce(
        (acc, cur) => acc + Object.values(cur.data).reduce((a, c) => a + c, 0),
        0,
      );

      const estimatedHigh = total + random;

      usageData.push({
        hour,
        minute,
        sec,
        useValue: total,
        estimatedHigh,
        maxProvide: MAX_PROVIDE,
        backupCapacity: MAX_PROVIDE - estimatedHigh,
      });

      energyData.push({
        hour,
        minute,
        sec,
        energy: current,
        total,
      });

      nextUseSeconds = i + Math.ceil(Math.random() * 30 + 1) * 1000;
    }
  }
  return {
    usageData,
    energyData,
    hours,
  };
};
