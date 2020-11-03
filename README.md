# ATHLETE-101
### Overview
-Users can create account

-Users can publish mutiple workout plans

-Users can follow (subscribe) other users' workout plans

-anyone can join but only logged in user can create / follow workout plan

-top rated workout plan will show on the main page of the app

## Main Page
    -Log-in / Sign-up buttons
    -(if not logged in, show some describtion of this app)
    -my profile button (if logged in)
    -Show top rated work out plans
    -below the top rated, it shows user what kind of categories of workout plans.
## workout plan page
    -logged in or not, user will see brief version of the workout.(trainer name, date, some pictures, some description but not all of them)
    -Once the user subscribe the workout or if the user is the owner of the post, will be able to see the whole work out plan.
    -have search bar on the top, have login/sign up or my profile
## login
    - have a simple log in page with email and password
## signup
    -  have a simple sign-up from that will grab all the data from the user.
## my profile
    - show profile description with my posts and subscribing posts.
    -balance(is just fake data for now)
    -have search bar on the top
    -have create and explore(this explore shows the categorized list just like the main page bottom section)
    -able to delete and edit the workout plan
## create workout plan
    -shows a form that user can put information of the work out.
    -title/description/pictures/price
    -publish button.
    -will be able to add each exercise in the form



### Back-End
all the back end fetch starts with /api

```
Category:
/all
Verb Get
Grab all the category for the form category

Exercise:
/all
Verb Get
Grab all the Exercise with gifs

/create
Verb Post
Grab provided information from front end and create in the back end.

Image:
/all
Verb get
Grab all the Images

Order:
/create
Verb Post
Create Order

/all
Verb get
Get all the order associating with the current User

Plan:
/myplan
Verb Put
Grab all the plan associating the user

/top
Verb Get
grab top rated Plan. Not sure how many to grab yet.

/:di
Verb Get
grab certain plan with the associating plan's id

/create
Verb Post
Grab data from front and create a plan

Profile
/aboutme
Verb Get
Grab information about me 


Review
/submit
Verb Post
Grab information to save for the review, rating and comment
associating userid and the plan id. then create.

/
Verb Put
Grab the Plan id and grab all the reviews
//


User
/signup
Verb Post
Sign up with all the information and create user.

/
Verb Put
Log in with information.

/:id
Verb Get
Grab certian users Id and grab information




```