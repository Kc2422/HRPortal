import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import {
  userLoginReducer,
  userDetailsReducer,
  usersFetchReducer,
  userUpdateReducer,
} from "./reducers/UserReducers";
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  storage,
}

const composeEnhancer =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducers = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userFetch: usersFetchReducer,
});

const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo")!);

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = createStore(
  persistedReducer,
  initialState as any,
  composeEnhancer(applyMiddleware(thunk))
);

export const persistor = persistStore(store)


