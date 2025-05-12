import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { getServices } from "../../actions/serviceActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import Service from "./Service";
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination'
import { useParams } from "react-router-dom";

export default function ServiceSearch () {
    const dispatch = useDispatch();
    const { services, loading, error, servicesCount, resPerPage} = useSelector((state) => state.servicesState)
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState(null);

    const { keyword } = useParams();

    const categories = [
        'Exterior Wash',
        'Interior Cleaning',
        'Full Service',
        'Premium Packages',
        'Eco-Friendly',
        'Engine Care',
        'Add-on'
    ]
    const setCurrentPageNo = (pageNo) =>{
        setCurrentPage(pageNo)
    }

    useEffect(() => {
        if (error) {
            return toast.error(error)
        }
        dispatch(getServices(keyword, category, currentPage))
    }, [error, dispatch, currentPage, keyword, category]) // ← Added category here


    return(
        <Fragment>
            {loading ? <Loader/>:
                <Fragment>
                
                <MetaData title={'Get the best Car Wash'}/>
               <section id="carwash-services" className="container mt-5">
                <h2 className="text-center mb-4">Search Services</h2>

                <div className="row">
                    {/* Sidebar: Category Filters */}
                    <div className="col-6 col-md-3 mb-5 mt-5">
                        <div className="mt-5">
                            <h3 className="mb-3">Categories</h3> 
                            <ul className="pl-0">
                                {categories.map(cat => (
                                    <li
                                        key={cat}
                                        style={{ cursor: "pointer", listStyleType: "none" }}
                                        onClick={() => setCategory(cat)}
                                    >
                                        {cat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Main Section: Services */}
                    <div className="col-6 col-md-9">
                        <div className="row">
                            {services && services.map(service => (
                                <Service col={4} key={service._id} service={service}/>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
                
                {servicesCount > 0 && servicesCount > resPerPage?
                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        activePage={currentPage}
                        onChange={setCurrentPageNo}
                        totalItemsCount={servicesCount}
                        itemsCountPerPage={resPerPage}
                        nextPageText={'Next'}
                        firstPageText={'First'}
                        lastPageText={'Last'}
                        itemClass={'page-item'}
                        linkClass={'page-link'}
                    />
                </div> : null}
                <section id="service-categories" className="container my-5">
                <h2 className="text-center mb-4">Explore by Category</h2>
                <div className="row g-4">

                    <div className="col-12 col-md-6 col-lg-3">
                    <div className="position-relative overflow-hidden rounded shadow-sm category-tile">
                        <img src="/images/services/basicWash.jpg" alt="Exterior Wash" className="img-fluid w-100 h-100 object-fit-cover" />
                        <div className="position-absolute top-0 start-0 w-100 text-center text-white bg-dark bg-opacity-50 p-3">
                        <h5 className="m-0">Exterior Wash</h5>
                        </div>
                    </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                    <div className="position-relative overflow-hidden rounded shadow-sm category-tile">
                        <img src="/images/services/basicWash.jpg" alt="Interior Cleaning" className="img-fluid w-100 h-100 object-fit-cover" />
                        <div className="position-absolute top-0 start-0 w-100 text-center text-white bg-dark bg-opacity-50 p-3">
                        <h5 className="m-0">Interior Cleaning</h5>
                        </div>
                    </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                    <div className="position-relative overflow-hidden rounded shadow-sm category-tile">
                        <img src="/images/services/basicWash.jpg" alt="Full Service" className="img-fluid w-100 h-100 object-fit-cover" />
                        <div className="position-absolute top-0 start-0 w-100 text-center text-white bg-dark bg-opacity-50 p-3">
                        <h5 className="m-0">Full Service</h5>
                        </div>
                    </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                    <div className="position-relative overflow-hidden rounded shadow-sm category-tile">
                        <img src="/images/services/basicWash.jpg" alt="Eco-Friendly" className="img-fluid w-100 h-100 object-fit-cover" />
                        <div className="position-absolute top-0 start-0 w-100 text-center text-white bg-dark bg-opacity-50 p-3">
                        <h5 className="m-0">Eco-Friendly</h5>
                        </div>
                    </div>
                    </div>

                </div>
                </section>





                <section id="top-services" className="container my-5">
                <h2 className="text-center mb-4">Top Picks for You</h2>
                <div className="row">

                    <div className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 shadow-sm">
                        <img src="/images/carwash/basicWash.jpg" className="card-img-top" alt="Deep Cleaning & Waxing"></img>
                        <div className="card-body">
                        <h5 className="card-title">Deep Cleaning & Waxing</h5>
                        <p className="card-text">Full body deep clean and protective wax layer. Ideal for monthly deep care.</p>
                        <p className="card-text"><strong>LKR 4500.00</strong></p>
                        <a href="#" className="btn btn-primary w-100">Book Now</a>
                        </div>
                    </div>
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 shadow-sm">
                        <img src="/images/carwash/basicWash.jpg" className="card-img-top" alt="Premium Full Service"></img>
                        <div className="card-body">
                        <h5 className="card-title">Premium Full Service</h5>
                        <p className="card-text">Our best-selling full package — interior & exterior perfection.</p>
                        <p className="card-text"><strong>LKR 3500.00</strong></p>
                        <a href="#" className="btn btn-primary w-100">Book Now</a>
                        </div>
                    </div>
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 shadow-sm">
                        <img src="/images/carwash/basicWash.jpg" className="card-img-top" alt="Waterless Wash"></img>
                        <div className="card-body">
                        <h5 className="card-title">Waterless Wash</h5>
                        <p className="card-text">Eco-friendly cleaning with no water waste — perfect for conscious drivers.</p>
                        <p className="card-text"><strong>LKR 2500.00</strong></p>
                        <a href="#" className="btn btn-primary w-100">Book Now</a>
                        </div>
                    </div>
                    </div>

                </div>
                </section>



                </Fragment>
            }       
        </Fragment>
        
        
        
    )
}