import JarvisService, {
  JarvisStatus,
  TJarvisResponse,
} from '@/services/JarvisService';

import { TJarvisAction } from './index';

enum Actions {
  InitJarvisService = 'INIT_JARVIS_SERVICE',
  StartWebSpeech = 'START_WEB_SPEECH',
  StopWebSpeech = 'STOP_WEB_SPEECH',
  SetResponse = 'SET_RESPONSE',
  SetStatus = 'SET_STATUS',
}

export const initJarvisService = (jarvis: JarvisService): TJarvisAction => ({
  type: Actions.InitJarvisService,
  payload: {
    jarvis,
  },
});

export const startWebSpeech = (): TJarvisAction => ({
  type: Actions.StartWebSpeech,
  payload: {
    enabled: true,
    status: JarvisStatus.Active,
  },
});

export const stopWebSpeech = (): TJarvisAction => ({
  type: Actions.StopWebSpeech,
  payload: {
    enabled: false,
    status: JarvisStatus.Idle,
  },
});

export const setResponse = (
  res: TJarvisResponse,
  status?: JarvisStatus,
): TJarvisAction => ({
  type: Actions.SetResponse,
  payload: {
    response: res,
    status,
  },
});

export const setStatus = (status: JarvisStatus): TJarvisAction => ({
  type: Actions.SetStatus,
  payload: {
    status,
  },
});

export default Actions;
