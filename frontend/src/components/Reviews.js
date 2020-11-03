import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {createReviewFunction, grabAllReviewFunction} from "../store/actions/review"
import { useDispatch,useSelector } from 'react-redux';

const Reviews = ({planId, currentUserId}) => {
    const[rating, setRating] = useState(0);
    const[comment, setComment] = useState('');
    const dispatch = useDispatch()
    const error = useSelector(state => state.review.error)
    const reviews = useSelector(state => state.review.reviews)
    const [loadReview , setLoadReview] = useState(false)
    const submitHandler =() => {
        const payload = {rating, comment,planId, currentUserId}
        setLoadReview(!loadReview)
        setRating(0);
        setComment('')
        dispatch(createReviewFunction(payload))
    }
    useEffect(()=> {
        dispatch(grabAllReviewFunction(planId))

    },[loadReview,])


    const updateProperty = (callback) => (e) => {
        callback(e.target.value);
      };



    return (
        <>
        <div className="reviewContainer">
<Typography gutterBottom variant="h6"align="left" >Reviews</Typography>
{reviews ? reviews.map(each=>
<div className='reviewsCommentDiv'>
    <Typography variant="subtitle2">
    By: {each.User.firstName}
    </Typography>
<Typography variant="subtitle2">
    Rating: {each.rating}
    </Typography>
  <Typography variant="subtitle">
      {each.comment}
      </Typography>  
</div>

) 
    : null}

<Grid item xs={12}>
<Typography gutterBottom variant="subtitle"align="left" >Write Reviews:</Typography>
{error ? <ul>
    {error.map(each=>{return (<li key={each} style={{color:"red"}}>{each}</li>)})}
</ul>: null}

<InputLabel>Rating</InputLabel>
 <Select
  native
  label="category"
  onChange={updateProperty(setRating)}
>
  <option aria-label="None" value={5}>Rating 5 - 0</option>
  <option aria-label="None" value={5}>5</option>
  <option aria-label="None" value={4}>4</option>
  <option aria-label="None" value={3}>3</option>
  <option aria-label="None" value={2}>2</option>
  <option aria-label="None" value={1}>1</option>
</Select>
<TextField
            name="review"
            variant="outlined"
            required
            id="review"
            label="Be kind to others"
            autoFocus
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={updateProperty(setComment)}
         />
         </Grid>
<Button size="small" style={{color:"black", backgroundColor:"lightgray"}}
onClick={()=>submitHandler()}
>Submit</Button>
</div>
        </>
    )

}

export default Reviews