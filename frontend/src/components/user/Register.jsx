import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, register } from "../../actions/userActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [avatar, setAvatar] = useState("");
    const navigate = useNavigate();
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.jpg");
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState);

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0]);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('avatar', avatar);
        dispatch(register(formData));
    };

    useEffect(() => {
        if(isAuthenticated){
            navigate('/')
            return
        }
        if (error) {
            toast(error, {
                position: "top-center",
                type: "error",
                onOpen: () => { dispatch(clearAuthError()) }
            });
        }
    }, [error, dispatch,isAuthenticated,navigate]);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
            <div className="col-12 col-md-8 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg p-4 rounded bg-white" encType="multipart/form-data">
                    <h1 className="mb-4 text-center">Register</h1>

                    <div className="form-group mb-3">
                        <label htmlFor="name_field">Name</label>
                        <input
                            type="text"
                            name='name'
                            onChange={onChange}
                            id="name_field"
                            className="form-control"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            name='email'
                            onChange={onChange}
                            id="email_field"
                            className="form-control"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            name='password'
                            onChange={onChange}
                            id="password_field"
                            className="form-control"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="avatar_upload">Avatar</label>
                        <div className="d-flex align-items-center gap-3">
                            <figure className="avatar mb-0">
                                <img
                                    src={avatarPreview}
                                    className="rounded-circle"
                                    alt="avatar preview"
                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                />
                            </figure>
                            <input
                                type="file"
                                name="avatar"
                                onChange={onChange}
                                className="form-control"
                                id="customFile"
                            />
                        </div>
                    </div>

                    <button
                        id="register_button"
                        type="submit"
                        className="btn btn-danger w-100 py-2"
                        disabled={loading}
                    >
                        REGISTER
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
