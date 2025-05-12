import axios from 'axios';
import { servicesFail, servicesRequest, servicesSuccess } from '../slices/servicesSlice';
import { serviceFail, serviceRequest, serviceSuccess } from '../slices/serviceSlice';


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