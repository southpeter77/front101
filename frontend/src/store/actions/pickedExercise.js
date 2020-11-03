


export const PICKED_EXERCISE_IN_FORM = "PICKED_EXERCISE_IN_FORM"

export const DELETE_PICKED_EXERCISE_IN_FORM = "DELETE_PICKED_EXERCISE_IN_FORM"
export const CREATE_EXERCISE_FROM_FORM = "CREATE_EXERCISE_FROM_FORM"
///////////////////////////////////////////////
export const pickedExerciseInForm =(info)=> {
    return {
        type:PICKED_EXERCISE_IN_FORM,
        info
    }
}

export const deletePickedExercise = (info) => {
    return {
        type:DELETE_PICKED_EXERCISE_IN_FORM
    }
}










///////////////////////////////////////////////
export const pickedExerciseInFormFunction = (info) => async (dispatch) => {
    dispatch(pickedExerciseInForm(info))
}

export const deletePickedExerciseFunction = () => async (dispatch) => {
    dispatch(deletePickedExercise())
}


///////////////////////////////////////////////
export default function reducer (state={}, action) {
    switch(action.type) {
        case PICKED_EXERCISE_IN_FORM:
            return {...state, pickedExercise:action.info}

        case DELETE_PICKED_EXERCISE_IN_FORM:
            const newState = {...state}
            delete newState.pickedExercise
            return newState

        default:
            return state;
    }
}