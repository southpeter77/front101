import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {loadToken} from "../store/actions/user"
import { logout } from "../store/actions/user";
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Login from "./LogIn"
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';

const NavBar = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [loaded, setLoaded] = useState(false);
  const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();
  

    useEffect(()=> {
      setLoaded(true)
      dispatch(loadToken())
    },[dispatch])

    const handleClick =() => {
        dispatch(logout());
    }
if (!loaded) {
  return null
}


    return (
    <React.Fragment>
        {
            showLogin ? <Login></Login> : null
        }
     
    <CssBaseline />
    <AppBar position="relative">
      <Toolbar className ="ToolBarAligning" style={{backgroundColor:"black"}}>
        <Typography  variant="h4" color="inherit" noWrap>
        ATHLETE <FitnessCenterIcon></FitnessCenterIcon> 101
        </Typography>    
       <IconButton onClick={()=> window.location.replace("/")}>
         <HomeIcon style={{ fontSize: 40 }} style={{color:"white"}}></HomeIcon>
         </IconButton> 
        {!token ?
        (<>
        <ButtonGroup>
      
               <Button color="inherit" onClick={()=>setShowLogin(!showLogin)} style={{fontWeight:"bold"}}>Log In</Button>
              <Button href="/signup" color="inherit" style={{fontWeight:"bold"}}>Sign Up</Button>
        </ButtonGroup>
          </>
        ) :
        (
          <ButtonGroup>
          <Button color="inherit" href="/myProfile" style={{fontWeight:"bold"}}>My 101</Button>
          <Button onClick={handleClick} color="inherit" style={{fontWeight:"bold"}}>Log Out</Button>
         </ButtonGroup>
        )
        }
           
      </Toolbar>
   
    </AppBar>
    </React.Fragment>
    )
}

// const NavBarContainer = () => {
//     const needLogin = useSelector((state) => !state.user.token);
//     const dispatch = useDispatch();
//     return <NavBar needLogin={needLogin} loadToken={() => dispatch(loadToken())} />;
//   };




export default NavBar;