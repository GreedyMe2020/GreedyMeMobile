import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from './reducers/auth-reducer';
import userReducer from './reducers/user-reducer';
import thunk from 'redux-thunk';
import {
  firestoreReducer,
  reduxFirestore,
  getFirestore,
} from 'redux-firestore';
import {
  firebaseReducer,
  reactReduxFirebase,
  getFirebase,
} from 'react-redux-firebase';
import config from '../firebase/config';

const reducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  user: userReducer,
});
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(config, {
      attachAuthIsReady: true,
      useFirestoreForProfile: true,
      userProfile: 'usuarioConsumidor',
    }), // redux binding for firebase
    reduxFirestore(config), // redux bindings for firestore
  ),
);

export default store;
