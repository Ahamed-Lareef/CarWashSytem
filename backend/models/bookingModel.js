const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, "Please Enter Customer Name"],
        trim: true,
        maxLength: [100, "Name cannot exceed 100 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Customer Email Address"],
        trim: true,
    },
    contact: {
        type: String,
        required: [true, "Please Enter Contact Number"],
        trim: true,
    },
    address: {
        type: String,
        required: [true, "Please Enter Customer Address"],
        trim: true,
    },
    location: {
        type: String,
        required: [true, "Please Enter Your Area or Location"],
        trim: true,
    },
    station: {
        type: String,
        trim: true,
        required: function () {
            return this.serviceMode === "Station";
        }
    },
    serviceMode: {
        type: String,
        enum: ["Station", "Mobile"],
        required: [true, "Please Select Service Mode"]
    },
    vehicleInfo: [{
        vehicleNumber: {
            type: String,
            required: [true, "Please Enter Vehicle Number"],
            trim: true,
        },
        vehicleType: {
            type: String,
            required: [true, "Please Enter Vehicle Type (e.g., Car, Van, etc.)"],
            trim: true,
        },
        make: {
            type: String,
            required: [true, "Please Enter Vehicle Make"],
            trim: true,
        },
        model: {
            type: String,
            required: [true, "Please Enter Vehicle Model"],
            trim: true,
        }
    }],
    appointmentDate: {
        type: Date,
        required: [true, "Please Enter Appointment Date"],
    },
    time: {
        type: String,
        required: [true, "Please Enter Appointment Time"],
        trim: true,
    },
    bookServices: [{
        name: {
            type:String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        service: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Service'
        }
    }]
    ,
    amount: {
        type: Number,
        required: true,
        default: 0.0
    },
    paidAt: {
        type: Date
    },
    completedAt : {
        type: Date
    },
    bookingStatus: {
        type: String,
        enum: ['Pending', 'On going','Completed'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

let schema = mongoose.model('Booking', bookingSchema)

module.exports = schema
