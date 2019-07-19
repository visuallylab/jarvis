import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from 'recharts';

const valueBase = 34992;

const createChartData = () => {
  const maxProvide = 50000;
  return Array.from({ length: 24 }).map((_, d) => {
    const hour = String(d);

    const useValue = valueBase + Math.floor(Math.random() * 10000);
    let maxEstimate = useValue + Math.floor(Math.random() * 5000);
    if (maxEstimate % 2) {
      // 亂減一下，給點電力不足的錯誤資訊
      maxEstimate -= Math.floor(Math.random() * 3000);
    }
    return {
      hour,
      useValue,
      maxEstimate,
      maxProvide,
      backupCapacity: maxProvide - maxEstimate,
    };
  });
};

const UsageLinechart = () => {
  const chartData = createChartData();
  return (
    <ResponsiveContainer width="100%" height="30%">
      <LineChart
        data={chartData}
        margin={{
          top: 0,
          right: 20,
          left: 20,
          bottom: 0,
        }}
      >
        {/* <YAxis /> */}
        <XAxis dataKey="hour" interval={1} />
        <Tooltip
          wrapperStyle={{
            backgroundColor: 'rgba(0,0,0,.7)',
          }}
        />
        <Line dataKey="useValue" stroke="rgb(127, 222, 195)" />
        <Line dataKey="maxProvide" stroke="#fff" />
        <Line dataKey="backupCapacity" stroke="rgb(244, 228, 94)" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UsageLinechart;
