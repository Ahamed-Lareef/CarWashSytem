import axios from 'axios';
import {
    bookingRequest,
    bookingSuccess,
    bookingFail,
    userBookingsRequest,
    userBookingsSuccess,
    userBookingsFail,
    createBookingRequest,
    createBookingSuccess,
    createBookingFail
} from '../slices/bookingSlice';

// Create a new booking
export const createBooking = (bookingData) => async (dispatch) => {
    try {
        dispatch(createBookingRequest());
        const { data } = await axios.post('/api/v1/booking/new', bookingData);

        dispatch(createBookingSuccess(data));
    } catch (error) {
        dispatch(createBookingFail(error.response?.data?.message || error.message));
    }
};


export const userBookings = () => async (dispatch) => {
    try {
        dispatch(userBookingsRequest());
        const { data } = await axios.get('/api/v1/mybookings');
        // data = { success: true, bookings: [...] }
        dispatch(userBookingsSuccess(data.bookings));  // <-- dispatch bookings array only
    } catch (error) {
        dispatch(userBookingsFail(error.response?.data?.message || error.message));
    }
};
