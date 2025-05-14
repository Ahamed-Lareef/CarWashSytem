import MetaData from '../layouts/MetaData';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';

export default function ConfirmBooking() {
    const navigate = useNavigate();
    const { bookingInfo } = useSelector(state => state.bookingState);
    const { serviceInfo } = useSelector(state => state.serviceState);
    const { user } = useSelector(state => state.authState);

    const [selectedService, setSelectedService] = useState(null);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        // Try to get selected service from Redux or localStorage
        const serviceFromRedux = serviceInfo || null;
        const serviceFromLocal = JSON.parse(localStorage.getItem('selectedService')) || null;

        const finalService = serviceFromRedux || serviceFromLocal || bookingInfo?.selectedService || null;

        if (finalService) {
            setSelectedService(finalService);
            setPrice(finalService.price);
        }
    }, [serviceInfo, bookingInfo]);

    const processPayment = () => {
        const data = {
            price,
            serviceId: selectedService?._id,
        };
        sessionStorage.setItem('info', JSON.stringify(data));
        navigate('/payment');
    };

    if (!selectedService || !bookingInfo) {
        return <p>Loading...</p>;
    }

    return (
        <Fragment>
            <MetaData title="Confirm Booking" />
            <CheckoutSteps booking confirmBooking />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">
                    <h4 className="mb-3">Booking Info</h4>
                    <p><b>Name:</b> {user.name}</p>
                    <p><b>Phone:</b> {bookingInfo.contact}</p>
                    <p className="mb-4">
                    <h4 className="mt-4">Vehicle & Appointment Details:</h4>
                    <p><b>Vehicle Type:</b> {bookingInfo.vehicleInfo?.vehicleType}</p>
                    <p><b>Vehicle Make:</b> {bookingInfo.vehicleInfo?.make}</p>
                    <p><b>Vehicle Model:</b> {bookingInfo.vehicleInfo?.model}</p>
                    <p><b>Vehicle Number:</b> {bookingInfo.vehicleInfo?.vehicleNumber}</p>
                    <p><b>Appointment Date:</b> {bookingInfo.appointmentDate}</p>
                    <p><b>Time:</b> {bookingInfo.time}</p>
                    <p><b>Address:</b> {bookingInfo.address}</p>
                    <p><b>City:</b> {bookingInfo.city}</p>                    </p>

                    <hr />
                    <h4 className="mt-4">Selected Service:</h4>
                    <div className="cart-item my-1">
                        <div className="row">
                            <div className="col-4 col-lg-2">
                                <img src={selectedService.image} alt={selectedService.name} height="45" width="65" />
                            </div>
                            <div className="col-5 col-lg-6">
                                <Link to={`/services/${selectedService._id}`}>{selectedService.name}</Link>
                            </div>
                            <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                <p><b>LKR {selectedService.price}</b></p>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Booking Summary</h4>
                        <hr />
                        <p>Service Price: <span className="order-summary-values">LKR {price}</span></p>
                        <hr />
                        <p>Total: <span className="order-summary-values">LKR {price}</span></p>
                        <hr />
                        <button id="checkout_btn" onClick={processPayment} className="btn btn-primary btn-block">
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
