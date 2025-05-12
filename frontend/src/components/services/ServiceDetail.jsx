import { Fragment, useEffect } from "react";
import { getService } from "../../actions/serviceActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from '../layouts/Loader';
import MetaData from "../layouts/MetaData";

export default function ServiceDetail() {
    const { loading, service } = useSelector((state) => state.serviceState);
    const dispatch = useDispatch();

    const { id } = useParams();
    
    useEffect(() => {
        dispatch(getService(id));
    }, [id, dispatch]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={service.name} />
                    <div className="container py-5" style={{ backgroundColor: "#f8f8f6", color: "#0b0c0e" }}>
                        <div className="row justify-content-around align-items-start">
                            <div className="col-12 col-lg-5 mb-4">
                                <div id="service_image" className="text-center">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="img-fluid rounded shadow"
                                        style={{ maxHeight: "500px", maxWidth: "100%" }}
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-lg-6">
                                <h3 className="mb-3" style={{ color: "#dc323f" }}>
                                    {service.name}
                                </h3>
                                <p id="service_id" className="text-muted">Service #{service._id}</p>

                                <hr />

                                <p><strong>Category:</strong> {service.category}</p>
                                <p><strong>Estimated Duration:</strong> {service.estimatedDuration}</p>

                                <hr />

                                <p id="service_price" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                    LKR {service.price}.00
                                </p>

                                <button
                                    type="button"
                                    id="book_btn"
                                    className="btn"
                                    style={{ backgroundColor: "#dc323f", color: "#fff" }}
                                >
                                    Book Now
                                </button>

                                <hr />

                                <p>Status: <span id="availability_status" style={{ color: "#28a745" }}>Available</span></p>

                                <hr />

                                <h4 className="mt-3" style={{ color: "#222222" }}>Description:</h4>
                                <p style={{ color: "#636363" }}>
                                    {service.description}
                                </p>

                                <hr />

                                <p id="service_provider" className="mb-3">
                                    Provided by: <strong>AutoCare Gelioya</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
