import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user; // Assuming user info is in action.payload.user
      state.isAuthenticated = true; // Ensure isAuthenticated is set to true
      state.error = null;
    },
    loginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    registerRequest(state) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user; // Assuming user info is in action.payload.user
      state.isAuthenticated = true; // Ensure isAuthenticated is set to true
      state.error = null;
    },
    registerFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loadUserRequest(state) {
      state.isAuthenticated = false;
      state.loading = true;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user; // Assuming user info is in action.payload.user
      state.isAuthenticated = true; // Ensure isAuthenticated is set to true
    },
    loadUserFail(state, action) {
      state.loading = false;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false; // Ensure isAuthenticated is set to true
    },
    logoutFail(state, action) {
      state.error = action.payload;
    },
    updateProfileRequest(state) {
      state.loading = true;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user; // Assuming user info is in action.payload.user
      state.isUpdated = true;
    },
    updateProfileFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearUpdateProfile(state, action){
            return {
                ...state,
                isUpdated: false
            }
    },
    updatePasswordRequest(state) {
      state.loading = true;
      state.isUpdated = false;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
    },
    updatePasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    forgotPasswordRequest(state) {
      state.loading = true;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    forgotPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordRequest(state) {
      state.loading = true;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user
    },
    resetPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});


export const { 
    loginRequest, 
    loginSuccess, 
    loginFail, 
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    clearUpdateProfile,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} = authSlice.actions;
export default authSlice.reducer;
