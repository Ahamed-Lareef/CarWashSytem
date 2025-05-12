import { Link } from 'react-router-dom';

export default function Service({ service, col }) {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card p-3 rounded h-100 d-flex flex-column">
                <img
                    className="card-img-top mx-auto"
                    src={service.image}
                    alt={service.name}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/service/${service._id}`}>{service.name}</Link>
                    </h5>
                    <p className="card-text">{service.description}</p>
                    <p className="card-text">
                        <strong>LKR {Number(service.price).toFixed(2)}</strong>
                    </p>
                    <Link to={`/service/${service._id}`} className="btn mt-auto w-100">
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
