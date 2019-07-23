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

  useEffect(() => {
    let title = '交通概況';
    switch (mapState) {
      case MapStatus.FocusXimenRdSec1:
        title = 'FocusXimenRdSec1';
        break;
      case MapStatus.FocusXimenRdSec2:
        title = 'FocusXimenRdSec2';
        break;
      case MapStatus.FocusZhongzhengRd:
        title = 'FocusZhongzhengRd';
        break;
      case MapStatus.ShowAccidentXimenRdSec1:
        title = 'ShowAccidentXimenRdSec1';
        break;
      case MapStatus.ShowAccidentXimenRdSec2:
        title = 'ShowAccidentXimenRdSec2';
        break;
      case MapStatus.ShowAccidentZhongzhengRd:
        title = 'ShowAccidentZhongzhengRd';
        break;
      case MapStatus.Start:
        title = '交通概況';
        break;
      case MapStatus.TrafficJam:
        title = '塞車分佈';
        break;
      case MapStatus.TrainUtilization:
        title = '台鐵車次與車站人次分佈';
        break;
    }

    const buttonConfigs =
      mapState === MapStatus.Start
        ? [
            {
              text: 'TrafficJam',
              onClick: () => setMapState(MapStatus.TrafficJam),
            },
            {
              text: 'Start',
              onClick: () => setMapState(MapStatus.Start),
            },
            {
              text: 'ShowAccidentZhongzhengRd',
              onClick: () => setMapState(MapStatus.ShowAccidentZhongzhengRd),
            },
            {
              text: 'ShowAccidentXimenRdSec2',
              onClick: () => setMapState(MapStatus.ShowAccidentXimenRdSec2),
            },
            {
              text: 'ShowAccidentXimenRdSec1',
              onClick: () => setMapState(MapStatus.ShowAccidentXimenRdSec1),
            },
            {
              text: 'FocusZhongzhengRd',
              onClick: () => setMapState(MapStatus.FocusZhongzhengRd),
            },
            {
              text: 'FocusXimenRdSec2',
              onClick: () => setMapState(MapStatus.FocusXimenRdSec2),
            },
            {
              text: 'FocusXimenRdSec1',
              onClick: () => setMapState(MapStatus.FocusXimenRdSec1),
            },
            {
              text: 'TrainUtilization',
              onClick: () => setMapState(MapStatus.TrainUtilization),
            },
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

    let infos: string[] = [];
    switch (mapState) {
      case MapStatus.Start:
        infos = [
          averageSpeedDesc,
          carsAndScootersAmountDesc,
          accidentDesc,
          busDesc,
          trafficJamDesc,
        ];
        break;
      case MapStatus.FocusXimenRdSec1:
      case MapStatus.ShowAccidentXimenRdSec1:
      case MapStatus.FocusXimenRdSec2:
      case MapStatus.ShowAccidentXimenRdSec2:
      case MapStatus.FocusZhongzhengRd:
      case MapStatus.ShowAccidentZhongzhengRd:
      case MapStatus.TrafficJam:
        infos = [trafficJamDesc, busDesc];
        break;
      case MapStatus.TrainUtilization:
        infos = [];
        break;
    }

    setPanelProps(prev => ({
      ...prev,
      infos,
    }));
  }, [mapState, transportation]);

  return { panelProps };
};

export default usePanelProps;
