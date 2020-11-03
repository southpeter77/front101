import {apiUrl} from "../../config"



// const CREATE_ORDER = "CREATE_ORDER";
const GRAB_FOLLOWING_PLAN="GRAB_FOLLOWING_PLAN"
////////////////////////////////////

// const createOrder = () => {
//     return {
//         type:CREATE_ORDER,
//     }
// }


export const grabFollowingPlan = (following) => {
    return {
        type:GRAB_FOLLOWING_PLAN,
        following
    }
}

////////////////////////////////////
export const createOrderFunction = (currentPlanId)=> async (dispatch) => {
    const currentUserId = window.localStorage.getItem("currentUserId")
    await fetch(`${apiUrl}/order/create`, {
        method: "post",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({currentPlanId, currentUserId})
    })


}

export const grabAllOrders = (currentUserId) => async (dispatch) => {
    const response =await fetch(`${apiUrl}/order/all`,{
        method:"put",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({currentUserId})
    })
    if (response.ok) {
        const orders = await response.json();
        dispatch(grabFollowingPlan(orders))
    } 
}
/////////////////////////////////////////////
export default function reducer (state={}, action) {
    Object.freeze(state);
    switch(action.type) {
        case GRAB_FOLLOWING_PLAN:
            return {...state, following:action.following}
        default:
            return state
        }
}