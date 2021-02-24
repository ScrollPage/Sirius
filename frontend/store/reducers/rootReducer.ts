import { combineReducers } from 'redux';
import { alertReducer } from './alert';

export let rootReducer = combineReducers({
  alert: alertReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;


