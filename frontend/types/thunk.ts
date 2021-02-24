import { AppStateType } from '@/store/reducers/rootReducer';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

export type ThunkType = ThunkAction<void, AppStateType, unknown, Action<string>>;