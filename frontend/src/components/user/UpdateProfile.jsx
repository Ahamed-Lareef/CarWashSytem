import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast,ToastContainer } from "react-toastify";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";
import "react-toastify/dist/ReactToastify.css";


export default function UpdateProfile () {
    const {  error, user, isUpdated } = useSelector(state => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
             if(reader.readyState === 2) {
                 setAvatarPreview(reader.result);
                 setAvatar(e.target.files[0])
             }
        }


        reader.readAsDataURL(e.target.files[0])
    }

    const submitHandler  = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('avatar', avatar);
        dispatch(updateProfile(formData))
    }

    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            if(user.avatar) {
                setAvatarPreview(user.avatar)
            }
        }

        if(isUpdated) {
            toast('Profile updated successfully',{
                type: 'success',
                position: "top-center",
                onOpen: () => dispatch(clearUpdateProfile())
            })
            return;
        }

        if(error)  {
            toast(error, {
                position: "top-center",
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }
    },[user, isUpdated, error, dispatch])

    return (  
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                    <h3 className="card-title text-center mb-4">Update Profile</h3>

                    <form onSubmit={submitHandler} encType="multipart/form-data">
                        <div className="mb-3">
                        <label htmlFor="name_field" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name_field"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="email_field" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        </div>

                        <div className="mb-4">
                        <label htmlFor="avatar_upload" className="form-label">Avatar</label>
                        <div className="d-flex align-items-center gap-3">
                            <img
                            src={avatarPreview}
                            alt="Avatar Preview"
                            className="rounded-circle border"
                            style={{ width: "60px", height: "60px", objectFit: "cover" }}
                            />
                            <input
                            type="file"
                            name="avatar"
                            className="form-control"
                            id="customFile"
                            onChange={onChangeAvatar}
                            />
                        </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                        Update Profile
                        </button>
                    </form>
                    </div>
                    
                </div>
                </div>
            </div>
            <ToastContainer/>
            </div>


    )
}