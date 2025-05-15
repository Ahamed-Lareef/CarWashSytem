import { useEffect, useState } from 'react';
import { updatePassword as updatePasswordAction, clearAuthError } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const dispatch = useDispatch();
  const { isUpdated, error } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('oldPassword', oldPassword);
    formData.append('password', password);
    dispatch(updatePasswordAction(formData));
  };

  useEffect(() => {
    if (isUpdated) {
      toast.success('Password updated successfully', {
        position: 'top-center',
      });
      setOldPassword("");
      setPassword("");
    }

    if (error) {
      toast.error(error, {
        position: 'top-center',
      });
      dispatch(clearAuthError());
    }
  }, [isUpdated, error, dispatch]);

  return (
    <>
      <ToastContainer />
      <div className="row wrapper py-5 px-3 justify-content-center">
        <div className="col-10 col-md-8 col-lg-5">
          <form onSubmit={submitHandler} className="shadow-lg p-4 rounded bg-white">
            <h2 className="mb-4 text-center">Update Password</h2>

            <div className="form-group mb-3">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
