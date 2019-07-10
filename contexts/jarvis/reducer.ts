import Actions from './actions';
import { TJarvisReducer } from './index';

// @ts-ignore
const reducer: TJarvisReducer = (state, action) => {
  // [CAUTION]: status are ref object,
  // we update by set `status.current`
  switch (action.type) {
    case Actions.InitJarvisService: {
      return { ...state, ...action.payload };
    }
    case Actions.StartWebSpeech:
    case Actions.StopWebSpeech: {
      state.status.current = action.payload.status;
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
