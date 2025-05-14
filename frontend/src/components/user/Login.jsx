import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { clearAuthError, login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector((state) => state.authState);
  const redirect = location.search?'/'+location.search.split('=')[1]:'/';

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Please enter both email and password", {
        position: "top-center",
        toastId: "empty_fields_warning" // ensures toast shows every time
      });
      return;
    }

    // Optional: Additional validation for email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      toast.warn("Please enter a valid email", {
        position: "top-center",
        toastId: "invalid_email_warning"
      });
      return;
    }

    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect)// Redirect to home page or any other page after successful login
    }

    if (error) {
      toast.error(error, {
        position: "top-center",
        type: error,
        onOpen: ()=>{dispatch(clearAuthError)}
      });
    }
  }, [error, isAuthenticated, navigate, dispatch]); // Add navigate in the dependency array

  return (
    <Fragment>
  <MetaData title="Login" />
  <div
    className="row wrapper d-flex justify-content-center align-items-center"
    style={{ minHeight: "80vh" }}
  >
    <div className="col-10 col-lg-5">
      <form
        onSubmit={submitHandler}
        className="shadow-lg p-4 rounded bg-white"
      >
        <h1 className="mb-4 text-center">Login</h1>

        <div className="form-group mb-3">
          <label htmlFor="email_field">Email</label>
          <input
            type="email"
            id="email_field"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password_field">Password</label>
          <input
            type="password"
            id="password_field"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Links Row */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/password/forgot">Forgot Password?</Link>
          <Link to="/register">New User?</Link>
        </div>

        <button
          id="login_button"
          type="submit"
          className="btn btn-primary btn-block w-100 py-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </form>
    </div>
  </div>
  <ToastContainer />
</Fragment>

  );
}
