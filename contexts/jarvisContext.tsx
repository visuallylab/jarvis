import React, { createContext, FC, useEffect, useState } from 'react';
import useRefState, { TSetRefState } from '@/hooks/useRefState';
import JarvisService, {
  JarvisStatus,
  TJarvisResponse,
} from '@/services/JarvisService';

export type TJarvisContext = {
  jarvis?: JarvisService;
  status: JarvisStatus;
  setStatus: TSetRefState<JarvisStatus>;
  enabled: boolean;
  response: TJarvisResponse;
};

const defaultJarvisRes: TJarvisResponse = {
  confidence: 0,
  message: '',
  isFinal: true,
};

const createDefaultJarvis: () => TJarvisContext = () => ({
  jarvis: undefined,
  status: JarvisStatus.Idle,
  setStatus: () => {
    return;
  },
  enabled: false,
  response: defaultJarvisRes,
});

export const JarvisContext = createContext<TJarvisContext>(
  createDefaultJarvis(),
);

export const JarvisProvider: FC = props => {
  const [jarvis, setJarvis] = useState<JarvisService | undefined>(undefined);
  const [status, setRefStatus] = useRefState<JarvisStatus>(JarvisStatus.Idle);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [response, setResponse] = useState<TJarvisResponse>(defaultJarvisRes);

  useEffect(() => {
    setJarvis(
      new JarvisService({
        status,
        setStatus: setRefStatus,
        setEnabled,
        setResponse,
      }),
    );
  }, []);

  return (
    <JarvisContext.Provider
      value={{
        jarvis,
        status: status.current,
        setStatus: setRefStatus,
        enabled,
        response,
      }}
    >
      {props.children}
    </JarvisContext.Provider>
  );
};
