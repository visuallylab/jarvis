import JarvisService, {
  JarvisStatus,
  TJarvisResponse,
} from '@/services/JarvisService';

import { JarvisSuggestion } from './index';

enum Actions {
  InitJarvisService = 'INIT_JARVIS_SERVICE',
  StartWebSpeech = 'START_WEB_SPEECH',
  StopWebSpeech = 'STOP_WEB_SPEECH',
  SetResponse = 'SET_RESPONSE',
  SetStatus = 'SET_STATUS',
  SetSuggestion = 'SET_SUGGESTION',
  ResetIdle = 'RESET_IDLE',
  ActiveJarvis = 'ACTIVE_JARVIS',
}

export type TJarvisAction =
  | IAction<Actions.InitJarvisService, { jarvis: JarvisService }>
  | IAction<Actions.StartWebSpeech, { enabled: boolean; status: JarvisStatus }>
  | IAction<Actions.StopWebSpeech, { enabled: boolean; status: JarvisStatus }>
  | IAction<
      Actions.SetResponse,
      { response: TJarvisResponse; status?: JarvisStatus; title?: string }
    >
  | IAction<Actions.SetStatus, { status: JarvisStatus; title?: string }>
  | IAction<
      Actions.SetSuggestion,
      { suggestions: JarvisSuggestion[]; status?: JarvisStatus }
    >
  | IAction<Actions.ResetIdle, { title?: string }>
  | IAction<Actions.ActiveJarvis>;

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
    status: JarvisStatus.Idle,
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
  title?: string,
): TJarvisAction => ({
  type: Actions.SetResponse,
  payload: {
    response: res,
    status,
    title,
  },
});

export const setStatus = (
  status: JarvisStatus,
  title?: string,
): TJarvisAction => ({
  type: Actions.SetStatus,
  payload: {
    status,
    title,
  },
});

export const setSuggestions = (
  suggestions: JarvisSuggestion[],
  status?: JarvisStatus,
): TJarvisAction => ({
  type: Actions.SetSuggestion,
  payload: {
    suggestions,
    status,
  },
});

export const resetIdle = (title?: string): TJarvisAction => ({
  type: Actions.ResetIdle,
  payload: {
    title,
  },
});

export const activeJarvis = (): TJarvisAction => ({
  type: Actions.ActiveJarvis,
  payload: {},
});

export default Actions;
