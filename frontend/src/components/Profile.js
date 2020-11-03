import React,{ useState, useEffect }  from 'react';
import NavBar from "./NavBar"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {loadCurrentUser} from "../store/actions/user"
import { useDispatch, useSelector } from 'react-redux';
import CardActions from '@material-ui/core/CardActions';
import EditProfileAboutMe from "./EditProfileAboutMe"
import {showEditForm} from "../store/actions/profile"
import {grabMyPlansFunction, } from "../store/actions/plan"
import {grabAllOrders} from "../store/actions/order"
import {deleteMyPlanFunction} from "../store/actions/plan"
import UploadProfile from "./UploadProfile"

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
  }));


const Profile = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const userInformation = useSelector(state=> state.user.userInformation)
    const editFormVisibility = useSelector(state => state.profile.showEdit)
    const myId = window.localStorage.getItem("currentUserId");
    const [clickedEdit , setclickedEdit] = useState(false)
    const myPlans = useSelector(state=> state.plan)
    const following = useSelector(state=> state.following )
    const [uploadClicked, setUploadClicked] = useState(false)


  // useEffect(()=> {
  //   // setUploadClicked(false)
  // },[userInformation])


    const clickEditFormOn = (data) => {
   
      dispatch(showEditForm(data))
    }

    // const getOrder =() => {
    //   const data = Object.values(following)[0].map(each => each.title)
    //   console.log(data)
    // }


    const deleteButton =(id) => {  
     dispatch(deleteMyPlanFunction(id))
    // dispatch(grabMyPlansFunction(myId))
    window.location.replace('/myProfile')

    }

    useEffect(()=> {
      dispatch(grabAllOrders(myId))
    dispatch(loadCurrentUser())
    dispatch(grabMyPlansFunction(myId))
    setclickedEdit(!clickedEdit)
    },[uploadClicked])

if(!userInformation) {
    return null
}
    return (
        <>     
  {/* <button onClick={()=>getOrder()}>sssssssssssss</button> */}

  {/* <button onClick={()=>console.log(userInformation.Images[0].url)}>sssssssssssss</button> */}
        <NavBar/>
        <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container className={classes.cardGrid} maxWidth="md" >
            {userInformation.Images.length > 0 && userInformation.Images[0].url ==="defaultProfile" ? 
            <div className="profilePictureDiv"></div> :
             <div className="profilePictureDivUpdated"
             style={{backgroundImage:`url(${userInformation.Images[0].url})`}}
             ></div>
             }
            <Typography component="h1" variant="h3" align="right" color="textSecondary" gutterBottom style={{textDecoration:"underline"}}>
                Hello {userInformation.firstName.toUpperCase()}!
            </Typography>
            <Typography component="h1" variant="subtitle" align="center" gutterBottom>
                Do Something Today That Your Future Self Will Thank You For!<br></br>
            </Typography>
     
    
            <Grid container spacing={2} className="profileDivs">
           
                  <Grid item xs={12} className="profileDivs">
                  <Card  variant="outlined" color="primary" className={classes.card}>
                  {/* <CardMedia
                   className={classes.cardMedia}
                 /> */}
                 <CardContent className={classes.cardContent} >
                     <Typography gutterBottom variant="h4" component="h2" className="myProfileFont" style={{textDecoration:"underline"}}>
                     Profile
                      </Typography>
                      <Button size="small" variant="outlined" color="primary"
                      onClick={()=>setUploadClicked(!uploadClicked)}
                      >Update Picture</Button>
                      {uploadClicked ? <UploadProfile 
                      uploadClicked={uploadClicked}
                      setUploadClicked={setUploadClicked}
                      ></UploadProfile> : null}
                      <Typography variant="h6" component="h2">
                     {userInformation.trainer ? "Trainer": "Trainee"}: 
                     {userInformation.firstName} {userInformation.lastName} <br></br> 
                     Email: {userInformation.email} <br></br>
                     {/* My-Balance: {userInformation.balance} <Button size="small" variant="outlined" color="primary">Charge</Button> <br></br>  */}
                     Training since : {userInformation.started_training_year} <br></br> 
                     About Me:<div className="profileAboutMe">
                              {userInformation.aboutMe} 
                              </div>
          
                     {!editFormVisibility ? <Button size="small" variant="outlined" color="primary" onClick={()=>clickEditFormOn(true)}>edit</Button> : <Button size="small" variant="outlined" onClick={()=>clickEditFormOn(false)} color="secondary" >Cancel</Button>}
                     

                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              {editFormVisibility ?<EditProfileAboutMe/> : null}  
                <Typography gutterBottom variant="h4" component="h3" className="myProfileFont" style={{textDecoration:"underline"}}>
                      My Workout Plans <Button size="small" variant="outlined" color="primary" onClick={()=>window.location.replace("/myprofile/createPlan")}>Create New</Button>
                      </Typography>
    {Object.values(myPlans).map((each, i)=>
      
       <Grid key={i+1} item xs={12} className="profileDivs">
                <Card key={i+10} className={classes.card}>
                 <CardContent key={i+100} className={classes.cardContent}>
                     <Typography key={i+1000}  gutterBottom variant="h5" component="h2" >
                      {each.title}
                      </Typography>
                      <Typography key={i+10000} >
                        {each.description}
                      </Typography>
                    </CardContent>
                  <CardActions>
                      <Button size="small" color="primary" onClick={()=> window.location.replace(`/plan/${each.id}`)} >
                       View
                      </Button>
                      <Button size="small" style={{color:"red"}} onClick={()=> deleteButton(each.id)} >
                       Delete
                      </Button>
                 </CardActions>
                  </Card>      
            </Grid> 

      )}
  {/* /////////////////////////////////////////////////////////////////////////////////////
  {/* ///////////////////////////////////////////////////////////////////////////////////// */}
  {/* ///////////////////////////////////////////////////////////////////////////////////// */}
                <Typography gutterBottom variant="h4" component="h2" className="myProfileFont"style={{textDecoration:"underline"}} >
                      Following Plans <Button size="small" variant="outlined" color="primary" onClick={()=>window.location.replace("/")}>Explore</Button>
                      </Typography>


    {following ? Object.values(following)[0].map((each, i)=>
       <Grid key={i+1} item xs={12} className="profileDivs">
                <Card key={i+10} className={classes.card}>
                 <CardContent key={i+100} className={classes.cardContent}>
                     <Typography key={i+1000}  gutterBottom variant="h5" component="h2" >
                      {each.title}
                      </Typography>
                      <Typography key={i+10000} >
                        {each.description}
                      </Typography>
                    </CardContent>
                  <CardActions>
                      <Button size="small" color="primary" onClick={()=> window.location.replace(`/plan/${each.id}`)} >
                       View
                      </Button>
                 </CardActions>
                  </Card>      
            </Grid> 
      ) : null}

      
            </Grid>
          </Container>
        </div>
  {/* show my plans on the left and show me subscribing plan on right //////////////////////*/}
     <Container className={classes.cardGrid} maxWidth="lg">

     </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Athlete 101 
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Create, Customize, Publish
        </Typography>
      </footer>
      {/* End footer */}
        </>
    )
}


export default Profile