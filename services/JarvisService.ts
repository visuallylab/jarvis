import { MutableRefObject } from 'react';
import debounce from 'lodash/debounce';
import {
  TJarvisAction,
  startWebSpeech,
  stopWebSpeech,
  setResponse,
  setStatus,
  setSuggestions,
  resetIdle,
  activeJarvis,
} from '@/contexts/jarvis/actions';
import {
  TActionRouterAction,
  pushRoute,
} from '@/contexts/actionRouter/actions';
import { JarvisSuggestion } from '@/contexts/jarvis';
import { grammars, ActionType, TemplateType, DataType } from '@/constants';
import {
  matchHeyJarvis,
  matchStop,
  matchAction,
  matchData,
  matchTimes,
  matchStatus,
} from '@/utils/regexp';

import { getActionType, getFocus, getTemplateType } from '@/utils/jarvis';
import { Time, Focus, TActionRoute } from '@/contexts/actionRouter';

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

type TJarvisServiceProps = {
  status: MutableRefObject<JarvisStatus>;
  dispatch: React.Dispatch<TJarvisAction>;
  actionRouterDispatch: React.Dispatch<TActionRouterAction>;
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

      this.recognition.onresult = this.onresult;
      this.recognition.onstart = this.onstart;
      this.recognition.onend = this.onend;
      this.recognition.onerror = this.onerror;
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
      const { dispatch, status, actionRouterDispatch } = this.props;
      const target = event.results[event.resultIndex];
      const response = {
        message: target[0].transcript,
        confidence: target[0].confidence,
        isFinal: target.isFinal,
      };

      // run before anything when matches "stop grammar",
      // set jarvis status to "Idle"
      if (matchStop(target[0].transcript)) {
        dispatch(setResponse(response, JarvisStatus.Idle));
        this.recognizing = false;
        return;
      }

      switch (status.current) {
        case JarvisStatus.Idle: {
          if (matchHeyJarvis(target[0].transcript)) {
            dispatch(activeJarvis());
          }
          break;
        }

        case JarvisStatus.Listening: {
          if (target.isFinal) {
            dispatch(
              setResponse(response, JarvisStatus.Recognizing, 'Recognizing...'),
            );
            const encoded = this.encoded(target[0]);
            if (!encoded.actionType || !encoded.templateType) {
              dispatch(
                setStatus(
                  JarvisStatus.Listening,
                  'Sorry, I can not understand...',
                ),
              );
            } else if (encoded.suggestions.length) {
              dispatch(
                setSuggestions(encoded.suggestions, JarvisStatus.Listening),
              );
              // TODO:
              // keep recognizing
              // when click ui -> turn to listening...
            } else {
              actionRouterDispatch(pushRoute(encoded as TActionRoute));
              dispatch(resetIdle('Thank you 😉'));
            }
          } else {
            dispatch(setResponse(response));
          }
          break;
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

  encoded(src: {
    transcript: string;
    confidence: number;
  }): {
    actionType: ActionType | '';
    templateType: TemplateType | '';
    dataTypes: DataType[];
    times: Time[];
    focus: Focus[];
    suggestions: JarvisSuggestion[];
    extraProps: { [key: string]: any };
  } {
    const { action, data, times, status } = this.parseTranscript(
      src.transcript,
    );
    const actionType = getActionType(action);
    const { templateType, dataTypes } = getTemplateType(data);
    const focus = getFocus(status);

    const suggestions: JarvisSuggestion[] = [];
    const extraProps = {};

    return {
      actionType,
      templateType,
      dataTypes,
      times,
      focus,
      suggestions,
      extraProps,
    };
  }

  // parse A + D + T + S
  // show me traffic status this year
  parseTranscript(transcript: string) {
    const action = matchAction(transcript);
    const data = matchData(transcript);
    const times = matchTimes(transcript);
    const status = matchStatus(transcript);
    return {
      action,
      data,
      times,
      status,
    };
  }
}
