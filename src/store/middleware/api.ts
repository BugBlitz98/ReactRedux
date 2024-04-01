import axios from "axios";
import * as actions from '../api';
import { Middleware } from "@reduxjs/toolkit";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
//import {ADMIN_URl} from '../../config/host';

const api: Middleware<{}, unknown, ThunkDispatch<unknown, unknown, AnyAction>> = ({dispatch}) => next => async (action:any) => {
    let token =    await localStorage.getItem('accessToken');
    // console.log(action.payload, `type: ${action.type}`);
    // console.log(actions.apiCallBegan.type);
    // console.log('****break***');
    if(action.type !== actions.apiCallBegan.type){
        return next(action)
    }

   // console.log(action.payload,'action.payload')
    const {url, method, data, onStart, onSuccess, onError, baseUrl} = action.payload;
    if(onStart){
        dispatch({
            type: onStart
        })
    }
    next(action);
 
    try{
        let response:any;
        if(token){
             response = await axios.request({
                baseURL: baseUrl,
                url,
                method,
                data,
                headers: {
                    Authorization: `Bearer ${token}`,
                   //'content-type': 'multipart/form-data',
                   // 'content-type': 'application/x-www-form-urlencoded' 
                   }
            });
        }else{
             response = await axios.request({
                baseURL: baseUrl,
                url,
                method,
                data
            });
        }
       

        dispatch(actions.apiCallSuccess(response.data));
        //console.log(response.data);
        if(onSuccess){
         // console.log(response.data);
            dispatch({
                type: onSuccess,
                payload: response.data
            })
            
        }

    }catch(err:any){
    // console.log(err.response.data,'err.response')
       dispatch(actions.apiCallFailed(err.response.data));
        if(onError){
            dispatch({
                type: onError,
                payload: err.response.data
            })
        }
    }
}

export default api