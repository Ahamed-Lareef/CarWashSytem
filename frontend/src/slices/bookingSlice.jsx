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

  bookingDetail : {},
  userBookings : []
},

  reducers: {
    bookingRequest(state) {
      state.loading = true;
    },
    bookingSuccess(state, action) {
      state.loading = false;
      state.bookingInfo = action.payload.bookingInfo || action.payload;

      // ✅ Save to localStorage upon successful booking
      localStorage.setItem('bookingInfo', JSON.stringify(state.bookingInfo));
    },
    bookingFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    saveBookingInfo(state, action) {
  const { appointmentDate, paidAt, ...rest } = action.payload;

  const info = {
    ...rest,
    appointmentDate:
      appointmentDate && !isNaN(new Date(appointmentDate))
        ? new Date(appointmentDate).toISOString()
        : null,
    paidAt:
      paidAt && !isNaN(new Date(paidAt))
        ? new Date(paidAt).toISOString()
        : null,
  };

  localStorage.setItem('bookingInfo', JSON.stringify(info));
  state.bookingInfo = info;
},
    setSelectedService(state, action) {
      state.selectedService = action.payload;
      localStorage.setItem('selectedService', JSON.stringify(action.payload));
    },
    createBookingRequest(state) {
      state.loading = true;
    },
    createBookingSuccess(state, action) {
      state.loading = false;
      state.bookingDetail = action.payload
    },
    createBookingFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userBookingsRequest(state) {
      state.loading = true;
    },
    userBookingsSuccess(state, action) {
      state.loading = false;
      state.bookingInfo = action.payload.bookingInfo;
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
  createBookingRequest,
  createBookingSuccess,
  createBookingFail,
  userBookingsRequest,
  userBookingsSuccess,
  userBookingsFail
} = actions;

export default reducer;
