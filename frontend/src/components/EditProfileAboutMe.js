import React,{ useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import {editProfielAboutMeFunction} from "../store/actions/profile"


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

const EditProfileAboutMe = () => {
    const[aboutMe ,setAboutMe] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch()
    const error = useSelector(state => state.profile.editAboutMeError)
    const updateProperty = (callback) => (e) => {
        callback(e.target.value);
      };

      const handleSubmit = (e) => {
          e.preventDefault()
          dispatch(editProfielAboutMeFunction(aboutMe))
      }


    return (
        <>
          <Typography color="primary" component="h1" variant="h4">
            About Me
        </Typography> 
        
        <div className="editProfileAboutMeForm3">
         
        <form className={classes.form}  noValidate onSubmit={handleSubmit}>
         {error ? <p style={{color:"red"}}>You need to provide About Me!!!</p>:null}
        <Grid>
        <TextField
        className="editProfileAboutMeForm2"
            autoComplete="About me"
            name="aboutMe"
            variant="outlined"
            required
            multiline
            rows={4}
            id="aboutMe"
            label="A short information about you! (Character less than 255)"
            autoFocus
            value={aboutMe}
            onChange={updateProperty(setAboutMe)}
         />
      
        {/* {errors ? <ul className="errorListLogin">
            {errors.map((each, i) => <li key={i} >{each}</li>)}
        </ul> :
        null} */}
        <Button
                   type="submit"
                   variant="contained"
                   color="primary"
                       >Edit</Button>
        </Grid>
        </form>
        </div>
        </>
    )
}

export default EditProfileAboutMe