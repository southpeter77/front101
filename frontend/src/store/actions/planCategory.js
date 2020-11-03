import {apiUrl} from "../../config"


export const GET_PLAN_CATEGORY = "GET_PLAN_CATEGORY";

//////////

export const getPlanCategory = (list)=> {
    return {
        type:GET_PLAN_CATEGORY,
        list
    }
}

export const getPlanCategoryFunction = () => async (dispatch) => {
    const response = await fetch(`${apiUrl}/category/all`);
    if(response.ok) {
        const list = await response.json();
        dispatch(getPlanCategory(list))
    }
}


export default function reducer (state=[], action) {
    Object.freeze(state);
    switch(action.type){
        case GET_PLAN_CATEGORY:
            return action.list

        default:
            return state
    }
}