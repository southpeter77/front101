import React, {useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import {deletePickedExerciseFunction} from '../store/actions/pickedExercise'
import {createExerciseFunction} from "../store/actions/exercise"
import {CURRENT_PLAN_ID} from "../store/actions/plan"
// import Grid from '@material-ui/core/Grid';


export default function ExerciseDetail({pickedExercise, pickedExerciseName}) {

const pickedExerciseDetail = useSelector(state => state.exerciseFormDetail)
const dispatch = useDispatch();
const[description, setDescription] = useState('')
const[title, setTitle] =useState("")
const deleteButtonHandler = () => {
    dispatch(deletePickedExerciseFunction())
}
const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };
  
const submitHandler = () => {
    const userId = window.localStorage.getItem("currentUserId")
    const currentPlanId = window.localStorage.getItem(CURRENT_PLAN_ID)
    const data = {title, imageId:pickedExercise,userId,description,currentPlanId}
    dispatch(createExerciseFunction(data))
    deleteButtonHandler()
}
useEffect(()=>{

},[pickedExerciseDetail])

if (!pickedExerciseDetail) {
    return null
}
return (
   
     <>
 <CssBaseline>
  <div className="createExerciseDivContainer2 shadowDiv">

      <div className=' singleGifCOntainer'>
 <div 
 
 className={`gif${pickedExercise}`}>
</div>
 <Typography align="center" variant ="subtitle2">Provide TItle and Description</Typography>
 <Box textAlign='left'>
         <Button  
    variant="contained"
    color="Primary"
    onClick={submitHandler}
    style={{backgroundColor:"lightgray", color:"black"}}
    >
    Submit</Button>
     <Button  
    variant="outlined"
    color="Secondary"
    onClick={deleteButtonHandler}
    >
    Cancel</Button>

 </Box>

     <TextField
        className="formDescriptionExercise" 
            name="description"
            variant="outlined"
            required
            value={title}
            id="description"
            label="Exercise Title"
            autoFocus
            onChange={updateProperty(setTitle)}
         />
        <TextField
        className="formDescriptionExercise" 
            name="description"
            variant="outlined"
            required
            multiline
            rows={8}
            value={description}
            id="description"
            label="Provide detail about this work out"
            autoFocus
            onChange={updateProperty(setDescription)}
         />





</div>
</div>


 </CssBaseline>
    </>
)
}