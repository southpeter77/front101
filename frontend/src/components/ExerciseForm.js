import React, {useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {getExercisesFunction} from "../store/actions/exercise"
import ExerciseDetail from "./ExerciseDetail"
import {pickedExerciseInFormFunction} from '../store/actions/pickedExercise'
import {grabOnePlanFunction} from '../store/actions/plan'
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import { makeStyles } from '@material-ui/core/styles';
import {deleteExerciseById} from "../store/actions/exercise"

// const useStyles = makeStyles((theme) => ({
//     cardGrid: {
//         paddingTop: theme.spacing(8),
//         paddingBottom: theme.spacing(8),
//       },
//       cardContent: {
//         flexGrow: 1,
//       },
//     }));


export default function CreatePlan() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [pickedExercise, setPickedExercise]= useState('')
    const exerciseList = useSelector(state => state.exercise)
    const[pickedExerciseName, setPickedExerciseName] =useState('')
    const pickedExerciseDetail = useSelector(state => state.exerciseFormDetail.pickedExercise)
    const planId = window.localStorage.getItem("CurrentPlanId")
    const viewPlan = useSelector(state => state.plan.viewPlan)
    // const planId = window.localStorage.getItem("CurrentPlanId")
    // const classes = useStyles();
    const[deleted, setDeleted] = useState(true)
    //for form///////
const deleteHandler = (id) => {
    setDeleted(!deleted)
    dispatch(deleteExerciseById(id))
}


useEffect(()=> {
    dispatch(getExercisesFunction())
  dispatch(grabOnePlanFunction(planId))

setLoaded(true);

},[pickedExerciseDetail, deleted])

// return <button onClick={()=>console.log(viewPlan,exerciseList)}>bbb</button>

if(!viewPlan) {
    return null
}

return (
     <>
 <CssBaseline>
 
  <div className="createExerciseDivContainer shadowDiv">
      <div className="chooseExerciseDiv">EXPLORE EXERCISE</div>
 {exerciseList.map((each,i ) => {
     let gifClass =  `gif${each.id}`
     let exerciseId = each.id
 return (
  <div key={i} className='eachGifContainer'>
 <div 
 className= {gifClass} >
</div>
 <Typography align="center" variant ="subtitle2">{each.title}</Typography>
 <Box textAlign='center'>
     <Button  
    variant="contained"
    style={{backgroundColor:"lightgray"}}
    onClick={
        ()=>{setPickedExercise(exerciseId) 
            setPickedExerciseName(each.title)
            dispatch(pickedExerciseInFormFunction(exerciseId))
        }
    }
    >
    Add</Button>
 </Box>
  
  {/* <Button    
    variant="outlined"
    color="secondary"
    >
    Cancel</Button> */}

 </div>

 )
})} </div>
 </CssBaseline>

{pickedExerciseDetail ?<ExerciseDetail pickedExercise={pickedExercise} pickedExerciseName={pickedExerciseName}></ExerciseDetail> : null}

{/* <button onClick={()=>console.log(viewPlan.exercises)}>aaaaaaaaa</button>  */}
{viewPlan.exercises ? 
<>
<div className="previewDivContainer shadowDiv">
<Typography component="h4" variant="h5" align="center" style={{fontWeight:"bold", textDecoration:"underline"}}>Quick Overview</Typography>

{viewPlan.exercises.map(each => 
    <>
    <div className="previewEachContainer" >

   <div className="previewTitle" >
<Typography component="h4" variant="subtitle"  >{each.title}</Typography>
   <button className="redBox"
   onClick={()=>deleteHandler(each.id)}
   >X</button>
   </div>
  


   <div className="previewDescription" >
   <Typography component="h4" variant="subtitle"  >{each.description}</Typography>
   
   </div>

   </div>
    </>
    )}
    
    
    <Button size="large"
    onClick={()=>{
    window.localStorage.removeItem("CurrentPlanId")
    window.location.replace("/myProfile")
}}
>Confirm</Button>
</div>
</>
: null} 



    </>
)

}
