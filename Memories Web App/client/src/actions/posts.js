import * as api from '../api';


export const getposts=()=>async (dispatch)=>{

    try {
        const {data}=await api.fetchposts();

        dispatch({type:'FETCH_ALL',payload:data})
        
    } catch (error) {
        console.log(error.message)
    }








}