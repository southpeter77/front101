import {apiUrl} from "../../config"
import merge from "lodash/merge";
import {TOKEN_KEY} from "./user"

export const GRAB_ALL_PLANS = "GRAB_ALL_PLANS";
export const CREATE_PLAN = "CREATE_PLAN"
export const CURRENT_PLAN_ID = "CurrentPlanId"
export const GRAB_ONE_PLAN = "GRAB_ONE_PLAN"
export const GRAB_MY_PLANS = "GRAB_MY_PLANS"
export const DELETE_MY_PLAN = "DELETE_MY_PLAN"
/////////////////////////////////////////////////
export const deleteMyPlan = (id) => {
    return {
        type: DELETE_MY_PLAN,
        id
    }
}


export const grabAllPlans = (list) => {
    return {
        type: GRAB_ALL_PLANS,
        list
    }
}

export const grabOnePlan = (viewPlan) => {
    return {
        type: GRAB_ONE_PLAN,
        viewPlan
    }
}


export const createPlan = (data) => {
    return {
        type:CREATE_PLAN,
        data
    }
}

export const grabMyPlans = (myPlans)=> {
    return {
        type:GRAB_MY_PLANS,
        myPlans
    }
}

/////////////////////////////////////////////////
export const deleteMyPlanFunction = (id) => async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN_KEY);
try {

    const response = await fetch(`${apiUrl}/plan/delete`, {
        method: "delete",
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({id})
    })
    
    if (!response.ok) {
        throw response
    } else {
        const jsoned =await response.json()
        // grabMyPlansFunction(id)
    }
}catch(err) {
    
}


}

export const grabMyPlansFunction = (myId) => async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN_KEY)

    const response = await fetch (`${apiUrl}/plan/myplan`,
    {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        body: JSON.stringify({myId})
    }
    )

    const myPlans = await response.json();
dispatch(grabAllPlans(myPlans))
}









export const grabOnePlanFunction = (id) => async(dispatch) => {
    const response = await fetch (`${apiUrl}/plan/${id}`);
    const plan = await response.json();
    // console.log(plan)
    dispatch(grabOnePlan(plan))
}



export const createPlanFuction = (data) => async(dispatch) => {
    const token = window.localStorage.getItem(TOKEN_KEY)
    const userId = window.localStorage.getItem("currentUserId")
    const newData = {...data, userId}
 
    const response = await fetch(`${apiUrl}/plan/create`,{
        method: "post",
        headers: {
            "Content-Type" : "application/json",

            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newData)
    })
    if(response.ok) {
        const {id} = await response.json()
       window.localStorage.setItem(CURRENT_PLAN_ID, id)
    }
}




export const grabTopList = () => async (dispatch) => {
        const response = await fetch(`${apiUrl}/plan/top`);
        if(response.ok) {
            const list = await response.json();
            dispatch(grabAllPlans(list))
        }

} 

//////////////////////////////////////////////////////

export default function reducer (state ={}, action) {
    Object.freeze(state);
    switch(action.type) {
        case GRAB_ALL_PLANS: 
            // return {...state, topPlanList:action.list}
            const list= action.list.map((each) => ({[each.id]: each}));
            // console.log(list)
            return merge({},state,...list)
        
        case GRAB_ONE_PLAN:

            return {...state, viewPlan:action.viewPlan}
        
        case GRAB_MY_PLANS:

        return {...state, myPlans: action.myPlans}
        

        default: return state
    }
}