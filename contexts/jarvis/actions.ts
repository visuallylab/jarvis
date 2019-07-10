import JarvisService, {
  JarvisStatus,
  TJarvisResponse,
} from '@/services/JarvisService';

interface IAction<T, P> {
  type: T;
  payload: P;
}

export type TJarvisAction =
  | IAction<Actions.InitJarvisService, { jarvis: JarvisService }>
  | IAction<Actions.StartWebSpeech, { enabled: boolean; status: JarvisStatus }>
  | IAction<Actions.StopWebSpeech, { enabled: boolean; status: JarvisStatus }>
  | IAction<
      Actions.SetResponse,
      { response: TJarvisResponse; status?: JarvisStatus }
    >
  | IAction<Actions.SetStatus, { status: JarvisStatus }>;

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
