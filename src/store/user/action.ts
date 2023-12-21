import {IAppUserState} from './reducer';
import userActionTypes from './types';

export const updateAppUserState = (payload: IAppUserState) => ({
  type: userActionTypes.UPDATE_APP_USER_STATE,
  payload,
});

export const logoutUser = () => ({
  type: userActionTypes.LOGOUT,
});
