import React, { createContext, FC, useReducer } from 'react';

import reducer from './reducer';
import { TActionRouterAction } from './actions';
import { ActionType, TemplateType, DataType, FocusStatus } from '@/constants';

export type Focus = {
  type: FocusStatus | DataType;
  conditions: Array<() => boolean>;
};

export type Time = [number, number];

export type TActionRoute = {
  actionType: ActionType;
  templateType: TemplateType;
  dataTypes: DataType[];
  times: Time[];
  focus: Focus[];
  extraProps: { [key: string]: any };
};

export type TActionRouterState = {
  routes: TActionRoute[];
  currentIndex: number;
};

export type TActionRouterContext = TActionRouterState & {
  back: () => void;
  dispatch: React.Dispatch<TActionRouterAction>;
};

export type TActionRouterReducer = (
  state: TActionRouterState,
  action: TActionRouterAction,
) => TActionRouterState;

const initialState = {
  currentIndex: -1,
  routes: [],
  back: () => ({}),
  dispatch: () => ({}),
};

export const ActionRouterContext = createContext<TActionRouterContext>(
  initialState,
);

export const ActionRouterProvider: FC = props => {
  const [state, dispatch] = useReducer<TActionRouterReducer>(
    reducer,
    initialState,
  );

  return (
    <ActionRouterContext.Provider
      value={{
        routes: state.routes,
        currentIndex: state.currentIndex,
        back: () => {
          alert('back');
        },
        dispatch,
      }}
    >
      {props.children}
    </ActionRouterContext.Provider>
  );
};
