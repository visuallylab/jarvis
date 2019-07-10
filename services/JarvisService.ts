import { MutableRefObject } from 'react';
import debounce from 'lodash/debounce';

import { TJarvisAction } from '@/contexts/jarvis';
import {
  startWebSpeech,
  stopWebSpeech,
  setResponse,
} from '@/contexts/jarvis/actions';

export enum JarvisStatus {
  Idle = 'IDLE', // hide
  Active = 'ACTIVE', // show dialog (from screen right)
  Listening = 'LISTENING', // start listening (start wave animation)
  Recognizing = 'RECOGNIZING',
}

export type TJarvisResponse = {
  confidence: number;
  message: string;
  isFinal: boolean;
};

const regexp = {
  HEY_JARVIS: /[J|T|G|D]arv/g,
  STOP: /(thank you)|(stop)/g,
};

const grammars = {
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

type TJarvisServiceProps = {
  status: MutableRefObject<JarvisStatus>;
  dispatch: React.Dispatch<TJarvisAction>;
};

// TODO:
// [refactor]: handle if recognition is undefined

export default class JarvisService {
  public props: TJarvisServiceProps;
  private recognition: SpeechRecognition;
  private recognizing: boolean = false;

  constructor(props: TJarvisServiceProps) {
    this.props = props;

    // @ts-ignore
    const Recognition = window.SpeechRecognition || webkitSpeechRecognition;
    this.recognition = new Recognition() as SpeechRecognition;
    this.initialize();
    this.recognition.onresult = this.onresult;
    this.recognition.onstart = this.onstart;
    this.recognition.onend = this.onend;
    this.recognition.onerror = this.onerror;

    // DEFAULT: enable jarvis service
    this.enable();
  }

  initialize() {
    if (this.recognition) {
      const speechGrammarList = this.generateGrammarList();

      this.recognition.grammars = speechGrammarList;
      this.recognition.lang = 'en-US';
      this.recognition.continuous = true; // continuous results are returned for each recognition
      this.recognition.interimResults = true;
    }
  }

  generateGrammarList() {
    const SpeechGrammarList =
      // @ts-ignore
      window.SpeechGrammarList || webkitSpeechGrammarList;
    const speechGrammarList = new SpeechGrammarList();
    Object.values(grammars).forEach(grammar =>
      speechGrammarList.addFromString(grammar, 10),
    );
    return speechGrammarList;
  }

  // tslint:disable
  onresult = debounce(event => {
    if (!this.recognizing) {
      this.recognizing = true;
      const { dispatch, status } = this.props;
      const target = event.results[event.resultIndex];
      const response = {
        message: target[0].transcript,
        confidence: target[0].confidence,
        isFinal: target.isFinal,
      };

      // run before anything when matches "stop grammar",
      // set jarvis status to "Idle"
      if (regexp.STOP.exec(target[0].transcript)) {
        dispatch(setResponse(response, JarvisStatus.Idle));
        return;
      }

      switch (status.current) {
        case JarvisStatus.Idle: {
          if (regexp.HEY_JARVIS.exec(target[0].transcript)) {
            dispatch(setResponse(response, JarvisStatus.Active));
          }
          break;
        }

        case JarvisStatus.Listening: {
          // listening suggestion
          console.log('listening');
          dispatch(setResponse(response));
          break;
        }

        default: {
          dispatch(setResponse(response));
        }
      }
      this.recognizing = false;
    }
  }, 100);

  onstart = () => this.props.dispatch(startWebSpeech());

  onend = () => this.props.dispatch(stopWebSpeech());

  onerror = (event: any) => {
    console.error('error', event);
  };

  enable() {
    this.recognition.start();
  }

  disable() {
    this.recognition.stop();
  }
}
