// store.jsx
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import servicesReducer from "./slices/servicesSlice";
import serviceReducer from './slices/serviceSlice';
import authReducer from './slices/authSlice';
import bookingReducer from './slices/bookingSlice';

const reducer = combineReducers({
  servicesState: servicesReducer,
  serviceState: serviceReducer,
  authState: authReducer,
  bookingState: bookingReducer
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
