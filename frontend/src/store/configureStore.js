import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import user from "./actions/user"
import plan from "./actions/plan"
import profile from "./actions/profile"
import category from "./actions/planCategory"
import exercise from "./actions/exercise"
import exerciseFormDetail from "./actions/pickedExercise"
import review from "./actions/review"
import following from "./actions/order"
import images from "./actions/image"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const reducer = combineReducers ({
    user,
    plan,
    profile,
    category,
    exercise,
    exerciseFormDetail,
    review,
    following,
    images
})

const configureStore = (initialState) => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    )
}

export default configureStore