import {apiUrl} from "../../config"
// import { GRAB_ALL_PLANS } from "./plan"

export const GRAB_USER_IMAGE_FOR_PLAN = "GRAB_USER_IMAGE_FOR_PLAN"

export const grabUserImageForPlan = (images) => {
    return {
        type: GRAB_USER_IMAGE_FOR_PLAN,
        images
    }
}

export const uploadeProfile = (data) => async (dispatch) => {


    const response  = await fetch(`${apiUrl}/images/upload`,{
        method:"put",
        body:data
    })
    if (response.ok){
        const res = await response.json()
        console.log(res)
    }
}



export const grabUserImage = ()=> async (dispatch) => {

    const response = await fetch(`${apiUrl}/plan/test`);
 

    if (response.ok) {
   const data = await response.json()
     const urlArray = data.map(each=>each.url)
     dispatch(grabUserImageForPlan(urlArray))
    // console.log(urlArray)
    }  
}

export default function reducer (state ={}, action) {
    Object.freeze(state);
    switch(action.type){
        case GRAB_USER_IMAGE_FOR_PLAN:
            return {...state, images: action.images}
        default:
        return state
    }

}

