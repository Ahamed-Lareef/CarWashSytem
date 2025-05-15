import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminServices } from "../../actions/serviceActions";
import { clearError } from "../../slices/servicesSlice";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { CSVLink } from "react-csv";

export default function ServiceList() {
  const { services = [], loading = true, error } = useSelector(
    (state) => state.servicesState
  );
  const dispatch = useDispatch();

  const setServices = () => {
    const data = {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Price", field: "price", sort: "asc" },
        { label: "Category", field: "category", sort: "asc" },
        { label: "Actions", field: "actions" },
      ],
      rows: [],
    };

    services.forEach((service) => {
      data.rows.push({
        id: service._id,
        name: service.name,
        price: `LKR ${service.price}`,
        category: service.category,
        actions: (
          <Fragment>
            <Link
              to={`/admin/service/${service._id}`}
              className="btn btn-primary btn-sm me-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const csvData = services.map((service) => ({
    ID: service._id,
    Name: service.name,
    Price: service.price,
    Category: service.category,
  }));

  useEffect(() => {
    if (error) {
      toast(error, {
        position: "top-center",
        type: "error",
        onOpen: () => dispatch(clearError()),
      });
      return;
    }

    dispatch(getAdminServices());
  }, [dispatch, error]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4 d-flex justify-content-between align-items-center">
          Service List
          {!loading && services.length > 0 && (
            <CSVLink
              data={csvData}
              filename={"services-report.csv"}
              className="btn btn-success"
            >
              <i className="fa fa-download me-2"></i> Generate CSV
            </CSVLink>
          )}
        </h1>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setServices()}
              bordered
              striped
              hover
              className="px-3"
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
