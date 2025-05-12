import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify'
import ServiceDetail from './components/services/ServiceDetail';
import ServiceSearch from './components/services/ServiceSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import store from './store'
import { useEffect } from 'react';
import { loadUser } from './actions/userActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Booking from './components/booking/Booking';



function App() {

  useEffect(() => {
    store.dispatch(loadUser)
  })
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Header />
          <div className='container container-fluid'>
            <ToastContainer/>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/search/:keyword' element={<ServiceSearch />} />
                <Route path='/service/:id' element={<ServiceDetail />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/myprofile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
                <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
                <Route path='/password/forgot' element={<ForgotPassword />}/>
                <Route path='/password/reset/:token' element={<ResetPassword />}/>
                <Route path='/booking' element={<Booking />}/>
              </Routes>
          </div>
          
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
