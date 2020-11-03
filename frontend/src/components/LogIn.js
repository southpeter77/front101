import React,{ useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import {login} from "../store/actions/user"

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
}));

const Login = () => {
    const classes = useStyles();
    const[email, setEmail] = useState("demo@demo.com");
    const[password, setPassword] = useState("demo");
    const dispatch = useDispatch()
    const token = useSelector((state) => state.user.token)
    const errors = useSelector((state)=> state.user.logInError)
    const updateProperty = (callback) => (e) => {
        callback(e.target.value);
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        const paylaod = {email, password};
        await dispatch(login(paylaod))
    }
    if(token) {
        return null
    }
    return (
        <>
        <div className="loginForm " >
        <div className={classes.paper}>
        {/* <Button variant="contained" color="primary" className="cancleLogin">BACK</Button> */}
        <Typography component="h1" variant="h5">
            Log In
        </Typography>
        <form className={classes.form} noValidate onSubmit ={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <TextField
            autoComplete="User Email"
            name="email"
            variant="outlined"
            required
            className="loginFormField"
            id="email"
            label="Email"
            autoFocus
            value={email}
            onChange={updateProperty(setEmail)}
         />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            autoComplete="Password"
            name="password"
            variant="outlined"
            required
            type="password"
            id="password"
            label="password"
            autoFocus
            value={password}
            onChange={updateProperty(setPassword)}
         />
        </Grid>
        {errors ? <ul className="errorListLogin">
            {errors.map((each, i) => <li key={i} >{each}</li>)}
        </ul> :
        null}
        <Button
                   type="submit"
                   variant="contained"
                //    color="primary"
                style={{backgroundColor:"lightgray"}}
                   className = "loginButton"
                       >Log In</Button>
             <div className="loginQuote"> Back to Grinding!</div>           
        <div className="loginPictureDiv"></div>
       
        </Grid>
        </form>
        </div>
        </div>
  

        </>
    )
}

export default Login