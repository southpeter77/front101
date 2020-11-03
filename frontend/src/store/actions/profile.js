import {apiUrl} from "../../config"
import {loadCurrentUser} from "../actions/user"

export const EDIT_PROFILE_ABOUT_ME = "EDIT_PROFILE_ABOUT_ME";
export const TOKEN_KEY = "TOKEN_KEY";
export const EDIT_ABOUT_ME_ERROR = "EDIT_ABOUT_ME_ERROR"
export const SET_EDITED = "SET_EDITED"

///////////////////////////////////////////////////

export const editProfielAboutMe = (data) =>{
    return {
        type:EDIT_PROFILE_ABOUT_ME,
        data
    }
}

export const editAboutMeError = (errorArray) => {
    return {
        type: EDIT_ABOUT_ME_ERROR,
        errorArray
    }
}

export const editFormShow = (data) => {
    return {
        type:SET_EDITED,
        data
    }
}
///////////////////////////////////////////



export const showEditForm = (data) => async(dispatch) => {
    dispatch(editFormShow(data))
}

export const editProfielAboutMeFunction = (data) => async (dispatch) => {
    const userId = window.localStorage.getItem("currentUserId");
    const token = window.localStorage.getItem(TOKEN_KEY);
    try{
    const response = await fetch(`${apiUrl}/profile/aboutme`, {
        method: 'put',
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, token, data})
    })
    if(response.ok) {
            const data = await response.json();
        dispatch(loadCurrentUser(data))
        dispatch(editFormShow(false))
        showEditForm(false)

    }else {
        throw response;
    }
}catch(err) {
    const badRequest = await err.json();
    const arrayOfError =badRequest.error
    dispatch(editAboutMeError(arrayOfError))
}

}


export default function reducer (state={}, action) {
    switch(action.type) {
        case EDIT_ABOUT_ME_ERROR:
            return {...state, editAboutMeError:action.errorArray}
    
        case SET_EDITED: 
            return {...state, showEdit:action.data}
            
        default :
            return state
        }
}