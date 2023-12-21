import storage from 'localforage';
import {persistReducer} from 'redux-persist';
import userActionTypes from './types';

// TODO: user dto should be from generated types
interface UserDto {}

export type IAppUserState = {
  accessToken?: string;
  refreshToken?: string;
  currentUser?: UserDto;
  isLoggedIn?: boolean;
  userType?: string;
  error?: string;
};

export const INITIAL_USER_STATE = {
  error: '',
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  currentUser: undefined,
  userType: '',
};

function userReducer(state: IAppUserState = INITIAL_USER_STATE, {type, payload}: any) {
  switch (type) {
    case userActionTypes.UPDATE_APP_USER_STATE:
      return {
        ...state,
        ...payload,
      };
    case userActionTypes.LOGOUT:
      return INITIAL_USER_STATE;
    default:
      return state;
  }
}

const persistConfig = {
  key: 'user',
  storage,
  blacklist: ['error', 'isLoading', 'loading'],
};

export default persistReducer(persistConfig, userReducer);
