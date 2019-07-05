import { MutableRefObject } from 'react';
import debounce from 'lodash/debounce';
import { TSetRefState } from '@/hooks/useRefState';

export enum JarvisStatus {
  Idle = 'IDLE',
  Listening = 'LISTENING',
  Recognizing = 'RECOGNIZING',
}

export type TJarvisResponse = {
  confidence: number;
  message: string;
  isFinal: boolean;
};

const regexp = {
  HEY_JARVIS: /[J|T|G|D]arv/g,
  STOP: /stop/g,
};

type TJarvisServiceProps = {
  status: MutableRefObject<JarvisStatus>;
  setRefStatus: TSetRefState<JarvisStatus>;
  setEnabled: TSetRefState<boolean>;
  setResponse: TSetRefState<TJarvisResponse>;
};

export default class JarvisService {
  public props: TJarvisServiceProps;
  private recognition: SpeechRecognition;

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

    // default enable jarvis service
    this.enable();
  }

  initialize() {
    if (this.recognition) {
      const grammar = `
      #JSGF V1.0 utf-8 en;
      grammar test;
      
      <hey> = /10/ hey | /0.2/ Hey | /0.2/ Hi | /0.2/ hi;
      <Jarvis> = /100/ Jarvis | /1/ Jarvy | /1/ Travis | /0/ Carlos | /0/ Bobby | /0/ drop it;
      <listening> = <hey>* <Jarvis>;
    `;

      // @ts-ignore
      const SpeechGrammarList =
        window.SpeechGrammarList || webkitSpeechGrammarList;
      const speechGrammarList = new SpeechGrammarList();
      speechGrammarList.addFromString(grammar, 10);

      this.recognition.grammars = speechGrammarList;
      this.recognition.lang = 'en-US';
      this.recognition.continuous = true; // continuous results are returned for each recognition
      this.recognition.interimResults = true;
    }
  }

  // tslint:disable
  onresult = debounce(event => {
    const { status, setRefStatus, setResponse } = this.props;
    const target = event.results[event.resultIndex];

    if (regexp.STOP.exec(target[0].transcript) && target.isFinal) {
      setRefStatus(JarvisStatus.Idle);
      return;
    }

    if (
      status.current === JarvisStatus.Idle &&
      regexp.HEY_JARVIS.exec(target[0].transcript)
    ) {
      setRefStatus(JarvisStatus.Listening);
    } else if (status.current === JarvisStatus.Listening) {
      // listening
      // recognize
      // listening suggestion
      console.log('listening');
    }

    setResponse({
      message: target[0].transcript,
      confidence: target[0].confidence,
      isFinal: target.isFinal,
    });
  }, 100);

  onstart = () => this.props.setEnabled(true);

  onend = () => this.props.setEnabled(false);

  onerror = (event: any) => {
    console.error('error', event);
  };

  enable() {
    this.recognition.start();
  }

  disable() {
    this.recognition.stop();
    this.props.setRefStatus(JarvisStatus.Idle);
  }
}
