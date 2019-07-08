import React, { createContext, FC, useRef, useEffect, useState } from 'react';
import useRefState from '@/hooks/useRefState';
import JarvisService, {
  JarvisStatus,
  TJarvisResponse,
} from '@/services/JarvisService';

export type TJarvisContext = {
  jarvis?: JarvisService;
  status: JarvisStatus;
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
        setRefStatus,
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
        enabled,
        response,
      }}
    >
      {props.children}
    </JarvisContext.Provider>
  );
};
