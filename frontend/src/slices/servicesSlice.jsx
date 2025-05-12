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
        }
    }
});

const { actions, reducer } = servicesSlice;

export const { servicesRequest, servicesSuccess, servicesFail } = actions;

export default reducer;

