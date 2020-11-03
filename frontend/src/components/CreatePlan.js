import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {createPlanFuction} from "../store/actions/plan"
import {getPlanCategoryFunction,} from "../store/actions/planCategory"
import ExerciseForm from './ExerciseForm'


const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));


export default function CreatePlan() {
  const classes = useStyles();
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const list = useSelector(state=> state.category)
    const[loadNext, setLoadNext] = useState(false)
    const planId = window.localStorage.getItem("CurrentPlanId")

//for form///////
const [title, setTitle] = useState("");
const [price, setPrice] = useState(0);
const [category, setCategory] = useState('');
const [description, setDescription] = useState('')
const [confirmDisable, setConfirmDisable] = useState(false)

const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

const onClickHandler = () => {
    setLoadNext(!loadNext)
    const payload = {title, price, category, description};
    setConfirmDisable(true)
    dispatch(createPlanFuction(payload))
}


useEffect(()=> {
    setLoaded(true)

dispatch(getPlanCategoryFunction())
},[planId])

if(!loaded) {
    return null;
}

return (
    <>
    <NavBar></NavBar>
<CssBaseline>
    <main>
        <div className="createPlanDivContainer shadowDiv">
        <Typography component="h1" variant="h5" align="center">
                        CREATE YOUR OWN WORKOUT PLAN
         </Typography>
         <Typography component="h1" variant="h6" align="left">
                        Provide strong and appealing information.
         </Typography>
         <Typography component="h1" variant="subtitle2" align="left" color="secondary">
                        Other user will look at this information before purchasing.
         </Typography>
        <form className={classes.form} noValidate>
        <Grid container spacing={2} >
        <Grid item xs={12} >
              <TextField
                  name="title"
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  value={title}
                  onChange={updateProperty(setTitle)}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                  name="price"
                  variant="outlined"
                  required
                  fullWidth
                  id="price"
                  label="price in $"
                  autoFocus
                  type="number"
                  value={price}
                  onChange={updateProperty(setPrice)}
              />
          </Grid>
          <Grid item xs={12} sm={6} align="center">
          <FormControl variant="outlined">
 <InputLabel>Category</InputLabel>
 <Select
  native
  onChange={updateProperty(setCategory)}
//   value={state.age}
//   onChange={handleChange}
  label="category"
//   inputProps={{
//     name: 'age',
//     id: 'outlined-age-native-simple',
//   }}
>
  <option aria-label="None"
 
  ></option>
  {list.map((each,i)=> {
     return <option key={i} aria-label="None" value={each.id}>{each.categoryName}</option>
  })}
  {/* <option value={10}>ddddddddddddddddddddddddddddddddd</option>
  <option value={20}>Twenty</option>
  <option value={30}>Thirty</option> */}
</Select>
</FormControl>
          </Grid>

          <Grid item xs={12}>
              <TextField
                  name="description"
                  variant="outlined"
                  required
                  fullWidth
                  multiline
                  rows={4}
                  id="description"
                  label="Description"
                  autoFocus
                  value={description}
                  onChange={updateProperty(setDescription)}
              />
          </Grid>


          </Grid>
{title && price && category && description && !confirmDisable ? <Button
                   fullWidth
                   variant="contained"
                   color="primary"
                   className={classes.submit}
                    onClick={onClickHandler}
                       >
                          Confirm and Next
                           </Button> : <Button
                   fullWidth
                   variant="contained"
                   color="secondary"
                   className={classes.submit}
                       >
                          Create Plan, Choose Exercies and Submit!
                           </Button> }
         
          </form>
     </div>
{ loadNext ? <ExerciseForm></ExerciseForm>: null}
{/* <ExerciseForm planId={planId}></ExerciseForm> */}
{/* {viewPlan ? viewPlan.map(each=><h1>{each.title}</h1>) :null}s */}





    </main>    
</CssBaseline>

      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Athlete 101 
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Create, Customize, Publish
        </Typography>
      </footer>

    </>
)
}

// <FormControl variant="outlined">
// <InputLabel>Category</InputLabel>
// <Select
//   native
// //   value={state.age}
// //   onChange={handleChange}
//   label="Age"
// //   inputProps={{
// //     name: 'age',
// //     id: 'outlined-age-native-simple',
// //   }}
// >
//   <option aria-label="None" value="" />
//   <option value={10}>Ten</option>
//   <option value={20}>Twenty</option>
//   <option value={30}>Thirty</option>
// </Select>
// </FormControl>