import {createSlice} from "@reduxjs/toolkit"

const serviceSlice = createSlice({
    name : 'service',
    initialState: {
        loading: false,
        service: {}
    },
    reducers: {
        serviceRequest(state, action){
            return{
                loading: true
            }
        },
        serviceSuccess(state, action){
            return{
                loading: false,
                service: action.payload.service
            }
        },
        serviceFail(state, action){
            return{
                loading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = serviceSlice;

export const { serviceRequest, serviceSuccess, serviceFail } = actions;

export default reducer;

