import { AppStateType } from './reducers/rootReducer';

export const getAlertType = (state: AppStateType) => {
  return state.alert.typeOf
}

export const getAlertText = (state: AppStateType) => {
  return state.alert.text
}

export const getAlertIsNotClose = (state: AppStateType) => {
  return state.alert.IsNotClose
}
