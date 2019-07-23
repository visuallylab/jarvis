import { useState, useEffect } from 'react';

import DeckGL from '@deck.gl/react';
import { ViewState, FlyToInterpolator, StaticMap } from 'react-map-gl';
import useLineLayer from '@/hooks/useLineLayer';
import useTripLayers from '@/hooks/useTripLayers';
import useAccidentLayers from '@/hooks/useAccidentLayer';
import useTransportationData from '@/hooks/useTransportationData';
import useBusScenegraphLayers from '@/hooks/useBusScenegraphLayer';

import 'mapbox-gl/dist/mapbox-gl.css';
import buses from 'static/buses.json';
import traffic from 'static/traffic.json';
import accidents from 'static/accidents.json';
import Panel, { TTrafficFlow } from './Panel';
import Tooltip from './Tooltip';
import {
  getBuildingLayer,
  getLightEffect,
  createTrafficFlowData,
} from '@/utils/traffic';
import { TrafficStatus } from '@/constants';
import cogoToast from 'cogo-toast';
import './toast.css';
import Button from '@/components/Traffic/Button';
import usePanelProps from '@/hooks/usePanelProps';
import useTrainStatusLayers from '@/hooks/useTrainStatusLayers';

export enum MapStatus {
  Overview,
  TrafficJam,
  Accident,
  BusCapacityUtilization,
  TrainCapacityUtilization,
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
  {
    name: '下班人潮激增，鐵路高度擁擠',
  },
];

const Map = () => {
  const buildingLayer = getBuildingLayer();
  const lightingEffect = getLightEffect();
  const [mapState, setMapState] = useState(MapStatus.Overview);
  const [viewState, setViewState] = useState<
    ViewState & { transitionDuration: number; transitionInterpolator: any }
  >(initialViewState);
  const [trafficStatus, setTrafficStatus] = useState(TrafficStatus.normal);
  const {
    lineLayer,
    hoverData,
    count: trafficJamCount,
    length: trafficJamLength,
  } = useLineLayer(mapState === MapStatus.TrafficJam);
  const { timestamps, transportation } = useTransportationData(true, traffic);
  const [trafficFlowData, setTrafficFlowData] = useState<TTrafficFlow>();
  const { panelProps } = usePanelProps({
    mapState,
    setMapState,
    transportation,
    trafficJamCount,
    trafficJamLength,
  });
  const { layers: busLayers } = useBusScenegraphLayers(
    mapState === MapStatus.BusCapacityUtilization,
    buses,
  );
  const tripLayers = useTripLayers(traffic as TransporationItem[], timestamps);
  const accidentLayer = useAccidentLayers(
    mapState === MapStatus.Accident,
    accidents,
  );
  const trainlayer = useTrainStatusLayers(
    mapState === MapStatus.TrainCapacityUtilization,
  );

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
      case MapStatus.TrainCapacityUtilization:
        result = [...trainlayer];
    }
    return result;
  };

  const triggerTrafficJamEvent = () => {
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
    setTrafficStatus(TrafficStatus.RoadCrowed);
  };

  const triggerCrowdedTrainEvent = () => {
    cogoToast.warn(events[1].name, {
      onClick: hide => {
        setMapState(MapStatus.TrainCapacityUtilization);
        setTimeout(() => {
          cogoToast.warn('建議加開台南站南下車次', {
            onClick: hide => {
              setMapState(MapStatus.Overview);
              setTrafficFlowData(undefined);
              setViewState(prev => ({
                ...prev,
                zoom: 15,
                transitionDuration: 500,
                transitionInterpolator: new FlyToInterpolator(),
              }));
              // @ts-ignore
              hide();
            },
            hideAfter: 15,
            position: 'top-right',
            bar: {
              size: '0px',
            },
            renderIcon: () => <Button>我知道了</Button>,
          });
        }, 3000);
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
    setTrafficStatus(TrafficStatus.TrainCrowed);
  };

  useEffect(() => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        triggerTrafficJamEvent();
      } else {
        triggerCrowdedTrainEvent();
      }
    }, 6000);
  }, []);

  useEffect(() => {
    if (mapState === MapStatus.TrainCapacityUtilization) {
      setViewState(prev => ({
        ...prev,
        zoom: 11,
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
      }));
    } else if (viewState.zoom === 12) {
      setViewState(prev => ({
        ...prev,
        zoom: 15,
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
      }));
    }
  }, [mapState]);

  return (
    <>
      <DeckGL
        controller={true}
        effects={[lightingEffect]}
        layers={getLayers()}
        initialViewState={initialViewState}
        viewState={viewState}
        onViewStateChange={({ viewState: newViewState }: any) => {
          setViewState(newViewState);
          if (newViewState.zoom >= 18 && mapState === MapStatus.TrafficJam) {
            setTrafficFlowData(createTrafficFlowData(new Date()));
            cogoToast.warn('可能由於一起車禍導致塞車', {
              onClick: hide => {
                setMapState(MapStatus.Accident);
                // @ts-ignore
                hide();
                setTimeout(() => {
                  cogoToast.warn('建議指派一位員警到此路口指揮交通', {
                    // @ts-ignore
                    onClick: hide => {
                      setMapState(MapStatus.Overview);
                      setTrafficFlowData(undefined);
                      setViewState(prev => ({
                        ...prev,
                        zoom: 15,
                        transitionDuration: 500,
                        transitionInterpolator: new FlyToInterpolator(),
                      }));
                      // @ts-ignore
                      hide();
                    },
                    hideAfter: 15,
                    position: 'top-right',
                    bar: {
                      size: '0px',
                    },
                    renderIcon: () => <Button>我知道了</Button>,
                  });
                }, 2000);
              },
              hideAfter: 15,
              position: 'top-right',
              bar: {
                size: '0px',
              },
              renderIcon: () => <Button>顯示資訊</Button>,
            });
          }
          if (
            newViewState.zoom < 18 &&
            mapState !== MapStatus.TrafficJam &&
            trafficFlowData
          ) {
            setTrafficFlowData(undefined);
            setMapState(MapStatus.Overview);
          }
        }}
      >
        <StaticMap {...GLMapProps} />
      </DeckGL>
      <Panel
        {...panelProps}
        trafficFlowData={trafficFlowData}
        status={trafficStatus}
        mapState={mapState}
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
