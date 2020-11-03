import {apiUrl} from "../../config"


export const GET_EXERCISES = "GET_EXERCISES"
export const CREATE_EXERCISE = "CREATE_EXERCISE"
export const DELETE_EXERCISE_BY_ID = "DELETE_EXERCISE_BY_ID"

//////////////////////

export const getExercises = (list) => {
   return {
         type:GET_EXERCISES,
         list
        }
}

export const createExercise = (data) => {
    return {
        type:CREATE_EXERCISE,
        data
    }
}


////////////////////////////////

export const createExerciseFunction =(data) => async (dispatch) => {
    const response = await fetch(`${apiUrl}/exercise/create`,{
        method:"post",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    if(response.ok) {
        // console.log(response)
    }
}

export const deleteExerciseById = (id) => async (dispatch) => {
    const response = await fetch(`${apiUrl}/exercise/delete`, {
        method: "delete",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({id})
    })
}


export const getExercisesFunction = () => async(dispatch) => {
    const response =await fetch(`${apiUrl}/images/all`)
    const data = await response.json()
    dispatch(getExercises(data))
}




//////////////////////////////

////////////////////////////////
export default function reducer (state=[], action) {
    Object.freeze(state);
    switch(action.type) {
        case(GET_EXERCISES):
            return action.list
        default:
            return state;
    }
}

