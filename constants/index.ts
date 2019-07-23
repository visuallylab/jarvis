import { getRelativePath } from '@/utils';

/* head meta tag data */
export const SITE_TITLE = 'Visually Lab';
export const SITE_DESC = 'visualize everything';
export const SITE_URL = 'localhost';
export const FAVICON_PATH = getRelativePath('/static/favicon.ico');
export const LARGE_ICON_PATH = getRelativePath('/static/large-icon.png');
export const NAV_TITLE = 'nav title';

/* Traffic animation config */
export const frames = 10;
export const accidentFrames = 15;
export enum TrafficStatus {
  normal = '順暢通行',
  RoadCrowed = '馬路擁擠',
  TrainCrowed = '鐵路擁擠',
}
export enum IndicatorColor {
  normal = '#009900',
  warning = '#EE0000',
}
export enum IndicatorMessage {
  normal = '順暢通行',
  warning = '馬路擁擠',
}
