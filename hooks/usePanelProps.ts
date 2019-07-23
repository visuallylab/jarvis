import { useState, useEffect } from 'react';
import { TButton, TTrafficFlow } from '../components/Traffic/Panel';
import { MapStatus } from '@/components/Traffic/Map';

type TProps = {
  mapState: MapStatus;
  setMapState: (state: MapStatus) => void;
  trafficJamCount: number;
  trafficJamLength: number;
  transportation: Array<{
    id: string;
    speed: number;
    latlng: number[];
    timestamp: number;
    direction: number;
    vehicleId: string;
    type: number;
  }>;
};

type TStates = {
  title: string;
  infos: string[];
  buttonConfigs: TButton[];
  trafficFlowData?: TTrafficFlow;
};

const usePanelProps = ({
  mapState,
  setMapState,
  transportation,
  trafficJamCount,
  trafficJamLength,
}: TProps) => {
  const [panelProps, setPanelProps] = useState<TStates>({
    title: '',
    infos: [],
    buttonConfigs: [],
    trafficFlowData: [],
  });
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    let title = '交通概況';
    switch (mapState) {
      case MapStatus.Accident:
        title = '車禍路徑紀錄';
        break;
      case MapStatus.BusCapacityUtilization:
        title = '公車站牌等候人次';
        break;
      case MapStatus.Overview:
        title = '交通概況';
        break;
      case MapStatus.TrafficJam:
        title = '塞車分佈';
        break;
    }

    const buttonConfigs =
      mapState === MapStatus.Overview
        ? [
            {
              text: '交通概況',
              onClick: () => setMapState(MapStatus.Overview),
            },
            {
              text: '公車站牌等候人次',
              onClick: () => setMapState(MapStatus.BusCapacityUtilization),
            },
            {
              text: '顯示上個月的統計資料',
              onClick: () => alert('not implemetnt yet'),
            },
            // {
            //   text: '顯示車輛資料',
            //   onClick: () => setShowInfo(prev => !prev),
            // },
            // {
            //   text: '塞車分佈',
            //   onClick: () => setMapState(MapStatus.TrafficJam),
            // },
            // {
            //   text: '車禍路徑紀錄',
            //   onClick: () => setMapState(MapStatus.Accident),
            // },
            // {
            //   text: '顯示地點車輛流量',
            //   onClick: () => alert('not implemetnt yet'),
            // },
          ]
        : [];
    setPanelProps(prev => ({
      ...prev,
      title,
      buttonConfigs,
    }));
  }, [mapState]);

  useEffect(() => {
    const carsAmount = transportation.filter(t => t.type === 0 && t.speed !== 0)
      .length;
    const scooterAmount = transportation.filter(
      t => t.type === 1 && t.speed !== 0,
    ).length;

    const averageSpeed =
      transportation.reduce((prev, curr) => prev + curr.speed, 0) /
      (carsAmount + scooterAmount);
    const averageSpeedDesc = `平均時速: ${
      isNaN(averageSpeed) ? 0 : averageSpeed.toFixed(2)
    } km/hr`;
    const carsAndScootersAmountDesc = `目前城市中有 ${carsAmount} 輛汽車、${scooterAmount} 輛機車行駛`;
    const accidentDesc = `一小時內有 1 件車禍，無人傷亡`;
    const busDesc = `公共運輸滿載率 67%，延誤率 13%，今日平均延誤 3 分鐘`;

    const trafficJamDesc = `共有 ${trafficJamCount} 處塞車，全長 ${trafficJamLength} 公尺`;

    const infos =
      mapState === MapStatus.Overview
        ? [
            averageSpeedDesc,
            carsAndScootersAmountDesc,
            accidentDesc,
            busDesc,
            trafficJamDesc,
          ]
        : mapState === MapStatus.TrafficJam || mapState === MapStatus.Accident
        ? [trafficJamDesc, busDesc]
        : [];

    setPanelProps(prev => ({
      ...prev,
      infos,
    }));
  }, [mapState, transportation]);

  return { panelProps, showInfo };
};

export default usePanelProps;
