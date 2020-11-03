import {apiUrl} from "../../config"


export const CREATE_REVIEW = "CREATE_REVIEW";
export const CREATE_REVIEW_ERROR = "CREATE_REVIEW_ERROR"
export const GRAB_ALL_REVIEWS = "GRAB_ALL_REVIEWS"

///////////////////////////////// 

export const createReview =()=> {
    return {
        type:CREATE_REVIEW
    }
}

export const createReviewSubmitError = (error) => {
    return {
        type: CREATE_REVIEW_ERROR,
        error
    }
}

export const grabAllReview = (reviews)=> {
    return {
        type: GRAB_ALL_REVIEWS,
        reviews
    }
}


///////////////////////////

export const grabAllReviewFunction =(planId) => async (dispatch) => {
    // console.log(planId)
    const response = await fetch(`${apiUrl}/review`, {
        method:"put",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({planId})
    })
    if(response.ok) {
        const reviews = await response.json();
        dispatch(grabAllReview(reviews))
    }
}






export const createReviewFunction =({rating, comment,planId, currentUserId}) => async (dispatch) => {
try{
        const response = await fetch(`${apiUrl}/review/submit`,{
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({rating, comment,planId, currentUserId})
        })
        if (response.ok) {

            dispatch(createReviewSubmitError([]))

        } else {
            throw response
        }
} catch(err) {
    const badRequest = await err.json();
    const arrayOfError =badRequest.error
    // console.log(arrayOfError)
    dispatch(createReviewSubmitError(arrayOfError))
}
}




export default function reducer (state={}, action)  {
    switch(action.type) {
        case CREATE_REVIEW_ERROR :
            return {...state, error:action.error}

        case GRAB_ALL_REVIEWS: 
            return {...state, reviews:action.reviews}

        default:
            return state
    }
}