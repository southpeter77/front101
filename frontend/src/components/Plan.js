import React, {useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import NavBar from "./NavBar"
import { useParams } from 'react-router-dom';
import {grabOnePlanFunction,  deleteMyPlanFunction} from '../store/actions/plan'
import Reviews from "./Reviews"

const Plan = ()=> {
  const dispatch = useDispatch();
  const viewPlan = useSelector(state => state.plan.viewPlan)
  const {id} = useParams()
  const planId =  Number.parseInt(id);
  // const token = window.localStorage.getItem('TOKEN_KEY')
  const currentUserId = window.localStorage.getItem("currentUserId")
useEffect(()=> {

  dispatch(grabOnePlanFunction(planId))
},[])

const deleteButton =(id) => { 
  console.log(id)
        dispatch(deleteMyPlanFunction(id))
      }


// const click = () => {
  // console.log(viewPlan)
// }

  if (!viewPlan) {
    return null
  }

  return (
    <React.Fragment>
      <NavBar/>
      <CssBaseline/>
      <main>
 {/* <button onClick={()=>console.log(viewPlan.planOwnerId)}>ddddddddddddddd</button>
 <button onClick={()=>console.log(currentUserId)}>ddddddddddddddd</button> */}

  <div className="ownersInformationDiv">
  <Typography gutterBottom variant="h5" component="h2" align="center">
             {viewPlan.planOwnerFirstName.toUpperCase()}   {viewPlan.planOwnerLastName.toUpperCase()}'s   {viewPlan.planTitle.toUpperCase()}
               </Typography>

  <div>profile picture on the right!!!!!!!!!!!!</div>
  <Typography gutterBottom variant="subtitle2"align="left" >First Name: {viewPlan.planOwnerFirstName}</Typography>
  <Typography gutterBottom variant="subtitle2"align="left">Last Name: {viewPlan.planOwnerLastName}</Typography>
  <Typography variant="subtitle2"align="left">About {viewPlan.planOwnerFirstName.toUpperCase()}: {viewPlan.planOwnerAboutMe}</Typography>
  <Typography gutterBottom variant="subtitle2"align="left">Training Since: {viewPlan.planOwnerYear}</Typography>
  <Typography gutterBottom variant="subtitle2"align="left">Workout Category: {viewPlan.planCategory}</Typography>
  {/* <Button size="small" style={{color:"black", backgroundColor:"gray"}}>View Profile</Button> */}
</div>

<Reviews planId={planId} currentUserId={currentUserId}></Reviews>

 <div className="exerciseInPlanContainer">
<div className="topPlanTitle">
 <div className="planTitle">
  <Typography variant="h5"align="center"> Title: {viewPlan.planTitle}</Typography>
</div>

<div className="planAuthor">
  <Typography variant="h6"align="center"> Author: {viewPlan.planOwnerFirstName} {viewPlan.planOwnerLastName}</Typography>
</div>
{currentUserId == viewPlan.planOwnerId ?
<button className="orangeBox"
onClick={()=> {
  window.location.replace("/myProfile")
  deleteButton(id)}}
>
    <span id="x">X</span>
</button> : null}



 </div>

 <div className="planDescription">
 <Typography variant="h6"align="left"> Description: {viewPlan.planDescription}</Typography>
</div>
 {viewPlan.exercises.map((each,i ) => {
     let gifClass =  `gif${each.imageId}`
 return (
   
    <div key={i} className="eachExercise">
      
  <div key={i} className='eachGifContainer'>
    
 <div 
 className= {gifClass} >
</div>
</div>
<div className="exerciseDescriptionAndTitle">
<Typography align="left" variant ="h6">
Title: {each.title}
 </Typography>
  <Typography align="left" variant ="subtitle">
Description: {each.description}
 </Typography>
</div>

 


</div>
 ) 

})} 
 </div>












      {/* <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
          Please Login or Sign-Up to continue viewing this plan
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Create, Customize, Publish your Workout Program!
              Just a click away from your next fitness goal
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    click to view all category
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Explore all the plan and lead to search button
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div> */}
      </main>
    </React.Fragment>
  );
}


export default Plan




