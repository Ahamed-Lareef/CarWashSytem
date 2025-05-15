import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewService } from "../../actions/serviceActions";
import { toast, ToastContainer } from "react-toastify";
import { clearServiceCreated } from "../../slices/serviceSlice";
import "react-toastify/dist/ReactToastify.css";

export default function NewService() {
    const dispatch = useDispatch();

    const { loading, error, isServiceCreated } = useSelector(state => state.serviceState);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("Exterior Wash");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [isAddOn, setIsAddOn] = useState(false);
    const [estimatedDuration, setEstimatedDuration] = useState("");
    const [image, setImage] = useState(null);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("isAddOn", isAddOn);
        formData.append("estimatedDuration", estimatedDuration);
        if (image) {
            formData.append("image", image);
        }

        dispatch(createNewService(formData));
    };

    useEffect(() => {
        if (isServiceCreated) {
            toast.success("Service created successfully!", { position: "top-center" });
            dispatch(clearServiceCreated());

            // Reset fields
            setName("");
            setCategory("Exterior Wash");
            setDescription("");
            setPrice("");
            setIsAddOn(false);
            setEstimatedDuration("");
            setImage(null);
        }

        if (error) {
            toast.error(error, { position: "top-center" });
        }
    }, [isServiceCreated, error, dispatch]);

    return (
        <div className="container mt-5">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={submitHandler} encType="multipart/form-data">
                        <h2 className="mb-4">Add New Service</h2>

                        <div className="form-group">
                            <label>Service Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <select
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="Exterior Wash">Exterior Wash</option>
                                <option value="Interior Cleaning">Interior Cleaning</option>
                                <option value="Full Service">Full Service</option>
                                <option value="Premium Packages">Premium Packages</option>
                                <option value="Eco-Friendly">Eco-Friendly</option>
                                <option value="Engine Care">Engine Care</option>
                                <option value="Add-on">Add-on</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label>Price (LKR)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Estimated Duration</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="e.g., 30 mins, 1 hour"
                                value={estimatedDuration}
                                onChange={(e) => setEstimatedDuration(e.target.value)}
                            />
                        </div>

                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isAddOnCheck"
                                checked={isAddOn}
                                onChange={() => setIsAddOn(!isAddOn)}
                            />
                            <label className="form-check-label" htmlFor="isAddOnCheck">Is Add-On?</label>
                        </div>

                        <div className="form-group">
                            <label>Upload Image</label>
                            <input
                                type="file"
                                className="form-control-file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? "Creating..." : "Create Service"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
