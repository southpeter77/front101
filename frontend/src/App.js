import React, { useState, useEffect } from 'react';
import HomePage from "./components/HomePage"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./components/SignUp"
import Profile from "./components/Profile"
import PageNotFound from "./components/PageNotFound"
import { useSelector, useDispatch } from 'react-redux';
import {loadToken} from "./store/actions/user"
import CreatePlan from "./components/CreatePlan"
import Plan from "./components/Plan"

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.needLogin === true ? (
        <Redirect to="/signup" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.needLogin !== true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);



const App = ({ needLogin, loadToken })=>  {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    loadToken();
  },[loadToken]);

  if (!loaded) {
    return null;
  }
  return (
    <>
    <BrowserRouter>
      <Switch>
        <PrivateRoute needLogin={needLogin} exact path="/myProfile" component={Profile}></PrivateRoute>
        <PrivateRoute needLogin={needLogin} exact path="/myProfile/createplan" component={CreatePlan}></PrivateRoute>
        <PrivateRoute needLogin={needLogin} exact path="/plan/:id" component={Plan}></PrivateRoute>

        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path="/" component={HomePage}></Route>
        {/* <PrivateRoute exact path="/plan/:id" component={Plan}></PrivateRoute> */}
        <Route component={PageNotFound}></Route>
      </Switch>
    </BrowserRouter>
   
    </>
  )
}

const AppContainer = () => {
  const needLogin = useSelector((state) => !state.user.token);
  const dispatch = useDispatch();
  return <App needLogin={needLogin} loadToken={() => dispatch(loadToken())} />;
};

export default AppContainer;
