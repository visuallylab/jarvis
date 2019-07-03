import React, { createContext, FC, useState, useRef, useEffect } from 'react';

export type TJarvisContext = {
  recognition?: SpeechRecognition;
  state: string;
  enabled: boolean;
  responseList: any[];
  start: () => void;
  stop: () => void;
};

const createDefaultJarvis: () => TJarvisContext = () => ({
  recognition: undefined,
  state: 'idle',
  enabled: false,
  responseList: [],
  start: () => {
    return;
  },
  stop: () => {
    return;
  },
});

export const JarvisContext = createContext<TJarvisContext>(
  createDefaultJarvis(),
);

// TODO:
// onResult -> parse encode, useJarvis -> receive status and command

export const JarvisProvider: FC = props => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [responseList, setResponseList] = useState<any[]>([]);
  const recognition = useRef<SpeechRecognition>();

  useEffect(() => {
    // @ts-ignore
    const Recognition = window.SpeechRecognition || webkitSpeechRecognition;
    recognition.current = new Recognition() as SpeechRecognition;

    const rec = recognition.current;
    rec.continuous = true;
    rec.lang = 'en-US';
    rec.interimResults = true;

    rec.onresult = (event: any) => {
      setResponseList(s => [...s, event]);
    };

    rec.onstart = () => {
      setEnabled(true);
      alert('開始聽了喔');
    };

    rec.onend = () => {
      setEnabled(false);
      alert('結束監聽');
    };

    rec.onerror = (event: any) => {
      console.error('error', event);
    };
  }, []);

  const start = () => {
    if (recognition.current) {
      recognition.current.start();
    }
  };

  const stop = () => {
    if (recognition.current) {
      recognition.current.stop();
    }
  };

  return (
    <JarvisContext.Provider
      value={{
        recognition: recognition.current,
        state: 'idle',
        enabled,
        responseList,
        start,
        stop,
      }}
    >
      {props.children}
    </JarvisContext.Provider>
  );
};
