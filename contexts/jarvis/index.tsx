import React, {
  createContext,
  FC,
  useEffect,
  useRef,
  useReducer,
  MutableRefObject,
} from 'react';
import JarvisService, {
  JarvisStatus,
  TJarvisResponse,
} from '@/services/JarvisService';

import Actions, { initJarvisService } from './actions';
import reducer from './reducer';

type TJarvisBaseState = {
  jarvis?: JarvisService;
  enabled: boolean;
  response: TJarvisResponse;
};

type TJarvisState = TJarvisBaseState & {
  status: MutableRefObject<JarvisStatus>;
};

export type TJarvisPayload = TJarvisBaseState & {
  status: JarvisStatus;
};

export type TJarvisContext = TJarvisPayload & {
  dispatch: React.Dispatch<TJarvisAction>;
};

const defaultJarvisRes: TJarvisResponse = {
  confidence: 0,
  message: '',
  isFinal: true,
};

type TInitArgs = { status: MutableRefObject<JarvisStatus> };

function initState(init: TInitArgs) {
  return {
    jarvis: undefined,
    enabled: false,
    status: init.status,
    response: defaultJarvisRes,
  };
}

export type TJarvisAction = {
  type: Actions;
  payload: Partial<TJarvisPayload>;
};
export type TJarvisReducer = (
  state: TJarvisState,
  action: TJarvisAction,
) => TJarvisState;

export const JarvisContext = createContext<TJarvisContext>({
  jarvis: undefined,
  status: JarvisStatus.Idle,
  enabled: false,
  response: defaultJarvisRes,
  dispatch: () => ({}),
});

export const JarvisProvider: FC = props => {
  const status = useRef<JarvisStatus>(JarvisStatus.Idle);
  const [state, dispatch] = useReducer<TJarvisReducer, TInitArgs>(
    reducer,
    { status },
    initState,
  );

  useEffect(() => {
    dispatch(
      initJarvisService(
        new JarvisService({
          status,
          dispatch,
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
        response: state.response,
        dispatch,
      }}
    >
      {props.children}
    </JarvisContext.Provider>
  );
};
