import React, {
  createContext,
  FC,
  useEffect,
  useRef,
  useReducer,
  MutableRefObject,
  useContext,
} from 'react';
import JarvisService, {
  JarvisStatus,
  TJarvisResponse,
} from '@/services/JarvisService';

import { initJarvisService, TJarvisAction } from './actions';
import reducer from './reducer';
import { ActionRouterContext } from '../actionRouter';

export type JarvisSuggestion = {
  message: string;
  onClick: () => void;
};

type TJarvisBaseState = {
  jarvis?: JarvisService;
  enabled: boolean;
  title: string;
  response: TJarvisResponse;
  suggestions: JarvisSuggestion[];
};

export type TJarvisState = TJarvisBaseState & {
  status: MutableRefObject<JarvisStatus>;
};

export type TJarvisPayload = TJarvisBaseState & {
  status: JarvisStatus;
};

export type TJarvisContext = TJarvisPayload & {
  dispatch: React.Dispatch<TJarvisAction>;
};

export type TJarvisReducer = (
  state: TJarvisState,
  action: TJarvisAction,
) => TJarvisState;

const defaultJarvisRes: TJarvisResponse = {
  confidence: 0,
  message: '',
  isFinal: true,
};

type TInitArgs = { status: MutableRefObject<JarvisStatus> };

function init(args: TInitArgs) {
  return {
    jarvis: undefined,
    enabled: false,
    title: 'What can I help you ?',
    status: args.status,
    response: defaultJarvisRes,
    suggestions: [],
  };
}

export const JarvisContext = createContext<TJarvisContext>({
  jarvis: undefined,
  status: JarvisStatus.Idle,
  enabled: false,
  title: 'What can I help you ?',
  response: defaultJarvisRes,
  suggestions: [],
  dispatch: () => ({}),
});

export const JarvisProvider: FC = props => {
  const status = useRef<JarvisStatus>(JarvisStatus.Idle);
  const [state, dispatch] = useReducer<TJarvisReducer, TInitArgs>(
    reducer,
    { status },
    init,
  );
  const { dispatch: actionRouterDispatch } = useContext(ActionRouterContext);

  useEffect(() => {
    dispatch(
      initJarvisService(
        new JarvisService({
          status,
          dispatch,
          actionRouterDispatch,
        }),
      ),
    );
  }, []);

  return (
    <JarvisContext.Provider
      value={{
        jarvis: state.jarvis,
        status: status.current,
        enabled: state.enabled,
        title: state.title,
        response: state.response,
        suggestions: state.suggestions,
        dispatch,
      }}
    >
      {props.children}
    </JarvisContext.Provider>
  );
};
