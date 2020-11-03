import {apiUrl} from "../../config"

export const TOKEN_KEY = "TOKEN_KEY";
export const SET_TOKEN = "SET_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";
export const SET_CURRENT_USER = "SET_CURRENT_USER"
export const LOGIN_ERROR_ARRAY = "LOGIN_ERROR_ARRAY"
export const SIGNIN_ERROR_ARRAY = "SIGNIN_ERROR_ARRAY"
export const SET_CURRENT_USER_INFORMATION = "SET_CURRENT_USER_INFORMATION"

//////////////////////////////////////////////////////////////////
export const setToken = (token) => {
    return {type: SET_TOKEN, token}
}

export const removeToken = () => {
    return {
        type:REMOVE_TOKEN
    }
}

export const setCurrentUser = (userId) => {
    return {
        type:SET_CURRENT_USER,
        userId
    }
}
export const loginErrorArray = (errorArray) => {
    return {
        type: LOGIN_ERROR_ARRAY,
        errorArray
    }
}
export const signinErrorArray= (errorArray) => {
    return {
        type:SIGNIN_ERROR_ARRAY,
        errorArray
    }
}

export const setCurrentUserInformation = (information) => {
    return {
        type:SET_CURRENT_USER_INFORMATION,
        information
    }
}
//////////////////////////////////////////////////////////////////
export const loadToken = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
            dispatch(setToken(token))
    }
}
///////////////////////////////////////////////////////////
export const loadCurrentUser = () => async (dispatch) => {
    const currentUserId = window.localStorage.getItem("currentUserId");

    const response  = await fetch(`${apiUrl}/user/${currentUserId}`);
    if (response.ok) {
        const userData = await response.json();
        dispatch(setCurrentUserInformation(userData))
    }
}
///////////////////////////////////////////////////////////
export const login = ({email, password}) => async (dispatch) => {
    try {
    const response = await fetch(`${apiUrl}/user`, 
    {method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })}
    );

    if (response.ok) {
        const { token, userId } = await response.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        window.localStorage.setItem("currentUserId", userId)
        dispatch(setToken(token));
        dispatch(setCurrentUser(userId))
      } 

      if (!response.ok){
          throw response
      }
    }catch(err) {
        const badRequest = await err.json();
const arrayOfError =badRequest.error
 await dispatch(loginErrorArray(arrayOfError))
    }
}
////////////////////////////////////////////
export const logout = () => async (dispatch, getState) => {

    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem("currentUserId")
    dispatch(removeToken());
}
/////////////////////////////////////////////////////////////////
export const signUp = (payload) => async (dispatch) => {

try {
    const response = await fetch(`${apiUrl}/user/signup`, {
        method:"post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
       if(response.ok) {
        const {token, userId} = await response.json();
        window.localStorage.setItem(TOKEN_KEY,token);
        window.localStorage.setItem("currentUserId", userId)
        dispatch(setToken(token));
        dispatch(setCurrentUser(userId))
    } else {
        throw response
    }
} catch(err) {
    const badRequest = await err.json();
    const arrayOfError =badRequest.error
    dispatch(signinErrorArray(arrayOfError))
}

}
//////////////////////////////////////////////////////////////////
export default function reducer (state ={}, action) {
    switch(action.type) {
        case SET_TOKEN:
            return {...state, token:action.token}

        case REMOVE_TOKEN:
            const newState = {...state}
            delete newState.token;
            return newState
        
        case SET_CURRENT_USER:
            return {...state, currentUser:action.userId}

        case LOGIN_ERROR_ARRAY:
           return {...state, logInError:action.errorArray} 

        case SIGNIN_ERROR_ARRAY:
             return {...state, signInError:action.errorArray} 

        case SET_CURRENT_USER_INFORMATION:
            return {...state, userInformation:action.information}

        default :
            return state
    }
}