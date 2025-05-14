import axios from 'axios';
import {
    bookingRequest,
    bookingSuccess,
    bookingFail,
    userBookingsRequest,
    userBookingsSuccess,
    userBookingsFail
} from '../slices/bookingSlice';

// Create a new booking
export const createBooking = (bookingData) => async (dispatch) => {
    try {
        dispatch(bookingRequest());
        const { data } = await axios.post('/api/v1/booking/new', bookingData);

        dispatch(bookingSuccess(data));
    } catch (error) {
        dispatch(bookingFail(error.response?.data?.message || error.message));
    }
};


export const userBookings = (bookingData) => async (dispatch) => {
    try {
        dispatch(userBookingsRequest());

        const { data } = await axios.post('/api/v1/myorders', bookingData);

        dispatch(userBookingsSuccess(data));
    } catch (error) {
        dispatch(userBookingsFail(error.response?.data?.message || error.message));
    }
};
