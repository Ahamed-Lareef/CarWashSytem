import { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { getServices } from "../actions/serviceActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/Loader";
import Service from "./services/Service";
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination'

export default function Home () {
    const dispatch = useDispatch();
    const { services, loading, error, servicesCount, resPerPage} = useSelector((state) => state.servicesState)
    const [currentPage, setCurrentPage] = useState(1);

    const setCurrentPageNo = (pageNo) =>{
        setCurrentPage(pageNo)
    }

    useEffect(()=>{
        if(error){
            return toast.error(error)
        }
        
        dispatch(getServices(null, null, currentPage))
    }, [error, dispatch, currentPage])

    return(
        <Fragment>
            {loading ? <Loader/>:
                <Fragment>
                
                <MetaData title={'Get the best Car Wash'}/>
                <section id="carwash-services" className="container mt-5">
                <h2 className="text-center mb-4">Our Car Wash Services</h2>
                <div className="row">
                    {services && services.map(service => (
                       <Service col={3} key={service._id} service={service}/>
                    ))}
                    

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
                



                <section id="top-services" className="container my-5">
                <h2 className="text-center mb-4">Top Picks for You</h2>
                <div className="row">

                    <div className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 shadow-sm">
                        <img src="./images/services/deepCleaning.jpg" className="card-img-top" alt="Deep Cleaning & Waxing"></img>
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
                        <img src="/images/services/premiumWash.jpg" className="card-img-top" alt="Premium Full Service"></img>
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
                        <img src="/images/services/ecoWash.jpg" className="card-img-top" alt="Waterless Wash"></img>
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