const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter service name"],
        trim: true,
        unique: true
    },
    category: {
        type: String,
        required: [true, "Please enter service category"],
        enum: [
            'Exterior Wash',
            'Interior Cleaning',
            'Full Service',
            'Premium Packages',
            'Eco-Friendly',
            'Engine Care',
            'Add-on'
        ]
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    price: {
        type: Number,
        required: [true, "Please enter service price"]
    },
    isAddOn: {
        type: Boolean,
        default: false
    },
    estimatedDuration: {
        type: String, // e.g., "30 mins", "1 hour"
        default: ""
    },
    image: {
        type: String, // URL or path to the image
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

let serviceModel = mongoose.model('Service', serviceSchema);

module.exports = serviceModel;
