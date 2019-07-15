import { TActionRoute } from './index';

enum Actions {
  PushRoute = 'PUSH_ROUTE',
}

export type TActionRouterAction = IAction<
  Actions.PushRoute,
  { route: TActionRoute }
>;

export const pushRoute = (route: TActionRoute): TActionRouterAction => ({
  type: Actions.PushRoute,
  payload: {
    route,
  },
});

export default Actions;
