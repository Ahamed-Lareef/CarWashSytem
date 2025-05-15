import {createSlice} from "@reduxjs/toolkit"


const servicesSlice = createSlice({
    name : 'services',
    initialState: {
        loading: false
    },
    reducers: {
        servicesRequest(state, action){
            return{
                loading: true
            }
        },
        servicesSuccess(state, action){
            return{
                loading: false,
                services: action.payload.services,
                servicesCount: action.payload.count,
                resPerPage: action.payload.resPerPage
            }
        },
        servicesFail(state, action){
            return{
                loading: false,
                error: action.payload
            }
        },
         adminServicesRequest(state, action){
            return{
                loading: true
            }
        },
        adminServicesSuccess(state, action){
            return{
                loading: false,
                services: action.payload.services,
            
            }
        },
        adminServicesFail(state, action){
            return{
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action){
            state.error = null;
        }
    }
});

const { actions, reducer } = servicesSlice;

export const { 
    servicesRequest, 
    servicesSuccess, 
    servicesFail,
    adminServicesRequest,
    adminServicesSuccess,
    adminServicesFail,
    clearError
} = actions;

export default reducer;

