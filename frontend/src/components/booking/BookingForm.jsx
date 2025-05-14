import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    location: '',
    serviceMode: 'Station', // default option
    vehicleInfo: [{
      vehicleNumber: '',
      vehicleType: '',
      make: '',
      model: ''
    }],
    appointmentDate: '',
    time: '',
    bookServices: [],
    amount: 0
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle vehicle info dynamic fields
  const handleVehicleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVehicleInfo = [...userData.vehicleInfo];
    updatedVehicleInfo[index][name] = value;
    setUserData(prevState => ({
      ...prevState,
      vehicleInfo: updatedVehicleInfo
    }));
  };

  // Handle adding new vehicle info
  const addVehicle = () => {
    setUserData(prevState => ({
      ...prevState,
      vehicleInfo: [...prevState.vehicleInfo, { vehicleNumber: '', vehicleType: '', make: '', model: '' }]
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send booking data to the backend
      const response = await axios.post('/api/v1/booking/new', userData);


      // If successful, show the success message
      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      // If there's an error, display the error message
      setErrorMessage(error.response ? error.response.data.message : 'An error occurred');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Book Your Service</h2>
      
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="row">
        <div className="col-sm-12 col-md-6 col-lg-4 my-3">
          <div className="card p-3 rounded h-100 d-flex flex-column">
            <div className="card-body d-flex flex-column">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 my-3">
          <div className="card p-3 rounded h-100 d-flex flex-column">
            <div className="card-body d-flex flex-column">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 my-3">
          <div className="card p-3 rounded h-100 d-flex flex-column">
            <div className="card-body d-flex flex-column">
              <label className="form-label">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={userData.contact}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 my-3">
          <div className="card p-3 rounded h-100 d-flex flex-column">
            <div className="card-body d-flex flex-column">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 my-3">
          <div className="card p-3 rounded h-100 d-flex flex-column">
            <div className="card-body d-flex flex-column">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={userData.location}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 my-3">
          <div className="card p-3 rounded h-100 d-flex flex-column">
            <div className="card-body d-flex flex-column">
              <label className="form-label">Service Mode</label>
              <select
                name="serviceMode"
                value={userData.serviceMode}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="Station">Station</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
          </div>
        </div>

        {userData.vehicleInfo.map((vehicle, index) => (
          <div className="col-sm-12 col-md-6 col-lg-4 my-3" key={index}>
            <div className="card p-3 rounded h-100 d-flex flex-column">
              <div className="card-body d-flex flex-column">
                <label className="form-label">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={vehicle.vehicleNumber}
                  onChange={(e) => handleVehicleChange(index, e)}
                  className="form-control"
                  required
                />
                <label className="form-label">Vehicle Type</label>
                <input
                  type="text"
                  name="vehicleType"
                  value={vehicle.vehicleType}
                  onChange={(e) => handleVehicleChange(index, e)}
                  className="form-control"
                  required
                />
                <label className="form-label">Make</label>
                <input
                  type="text"
                  name="make"
                  value={vehicle.make}
                  onChange={(e) => handleVehicleChange(index, e)}
                  className="form-control"
                  required
                />
                <label className="form-label">Model</label>
                <input
                  type="text"
                  name="model"
                  value={vehicle.model}
                  onChange={(e) => handleVehicleChange(index, e)}
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <div className="col-12 text-center my-3">
          <button type="button" className="btn btn-secondary" onClick={addVehicle}>Add Vehicle</button>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 my-3">
          <div className="card p-3 rounded h-100 d-flex flex-column">
            <div className="card-body d-flex flex-column">
              <label className="form-label">Appointment Date</label>
              <input
                type="date"
                name="appointmentDate"
                value={userData.appointmentDate}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 my-3">
          <div className="card p-3 rounded h-100 d-flex flex-column">
            <div className="card-body d-flex flex-column">
              <label className="form-label">Appointment Time</label>
              <input
                type="time"
                name="time"
                value={userData.time}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div className="col-12 text-center my-3">
          <button type="submit" className="btn btn-primary w-100">Book Now</button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
