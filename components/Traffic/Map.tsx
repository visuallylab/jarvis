import { useState, useMemo, useEffect } from 'react';

import DeckGL from '@deck.gl/react';
import { ViewState, Popup, FlyToInterpolator, StaticMap } from 'react-map-gl';
import useLineLayer from '@/hooks/useLineLayer';
import useTripLayers from '@/hooks/useTripLayers';
import useAccidentLayers from '@/hooks/useAccidentLayer';
import useTransportationData from '@/hooks/useTransportationData';
import useBusScenegraphLayers from '@/hooks/useBusScenegraphLayer';

import 'mapbox-gl/dist/mapbox-gl.css';
import buses from 'static/buses.json';
import traffic from 'static/traffic.json';
import accidents from 'static/accidents.json';
import Panel from './Panel';
import Tooltip from './Tooltip';
import CarInfoPopup from './CarInfoPopup';
import { getBuildingLayer, getLightEffect } from '@/utils/traffic';
import { TrafficStatus } from '@/constants';
import cogoToast from 'cogo-toast';
import './toast.css';
import Button from '@/components/Traffic/Button';

enum MapStatus {
  Overview,
  TrafficJam,
  Accident,
  BusCapacityUtilization,
}

const GLMapProps = {
  width: '100vw',
  height: '100vh',
  mapboxApiAccessToken:
    'pk.eyJ1IjoiY2hpbmc1NiIsImEiOiJjaXNiZmYydGMwMTN1MnpwbnNqNWVqM2plIn0.k7h-PUGX7Tl5xLwDH3Qpsg',
  mapStyle: 'mapbox://styles/uberdata/cjoqbbf6l9k302sl96tyvka09',
};

const initialViewState = {
  longitude: 120.2063817400933,
  latitude: 22.99229346995837,
  zoom: 15,
  pitch: 45,
  bearing: 0,
  transitionDuration: 500,
  transitionInterpolator: new FlyToInterpolator(),
};

const events = [
  {
    name: '下班人潮激增，出現三處塞車',
  },
];

const Map = () => {
  const buildingLayer = getBuildingLayer();
  const lightingEffect = getLightEffect();
  const [mapState, setMapState] = useState(MapStatus.Overview);
  const [viewState, setViewState] = useState<
    ViewState & { transitionDuration: number; transitionInterpolator: any }
  >(initialViewState);
  const [showInfo, setShowInfo] = useState(false);
  const [trafficStatus, setTrafficStatus] = useState(TrafficStatus.normal);

  const {
    lineLayer,
    hoverData,
    count: trafficJamCount,
    length: trafficJamLenght,
  } = useLineLayer(mapState === MapStatus.TrafficJam);
  const { timestamps, transportation } = useTransportationData(true, traffic);
  const { layers: busLayers } = useBusScenegraphLayers(
    mapState === MapStatus.BusCapacityUtilization,
    buses,
  );
  const tripLayers = useTripLayers(traffic as TransporationItem[], timestamps);
  const accidentLayer = useAccidentLayers(
    mapState === MapStatus.Accident,
    accidents,
  );

  const Popups = transportation
    .slice(0, 1)
    .map((d, i) => (
      <CarInfoPopup
        key={d.id}
        lat={d.latlng[1]}
        lng={d.latlng[0]}
        texts={[` 車牌: ${d.vehicleId} #${i}`, `時速:${d.speed} km/h`]}
      />
    ));

  const carsAmount = transportation.filter(t => t.type === 0 && t.speed !== 0)
    .length;
  const scooterAmount = transportation.filter(
    t => t.type === 1 && t.speed !== 0,
  ).length;

  const averageSpeed =
    transportation.reduce((prev, curr) => prev + curr.speed, 0) /
    (carsAmount + scooterAmount);

  const getLayers = () => {
    let result;
    switch (mapState) {
      case MapStatus.Accident:
        result = [accidentLayer];
        break;
      case MapStatus.BusCapacityUtilization:
        result = [buildingLayer, ...busLayers];
        break;
      case MapStatus.Overview:
        result = [buildingLayer, tripLayers];
        break;
      case MapStatus.TrafficJam:
        result = [buildingLayer, lineLayer, tripLayers];
        break;
    }
    return result;
  };

  const title = useMemo(() => {
    let result = '交通概況';
    switch (mapState) {
      case MapStatus.Accident:
        result = '車禍路徑紀錄';
        break;
      case MapStatus.BusCapacityUtilization:
        result = '公車站牌等候人次';
        break;
      case MapStatus.Overview:
        result = '交通概況';
        break;
      case MapStatus.TrafficJam:
        result = '塞車分佈';
        break;
    }
    return result;
  }, [mapState]);

  const averageSpeedDesc = `平均時速: ${
    isNaN(averageSpeed) ? 0 : averageSpeed.toFixed(2)
  } km/hr`;
  const carsAndScootersAmountDesc = `目前城市中有 ${carsAmount} 輛汽車、${scooterAmount} 輛機車行駛`;
  const accidentDesc = useMemo(() => `一小時內有 1 件車禍，無人傷亡`, []);
  const busDesc = useMemo(
    () => `公共運輸滿載率 67%，延誤率 13%，今日平均延誤 3 分鐘`,
    [],
  );
  const trafficJamDesc = useMemo(
    () => `共有 ${trafficJamCount} 處塞車，全長 ${trafficJamLenght} 公尺`,
    [trafficJamCount, trafficJamLenght],
  );

  useEffect(() => {
    /**
     * 1. 顯示目前交通狀況
     * 2. 標出所有塞車地區
     * 3. 分別放大各地區
     * 4. 分析可能原因
     * 5. 一起連環車禍事故發生
     * 6. 比較車禍事故發生時間與之後流量表
     * 7. 與車禍發生的路徑
     * 8. 分析可能疏導方法（AI）
     * 9. 管制流量，恢復交通
     */

    /**
     * 顯示目前交通狀況
     *
     * [v]trip layer
     * [v]avg speed
     * [v]car and scooter count
     * [v]traffic jam count and length
     * [v]accident count and hurt, death
     * [v]bus util percentage, delay rate, avg delay time
     */

    /**
     * 標出所有塞車地區
     *
     * [v]Line layer
     * [v]car and scooter count
     * [v]traffic jam count and length
     * [v]bus util percentage, delay rate, avg delay time
     * [v]三個按鈕，檢視塞車地區 1, 2, 3
     */

    /**
     * 分別放大各地區
     *
     * [v]auto zoom to the pick traffic jam area
     * [v]Line layer
     * []when zoom over the threshold
     * []show cars layer only in the screen
     * []show the area 流量圖 with accident
     */

    /**
     * 觀看車禍原因
     *
     * []重現車禍路徑
     * []車禍雙方車輛資訊與原因
     */

    /**
     * 提示疏導方法
     *
     * []建議疏導的路線
     * []建議指派的人員、位置與動作
     */

    /**
     * 回到交通概覽
     *
     * []建議疏導的路線
     * []建議指派的人員、位置與動作
     */

    const showTrafficJamPrompt = () => {
      cogoToast.info('西門路一段出現塞車路段', {
        onClick: () =>
          setViewState({
            transitionDuration: 500,
            transitionInterpolator: new FlyToInterpolator(),
            longitude: 120.19767902271758,
            latitude: 22.989887240887853,
            zoom: 18,
            pitch: 45,
            bearing: 0,
          }),
        hideAfter: 15,
        position: 'top-right',
        bar: {
          size: '0px',
        },
        renderIcon: () => <Button>查看</Button>,
      });

      cogoToast.info('西門路二段出現塞車路段', {
        onClick: () =>
          setViewState({
            transitionDuration: 500,
            transitionInterpolator: new FlyToInterpolator(),
            longitude: 120.20015723575861,
            latitude: 22.997552333424316,
            zoom: 18,
            pitch: 45,
            bearing: 0,
          }),
        hideAfter: 15,
        position: 'top-right',
        bar: {
          size: '0px',
        },
        renderIcon: () => <Button>查看</Button>,
      });

      cogoToast.info('中正路出現塞車路段', {
        onClick: () =>
          setViewState({
            transitionDuration: 500,
            transitionInterpolator: new FlyToInterpolator(),
            longitude: 120.20120424682624,
            latitude: 22.9922258462312,
            zoom: 18,
            pitch: 45,
            bearing: 0,
          }),
        hideAfter: 15,
        position: 'top-right',
        bar: {
          size: '0px',
        },
        renderIcon: () => <Button> 查看</Button>,
      });
    };

    setTimeout(() => {
      cogoToast.warn(events[0].name, {
        onClick: hide => {
          setMapState(MapStatus.TrafficJam);
          setTimeout(showTrafficJamPrompt, 100);
          // @ts-ignore
          hide();
        },
        hideAfter: 15,
        position: 'top-right',
        bar: {
          size: '0px',
        },
        renderIcon: () => <Button>顯示資訊</Button>,
      });
    }, 300);

    setTrafficStatus(TrafficStatus.warning);
  }, []);

  return (
    <>
      <DeckGL
        controller={true}
        effects={[lightingEffect]}
        layers={getLayers()}
        initialViewState={initialViewState}
        viewState={viewState}
        onViewStateChange={({ viewState: newViewState }: any) =>
          setViewState(newViewState)
        }
      >
        <StaticMap {...GLMapProps}>
          {showInfo && Popups}
          {mapState === MapStatus.Accident && (
            <Popup
              longitude={120.2063817400933}
              latitude={22.99229346995837}
              closeButton={false}
            >
              💥
            </Popup>
          )}
        </StaticMap>
      </DeckGL>
      <Panel
        status={trafficStatus}
        title={title}
        infos={
          mapState === MapStatus.Overview
            ? [
                averageSpeedDesc,
                carsAndScootersAmountDesc,
                accidentDesc,
                busDesc,
                trafficJamDesc,
              ]
            : mapState === MapStatus.TrafficJam
            ? [carsAndScootersAmountDesc, busDesc, trafficJamDesc]
            : []
        }
        buttonConfigs={
          mapState === MapStatus.Overview
            ? [
                {
                  text: '顯示車輛資料',
                  onClick: () => setShowInfo(prev => !prev),
                },
                {
                  text: '交通概況',
                  onClick: () => setMapState(MapStatus.Overview),
                },
                {
                  text: '塞車分佈',
                  onClick: () => setMapState(MapStatus.TrafficJam),
                },
                {
                  text: '車禍路徑紀錄',
                  onClick: () => setMapState(MapStatus.Accident),
                },
                {
                  text: '公車站牌等候人次',
                  onClick: () => setMapState(MapStatus.BusCapacityUtilization),
                },
                {
                  text: '顯示地點車輛流量',
                  onClick: () => alert('not implemetnt yet'),
                },
                {
                  text: '顯示上個月的統計資料',
                  onClick: () => alert('not implemetnt yet'),
                },
              ]
            : []
        }
      />
      {hoverData.object && (
        <Tooltip left={hoverData.x} top={hoverData.y}>
          塞車
        </Tooltip>
      )}
    </>
  );
};

export default Map;
