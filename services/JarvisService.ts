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
  setStatus: TSetRefState<JarvisStatus>;
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
    const { status, setStatus, setResponse } = this.props;
    const target = event.results[event.resultIndex];
    console.log(event);
    if (regexp.STOP.exec(target[0].transcript) && target.isFinal) {
      setStatus(JarvisStatus.Idle);
      return;
    }

    if (
      status.current === JarvisStatus.Idle &&
      regexp.HEY_JARVIS.exec(target[0].transcript)
    ) {
      setStatus(JarvisStatus.Listening);
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

  onend = () => {
    this.props.setEnabled(false);
    this.props.setStatus(JarvisStatus.Idle);
  };

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
