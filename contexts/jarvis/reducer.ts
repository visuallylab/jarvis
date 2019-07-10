import Actions from './actions';
import { TJarvisReducer } from './index';

// @ts-ignore
const reducer: TJarvisReducer = (state, action) => {
  // status are ref object,
  // we update when it be set
  switch (action.type) {
    case Actions.InitJarvisService: {
      return { ...state, jarvis: action.payload.jarvis };
    }
    case Actions.StartWebSpeech:
    case Actions.StopWebSpeech: {
      return { ...state, enabled: action.payload.enabled };
    }
    case Actions.SetResponse: {
      if (action.payload.status) {
        state.status.current = action.payload.status;
      }

      return { ...state, response: action.payload.response };
    }
    case Actions.SetStatus: {
      state.status.current = action.payload.status!;
      return { ...state };
    }
    default:
      throw new Error();
  }
};

export default reducer;
