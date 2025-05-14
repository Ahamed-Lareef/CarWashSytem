const catchAsyncError = require('../middlewares/catchAsyncError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncError(async (req, res, next) => {
    const { amount, booking } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe expects the amount in cents
        currency: 'lkr',
        description: 'Car Wash Payment',
        metadata: {
            integration_check: 'accept_payment',
            bookingInfo: JSON.stringify(booking) // You can stringify to store structured data
        }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    });
});

exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });
});
