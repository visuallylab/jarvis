import { useState, useMemo } from 'react';

import DeckGL from '@deck.gl/react';
import MapGL, { ViewState, Popup } from 'react-map-gl';
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
};

const Map = () => {
  const buildingLayer = getBuildingLayer();
  const lightingEffect = getLightEffect();
  const [status, setStatus] = useState(MapStatus.Overview);
  const [viewState, setViewState] = useState<ViewState>(initialViewState);
  const [gl, setGl] = useState();
  const [showInfo, setShowInfo] = useState(false);

  const {
    lineLayer,
    hoverData,
    count: trafficJamCount,
    length: trafficJamLenght,
  } = useLineLayer(status === MapStatus.TrafficJam);
  const { timestamps, transportation } = useTransportationData(
    status === MapStatus.Overview,
    traffic,
  );
  const { layers: busLayers } = useBusScenegraphLayers(
    status === MapStatus.BusCapacityUtilization,
    buses,
  );
  const tripLayers = useTripLayers(traffic as TransporationItem[], timestamps);
  const accidentLayer = useAccidentLayers(
    status === MapStatus.Accident,
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
    switch (status) {
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
        result = [buildingLayer, lineLayer];
        break;
    }
    return result;
  };

  const title = useMemo(() => {
    let result = '交通概況';
    switch (status) {
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
  }, [status]);

  return (
    <MapGL
      {...GLMapProps}
      gl={gl}
      reuseMaps={true}
      viewState={viewState}
      preventStyleDiffing={true}
      onViewportChange={state => setViewState(state)}
    >
      <DeckGL
        controller={true}
        effects={[lightingEffect]}
        layers={getLayers()}
        initialViewState={initialViewState}
        viewState={viewState}
        onWebGLInitialized={setGl}
      />
      {showInfo && Popups}
      {status === MapStatus.Accident && (
        <Popup
          longitude={120.2063817400933}
          latitude={22.99229346995837}
          closeButton={false}
        >
          💥
        </Popup>
      )}
      <Panel
        title={title}
        infos={[
          `平均時速: ${
            isNaN(averageSpeed) ? 0 : averageSpeed.toFixed(2)
          } km/hr`,
          `目前城市中有 ${carsAmount} 輛汽車、${scooterAmount} 輛機車行駛`,
          `共有 ${trafficJamCount} 處塞車，全長 ${trafficJamLenght} 公尺`,
          `一小時內有 1 件車禍，無人傷亡`,
          `公共運輸滿載率 67%，延誤率 13%，今日平均延誤 3 分鐘`,
        ]}
        buttonConfigs={[
          { text: '顯示車輛資料', onClick: () => setShowInfo(prev => !prev) },
          { text: '交通概況', onClick: () => setStatus(MapStatus.Overview) },
          {
            text: '塞車分佈',
            onClick: () => setStatus(MapStatus.TrafficJam),
          },
          {
            text: '車禍路徑紀錄',
            onClick: () => setStatus(MapStatus.Accident),
          },
          {
            text: '公車站牌等候人次',
            onClick: () => setStatus(MapStatus.BusCapacityUtilization),
          },
          {
            text: '顯示地點車輛流量',
            onClick: () => alert('not implemetnt yet'),
          },
          {
            text: '顯示上個月的統計資料',
            onClick: () => alert('not implemetnt yet'),
          },
        ]}
      />
      {hoverData.object && (
        <Tooltip left={hoverData.x} top={hoverData.y}>
          塞車
        </Tooltip>
      )}
    </MapGL>
  );
};

export default Map;
