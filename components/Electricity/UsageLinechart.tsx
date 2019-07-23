import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FC } from 'react';
import { TUsageData } from '@/utils/electricity';

type TProps = {
  hours: number[];
  data: TUsageData[];
};

const UsageLinechart: FC<TProps> = ({ data, hours }) => {
  return (
    <ResponsiveContainer width="100%" height="30%">
      <LineChart
        data={data}
        margin={{
          top: 0,
          right: 20,
          left: 20,
          bottom: 0,
        }}
      >
        {/* <YAxis /> */}
        <XAxis
          dataKey="hour"
          // ticks={hours}
        />
        <Tooltip
          content={(src: any) => {
            if (!src.payload.length) return null;
            const data = src.payload[0].payload;
            return (
              <div>
                {data.hour}: {data.minute}: {data.sec}
              </div>
            );
          }}
          // contentStyle={{
          //   backgroundColor: 'rgba(0,0,0,.7)',
          // }}
        />
        <Line dataKey="useValue" stroke="rgb(127, 222, 195)" dot={false} />
        <Line dataKey="maxProvide" stroke="#fff" dot={false} />
        <Line dataKey="backupCapacity" stroke="rgb(244, 228, 94)" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UsageLinechart;
