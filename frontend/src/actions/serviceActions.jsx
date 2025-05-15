import axios from 'axios';
import { adminServicesFail, adminServicesRequest, adminServicesSuccess, servicesFail, servicesRequest, servicesSuccess } from '../slices/servicesSlice';
import { newServiceFail, newServiceRequest, newServiceSuccess, serviceFail, serviceRequest, serviceSuccess } from '../slices/serviceSlice';


export const getServices = (keyword, category, currentPage) => async (dispatch) => {

    try {
        dispatch(servicesRequest())
        let link = `/api/v1/services?page=${currentPage}`;

        if(keyword){
            link += `&keyword=${keyword}`
        }

        if(category){
            link += `&category=${category}`
        }
        
        const { data } = await axios.get(link);
        dispatch(servicesSuccess(data))
    } catch (error) {
        //handle error
        dispatch(servicesFail(error.response.data.message))
    }
    
}

export const getService = id => async (dispatch) => {

    try {
        dispatch(serviceRequest())
        const { data } = await axios.get(`/api/v1/service/${id}`);
        dispatch(serviceSuccess(data))
    } catch (error) {
        //handle error
        dispatch(serviceFail(error.response.data.message))
    }
    
}

export const getAdminServices = () => async (dispatch) => {

    try {
        dispatch(adminServicesRequest())
        
        const { data } = await axios.get(`/api/v1/admin/services`);
        dispatch(adminServicesSuccess(data))
    } catch (error) {
        //handle error
        dispatch(adminServicesFail(error.response.data.message))
    }
    
}
export const createNewService = (serviceData) => async (dispatch) => {
  try {
    dispatch(newServiceRequest());

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    };

    const { data } = await axios.post('/api/v1/admin/service/new', serviceData, config);

    dispatch(newServiceSuccess(data));
  } catch (error) {
    dispatch(newServiceFail(error.response?.data?.message || "Something went wrong"));
  }
};