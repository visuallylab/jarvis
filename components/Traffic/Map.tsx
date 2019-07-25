import { useState, useEffect } from 'react';

import DeckGL from '@deck.gl/react';
import { ViewState, FlyToInterpolator, StaticMap } from 'react-map-gl';
import useLineLayer from '@/hooks/useLineLayer';
import useTripLayers from '@/hooks/useTripLayers';
import useAccidentLayers from '@/hooks/useAccidentLayer';
import useTransportationData from '@/hooks/useTransportationData';

import 'mapbox-gl/dist/mapbox-gl.css';
import traffic from 'static/traffic.json';
import accidents from 'static/accidents.json';
import Panel, { TTrafficFlow } from './Panel';
import Tooltip from './Tooltip';
import {
  getBuildingLayer,
  getLightEffect,
  createTrafficFlowData,
} from '@/utils/traffic';
import { TrafficStatus, i18nNamespace } from '@/constants';
import usePanelProps from '@/hooks/usePanelProps';
import useTrainStatusLayers from '@/hooks/useTrainStatusLayers';
import notify from '@/utils/notify';
import { useTranslation } from 'react-i18next';

export enum MapStatus {
  Start,
  TrafficJam,
  FocusXimenRdSec1,
  FocusXimenRdSec2,
  FocusZhongzhengRd,
  ShowAccidentXimenRdSec1,
  ShowAccidentXimenRdSec2,
  ShowAccidentZhongzhengRd,
  TrainUtilization,
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

const trafficJamCenters = {
  XimenRdSec1: { longitude: 120.19767902271758, latitude: 22.989887240887853 },
  XimenRdSec2: { longitude: 120.20015723575861, latitude: 22.997552333424316 },
  ZhongzhengRd: { longitude: 120.20120424682624, latitude: 22.9922258462312 },
};

const Map = () => {
  const { t } = useTranslation(i18nNamespace.TrafficMap);
  const buildingLayer = getBuildingLayer();
  const lightingEffect = getLightEffect();
  const [mapState, setMapState] = useState(MapStatus.Start);
  const [viewState, setViewState] = useState<
    ViewState & { transitionDuration: number; transitionInterpolator: any }
  >(initialViewState);
  const [trafficStatus, setTrafficStatus] = useState(TrafficStatus.Normal);
  const {
    lineLayer,
    hoverData,
    count: trafficJamCount,
    length: trafficJamLength,
  } = useLineLayer(
    mapState === MapStatus.TrafficJam ||
      mapState === MapStatus.FocusXimenRdSec1 ||
      mapState === MapStatus.FocusXimenRdSec2 ||
      mapState === MapStatus.FocusZhongzhengRd,
  );
  const { timestamps, transportation } = useTransportationData(true, traffic);
  const [trafficFlowData, setTrafficFlowData] = useState<TTrafficFlow>();
  const { panelProps } = usePanelProps({
    mapState,
    setMapState,
    transportation,
    trafficJamCount,
    trafficJamLength,
  });
  const tripLayers = useTripLayers(
    mapState === MapStatus.Start ||
      mapState === MapStatus.FocusXimenRdSec1 ||
      mapState === MapStatus.FocusXimenRdSec2 ||
      mapState === MapStatus.FocusZhongzhengRd ||
      mapState === MapStatus.TrafficJam,
    traffic as TransporationItem[],
    timestamps,
  );
  const accidentLayer = useAccidentLayers(
    mapState === MapStatus.ShowAccidentXimenRdSec1 ||
      mapState === MapStatus.ShowAccidentXimenRdSec2 ||
      mapState === MapStatus.ShowAccidentZhongzhengRd,
    accidents,
  );
  const trainlayer = useTrainStatusLayers(
    mapState === MapStatus.TrainUtilization,
  );

  const getLayers = () => {
    let result;
    switch (mapState) {
      case MapStatus.ShowAccidentXimenRdSec1:
      case MapStatus.ShowAccidentXimenRdSec2:
      case MapStatus.ShowAccidentZhongzhengRd:
        result = [buildingLayer, accidentLayer];
        break;
      case MapStatus.Start:
        result = [buildingLayer, tripLayers];
        break;
      case MapStatus.FocusXimenRdSec1:
      case MapStatus.FocusXimenRdSec2:
      case MapStatus.FocusZhongzhengRd:
      case MapStatus.TrafficJam:
        result = [buildingLayer, lineLayer, tripLayers];
        break;
      case MapStatus.TrainUtilization:
        result = trainlayer;
    }
    return result;
  };

  const triggerTrafficJamEvent = () => {
    const showTrafficJamPrompt = () => {
      notify({
        msg: t('events.trafficJam.detailXimenRdSec1.msg'),
        action: () => setMapState(MapStatus.FocusXimenRdSec1),
        btnText: t('events.trafficJam.detailXimenRdSec1.btnText'),
      });
      notify({
        msg: t('events.trafficJam.detailXimenRdSec2.msg'),
        action: () => setMapState(MapStatus.FocusXimenRdSec2),
        btnText: t('events.trafficJam.detailXimenRdSec2.btnText'),
      });
      notify({
        msg: t('events.trafficJam.detailZhongzhengRd.msg'),
        action: () => setMapState(MapStatus.FocusZhongzhengRd),
        btnText: t('events.trafficJam.detailZhongzhengRd.btnText'),
      });
    };
    notify({
      msg: t('events.trafficJam.status.msg'),
      action: () => {
        setMapState(MapStatus.TrafficJam);
        setTimeout(showTrafficJamPrompt, 100);
      },
      btnText: t('events.trafficJam.status.btnText'),
    });
    setTrafficStatus(TrafficStatus.RoadCrowed);
  };

  const triggerCrowdedTrainEvent = () => {
    notify({
      msg: t('events.crowedTrain.status.msg'),
      action: () => {
        setMapState(MapStatus.TrainUtilization);
        setTimeout(() => {
          notify({
            msg: t('events.crowedTrain.suggestion.msg'),
            action: () => setMapState(MapStatus.Start),
            btnText: t('events.crowedTrain.suggestion.btnText'),
          });
        }, 3000);
      },
      btnText: t('events.crowedTrain.status.btnText'),
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
    const triggerFocusPrompt = (nextState: MapStatus) => {
      setTimeout(
        notify({
          msg: t('events.trafficJam.reason.msg'),
          btnText: t('events.trafficJam.reason.btnText'),
          action: () => {
            setMapState(nextState);
            setTimeout(() => {
              notify({
                btnText: t('events.trafficJam.suggestion.btnText'),
                action: () => setMapState(MapStatus.Start),
                msg: t('events.trafficJam.suggestion.msg'),
              });
            }, 2000);
          },
        }),
        1500,
      );
    };
    if (mapState === MapStatus.TrainUtilization) {
      setTrafficFlowData(undefined);
      setViewState(prev => ({
        ...prev,
        zoom: 11,
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
      }));
    } else if (mapState === MapStatus.FocusXimenRdSec1) {
      setTrafficFlowData(createTrafficFlowData(new Date()));
      setViewState({
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
        zoom: 18,
        pitch: 45,
        bearing: 0,
        ...trafficJamCenters.XimenRdSec1,
      });
      triggerFocusPrompt(MapStatus.ShowAccidentXimenRdSec1);
    } else if (mapState === MapStatus.FocusXimenRdSec2) {
      setTrafficFlowData(createTrafficFlowData(new Date()));
      setViewState({
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
        zoom: 18,
        pitch: 45,
        bearing: 0,
        ...trafficJamCenters.XimenRdSec2,
      });
      triggerFocusPrompt(MapStatus.ShowAccidentXimenRdSec2);
    } else if (mapState === MapStatus.FocusZhongzhengRd) {
      setTrafficFlowData(createTrafficFlowData(new Date()));
      setViewState({
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
        zoom: 18,
        pitch: 45,
        bearing: 0,
        ...trafficJamCenters.ZhongzhengRd,
      });
      triggerFocusPrompt(MapStatus.ShowAccidentZhongzhengRd);
    } else if (mapState === MapStatus.Start) {
      setTrafficFlowData(undefined);
      setViewState(initialViewState);
    } else if (mapState === MapStatus.TrafficJam) {
      setTrafficFlowData(undefined);
      setViewState(initialViewState);
    } else if (mapState === MapStatus.ShowAccidentXimenRdSec1) {
      setViewState({
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
        zoom: 18,
        pitch: 45,
        bearing: 0,
        ...trafficJamCenters.XimenRdSec1,
      });
    } else if (mapState === MapStatus.ShowAccidentXimenRdSec2) {
      setViewState({
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
        zoom: 18,
        pitch: 45,
        bearing: 0,
        ...trafficJamCenters.XimenRdSec2,
      });
    } else if (mapState === MapStatus.ShowAccidentZhongzhengRd) {
      setViewState({
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
        zoom: 18,
        pitch: 45,
        bearing: 0,
        ...trafficJamCenters.ZhongzhengRd,
      });
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
          {t('trafficJamTooltipText')}
        </Tooltip>
      )}
    </>
  );
};

export default Map;
