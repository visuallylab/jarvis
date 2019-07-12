import {
  LineChart as RechartLineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import React, { useMemo } from 'react';

type TProps = {
  data: Array<{ time: string; value: number }>;
};

const LineChart: React.FC<TProps> = ({ data }) => {
  const chart = useMemo(
    () => (
      <RechartLineChart
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <Legend verticalAlign="top" height={36} />
        <XAxis
          dataKey="time"
          interval={2}
          padding={{ right: 60, left: 0 }}
          stroke="#fff"
        />
        <YAxis
          domain={[0, dataMax => Math.round(dataMax * 1.3)]}
          stroke="#fff"
        />
        <Line
          name="每分鐘車流量"
          type="monotone"
          dataKey="value"
          stroke="white"
        >
          {/* 
      // @ts-ignore */}
          <LabelList
            position="top"
            valueAccessor={(_, index) =>
              index === data.length - 1 ? data[data.length - 1].value : ''
            }
            content={({ y, value }) => (
              <text
                x="100%"
                y={y ? y - 10 : 0}
                fill="rgb(0, 217, 255)"
                fontSize={60}
                textAnchor="end"
                alignmentBaseline="baseline"
              >
                {value}
              </text>
            )}
          />
        </Line>
      </RechartLineChart>
    ),
    [data],
  );

  return <ResponsiveContainer width="90%">{chart}</ResponsiveContainer>;
};

export default LineChart;
