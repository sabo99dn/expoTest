import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';

const persistConfig = {
  key: 'root',
  // transforms: [immutableTransform()],
  storage: AsyncStorage,
  whitelist: ['auth', 'home'],
};

const sagaMiddleware = createSagaMiddleware();

export default () => {

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
  let persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return {store, persistor};
};

