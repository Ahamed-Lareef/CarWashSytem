const express = require('express');
const { newBooking, getSingleBooking, updateBooking, deleteBooking, myBookings, bookings } = require('../controllers/bookingController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');

// Customer routes
router.route('/booking/new').post(isAuthenticatedUser, newBooking); // Create a new booking
router.route('/booking/:id')
    .get(getSingleBooking) // Get a specific booking by ID
    .put(isAuthenticatedUser, updateBooking); // Update booking by ID (customer can update)
    
router.route('/mybookings').get(isAuthenticatedUser, myBookings); // Get all bookings for the authenticated user

// Admin routes
router.route('/bookings').get(isAuthenticatedUser, authorizeRoles('admin'), bookings); // Get all bookings for admins
router.route('/booking/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateBooking) // Admins can update bookings
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBooking); // Admins can delete bookings

module.exports = router;
