import Actions from './actions';
import { TActionRouterReducer } from './index';

const reducer: TActionRouterReducer = (state, action) => {
  // For Debug
  console.info(action);

  switch (action.type) {
    case Actions.PushRoute: {
      state.routes.push(action.payload.route);
      return { ...state, currentIndex: state.routes.length - 1 };
    }
    default:
      throw new Error();
  }
};

export default reducer;
