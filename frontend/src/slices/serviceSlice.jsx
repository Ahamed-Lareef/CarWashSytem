import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    loading: false,
    service: {},
    isServiceCreated: false,
    error: null
  },
  reducers: {
    serviceRequest(state) {
      state.loading = true;
    },
    serviceSuccess(state, action) {
      state.loading = false;
      state.service = action.payload.service;
      state.error = null;
    },
    serviceFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    newServiceRequest(state) {
      state.loading = true;
      state.isServiceCreated = false;
    },
    newServiceSuccess(state, action) {
      state.loading = false;
      state.service = action.payload.service;
      state.isServiceCreated = true;
      state.error = null;
    },
    newServiceFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isServiceCreated = false; // should be false, not true
    },
    clearServiceCreated(state) {
      state.isServiceCreated = false;
    }
  }
});

export const {
  serviceRequest,
  serviceSuccess,
  serviceFail,
  newServiceRequest,
  newServiceSuccess,
  newServiceFail,
  clearServiceCreated
} = serviceSlice.actions;

export default serviceSlice.reducer;
