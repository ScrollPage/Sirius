import { PropertiesType } from '@/types/action';
import * as actions from './../actions/alert';

const initialState = {
  text: null as string | null,
  typeOf: 'success' as "success" | "info" | "warning" | "error" | undefined,
  IsNotClose: false
};

type InititalStateType = typeof initialState;

type AlertActionsTypes = ReturnType<PropertiesType<typeof actions>>

export const alertReducer = (state = initialState, action: AlertActionsTypes): InititalStateType => {
  switch (action.type) {
    case 'ALERT_SHOW':
      return { ...state, text: action.text, typeOf: action.typeOf, IsNotClose: action?.IsNotClose ? true : false }
    case 'ALERT_HIDE':
      return { ...state, text: null }
    default:
      return state;
  }
}

