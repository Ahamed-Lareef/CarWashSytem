import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { saveBookingInfo, setSelectedService } from "../../slices/bookingSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

export default function Booking() {
    const bookingInfo = useSelector(state => state.bookingState?.bookingInfo || {});
    const selectedService = useSelector(state => state.bookingState?.selectedService);

    const [name, setName] = useState(bookingInfo.name || '');
    const [email, setEmail] = useState(bookingInfo.email || '');
    const [contact, setContact] = useState(bookingInfo.contact || '');
    const [address, setAddress] = useState(bookingInfo.address || '');
    const [city, setCity] = useState(bookingInfo.city || '');
    const [serviceMode, setServiceMode] = useState(bookingInfo.serviceMode || '');
    const [appointmentDate, setAppointmentDate] = useState(bookingInfo.appointmentDate || '');
    const [time, setTime] = useState(bookingInfo.time || '');
    
    // Vehicle Information
    const [vehicleNumber, setVehicleNumber] = useState(bookingInfo.vehicleNumber || '');
    const [vehicleType, setVehicleType] = useState(bookingInfo.vehicleType || '');
    const [make, setMake] = useState(bookingInfo.make || '');
    const [model, setModel] = useState(bookingInfo.model || '');

    // Loading state
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        // Input validation
        const errors = [];
        if (!/\S+@\S+\.\S+/.test(email)) {
            errors.push("Enter a valid email address");
        }

        if (!/^\d{10}$/.test(contact)) {
            errors.push("Contact number must be 10 digits");
        }

        if (new Date(appointmentDate) < new Date()) {
            errors.push("Appointment date cannot be in the past");
        }

        if (errors.length > 0) {
            errors.forEach(error => toast.error(error));
            return;
        }

        // Start loading state
        setLoading(true);

        // Save the booking information in Redux store
        dispatch(saveBookingInfo({ 
            name, email, contact, address, city, serviceMode, appointmentDate, time,
            vehicleInfo: { vehicleNumber, vehicleType, make, model },
            selectedService
        }));

        // Show success message and navigate to confirmation page after booking
        toast.success("Booking information saved successfully!");
        navigate('/booking/confirm');

        // End loading state
        setLoading(false);
    };

    return (
        <Fragment>
            <CheckoutSteps Booking/>
            <div className="row wrapper">
                <div className="col-12">
                    <form onSubmit={submitHandler} className="shadow-lg p-4">
                        <h1 className="mb-4">Booking Info</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact_field">Contact Number</label>
                            <input
                                type="text"
                                id="contact_field"
                                className="form-control"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="service_mode_field">Service Mode</label>
                            <select
                                id="service_mode_field"
                                className="form-control"
                                value={serviceMode}
                                onChange={(e) => setServiceMode(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Service Mode</option>
                                <option value="Station">Station</option>
                                <option value="Mobile">Mobile</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="appointment_date_field">Appointment Date</label>
                            <input
                                type="date"
                                id="appointment_date_field"
                                className="form-control"
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]} // Prevent past dates
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="time_field">Appointment Time</label>
                            <input
                                type="time"
                                id="time_field"
                                className="form-control"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>

                        {selectedService ? (
                            <div className="shadow-lg p-4 mb-4">
                                <h2 className="mb-3" style={{ color: "#dc323f" }}>{selectedService.name}</h2>
                                <p><strong>Price:</strong> LKR {selectedService.price}.00</p>
                                <p><strong>Category:</strong> {selectedService.category}</p>
                                <p><strong>Estimated Duration:</strong> {selectedService.estimatedDuration}</p>
                                <p style={{ color: "#636363" }}>{selectedService.description}</p>
                            </div>
                        ) : (
                            <p>No service selected</p>
                        )}

                        {/* Vehicle Information */}
                        <h3 className="mt-4">Vehicle Information</h3>

                        <div className="form-group">
                            <label htmlFor="vehicle_number_field">Vehicle Number</label>
                            <input
                                type="text"
                                id="vehicle_number_field"
                                className="form-control"
                                value={vehicleNumber}
                                onChange={(e) => setVehicleNumber(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="vehicle_type_field">Vehicle Type</label>
                            <input
                                type="text"
                                id="vehicle_type_field"
                                className="form-control"
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="make_field">Make</label>
                            <input
                                type="text"
                                id="make_field"
                                className="form-control"
                                value={make}
                                onChange={(e) => setMake(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="model_field">Model</label>
                            <input
                                type="text"
                                id="model_field"
                                className="form-control"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            id="booking_btn"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? "Submitting..." : "CONTINUE"}
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
