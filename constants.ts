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
export const accidentFrames = 30;

// actionRouter
export enum ActionType {
  Show = 'SHOW', // 顯示、跳轉
  Compare = 'COMPARE', // 比較
  Find = 'FIND', // 針對已選定好的 data 做操作
  Focus = 'FOCUS', // 針對已選定好的 data 做操作，傳入所需的 extraProps
  Export = 'EXPORT', // 輸出
}

export enum TemplateType {
  // General
  Realtime = 'REALTIME',
  Statistics = 'STATISTICS',
  StatisticsDetail = 'STATISTICS_DETAIL',

  // Specific
  T_Realtime = 'T_REALTIME',
  T_Statistics = 'T_STATISTICS',
  Home = 'HOME',
}

export enum FocusStatus {
  Minimum = 'MINIMUM',
  Max = 'MAX',
}

export enum DataType {
  // Electricity
  E_BackupCapacity = 'E_BACKUPCAPACITY',
  E_BackupCapacityRatio = 'E_BACKUPCAPACITY_RATIO',
  E_TransferValue = 'E_TRANSFER_VALUE',
  E_GeneratedValue = 'E_GENERATED_VALUE',
  E_UsageRatio = 'E_USAGE_RATIO',
  E_MaxValue = 'E_MAX_VALUE',
  E_EstimateMaxValue = 'E_ESTIMATE_MAX_VALUE',
}

// jarvis
export const grammars = {
  heyJarvis: `
    #JSGF V1.0 utf-8 en;
    grammar heyJarvis;

    <hey> = /10/ hey | /0.2/ Hey | /0.2/ Hi | /0.2/ hi;
    public <Jarvis> = /100/ Jarvis | /1/ Travis | /0/ Carlos | /0/ Bobby | /0/ drop it | /0/ Gabby | /0/ gummies;
    <listening> = <hey>* <Jarvis>;
  `,
  stop: `
    #JSGF V1.0 utf-8 en;
    grammar stop;

    <stop> = stop <Jarvis>*;
    <thank you> = thank you <Jarvis>*;
    `,
};
