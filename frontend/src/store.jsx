// store.jsx
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import servicesReducer from "./slices/servicesSlice"
import serviceReducer from './slices/serviceSlice'
import authReducer from './slices/authSlice'

const reducer = combineReducers({
    servicesState: servicesReducer,
    serviceState: serviceReducer,
    authState: authReducer
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Use default middleware and add redux-thunk
})

export default store;
