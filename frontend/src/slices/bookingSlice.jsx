import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
  loading: false,
  bookingInfo: localStorage.getItem('bookingInfo')
    ? JSON.parse(localStorage.getItem('bookingInfo'))
    : {},
  selectedService: localStorage.getItem('selectedService')
    ? JSON.parse(localStorage.getItem('selectedService'))
    : null,
  error: null,
},

  reducers: {
    bookingRequest(state) {
      state.loading = true;
    },
    bookingSuccess(state, action) {
      state.loading = false;
      state.bookingInfo = action.payload.bookingInfo;
    },
    bookingFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    saveBookingInfo(state, action) {
      localStorage.setItem('bookingInfo', JSON.stringify(action.payload));
      state.bookingInfo = action.payload;
    },
    setSelectedService(state, action) {
      state.selectedService = action.payload;
      localStorage.setItem('selectedService', JSON.stringify(action.payload));
    },
    userBookingsRequest(state) {
      state.loading = true;
    },
    userBookingsSuccess(state, action) {
      state.loading = false;
      state.bookingInfo = action.payload;
    },
    userBookingsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { actions, reducer } = bookingSlice;

export const {
  bookingRequest,
  bookingSuccess,
  bookingFail,
  saveBookingInfo,
  setSelectedService,
  userBookingsRequest,
  userBookingsSuccess,
  userBookingsFail
} = actions;

export default reducer;
