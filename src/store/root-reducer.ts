import {CombinedState, combineReducers, Reducer} from 'redux';
import {PersistPartial} from 'redux-persist/lib/persistReducer';
import userReducer, {IAppUserState} from './user/reducer';

const rootReducer: Reducer<
  CombinedState<{
    user: Partial<IAppUserState> & PersistPartial;
  }>
> = combineReducers({
  user: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
