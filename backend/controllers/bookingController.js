
const Booking = require('../models/bookingModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures');


//create booking - /api/v1/booking/new
exports.newBooking = catchAsyncError(async (req, res, next) => {
    const {
        name,
        email,
        contact,
        address,
        location,
        station,
        serviceMode,
        vehicleInfo,
        time,
        bookServices,
        amount,
    } = req.body;

    const booking = await Booking.create({
        user: req.user.id,
        name,
        email,
        contact,
        address,
        location,
        station,
        serviceMode,
        vehicleInfo,
        appointmentDate: Date.now(),
        time,
        bookServices,
        amount,
        paidAt: Date.now(),
    });

    res.status(200).json({
        success: true,
        booking
    });
});

//Admin: Get all bookings - api/v1/bookings
exports.bookings = catchAsyncError(async (req, res, next) => {
    const bookings = await Booking.find();

    let totalAmount = 0;

    bookings.forEach(booking => {
        totalAmount += booking.amount
    })

    res.status(200).json({
        success: true,
        totalAmount,
        bookings
    })
})

//get single booking - /api/v1/booking/:id
exports.getSingleBooking = async(req, res, next)=>{
    const booking = await Booking.findById(req.params.id).populate('user','name email');
    
    if(!booking){
        return next(new ErrorHandler(`Booking not found with id: ${req.params.id}` , 400));
    }

    res.status(200).json({
        success: true,
        booking
    })
}

//Get Loggedin User bookings - /api/v1/mybookings
exports.myBookings = catchAsyncError(async (req, res, next) => {
    const bookings = await Booking.find({user: req.user.id});

    res.status(200).json({
        success: true,
        bookings
    })
})

//update booking - /api/v1/booking/:id


//delete booking - /api/v1/booking/:id
exports.deleteBooking = async(req, res, next)=>{
    const booking = await Booking.findById(req.params.id);
    
    if(!booking){
        return res.status(404).json({
            success: false,
            message: "Booking not found!"
        })
    }

    await booking.deleteOne();

    res.status(200).json({
        success: true,
        message: "Booking deleted!"
    })
}

//Admin: Update booking / booking status - api/v1/booking/:id
exports.updateBooking = catchAsyncError(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(new ErrorHandler('Booking not found', 404));
    }

    if (booking.bookingStatus === 'Completed') {
        return next(new ErrorHandler('Booking has already been completed!', 400));
    }

    // Debug log to verify input
    console.log("Incoming Status:", req.body.bookingStatus);

    if (req.body.bookingStatus) {
        booking.bookingStatus = req.body.bookingStatus;
    }

    if (booking.bookingStatus === 'Completed') {
        booking.completedAt = Date.now();
    }

    await booking.save();

    res.status(200).json({
        success: true,
        message: "Booking updated successfully",
        booking
    });
});
