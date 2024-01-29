# Tech Educators Bootcamp Week 08 Assignment


## Blog (or some such thing) with a Comments Form
-------------------------------------------------

### Task

Build a comment form.
Add categories and tags to your posts. Add a form to create new comments. Add an edit page that populates the form with the post data and allows you save changes to the database.

<br>
<br>

### Feedback from user stories

- As a user, I want to browse a list of posts, sortable by ascending or descending order
- As a user, I want to see a list of categories, and click on a category to see a list of posts in that category
- As a user, I want to be able to leave a comment sharing my thoughts on each post
<br>

### Requirements

- Created using create-next-app
- Design a SQL schema for a posts table, and a comments table that has a post_id column connecting it to the posts table.
- Either create a form where users can add posts OR seed your database with at least 4 posts that comments can be added to (if you do the seed, one of the stretch goals will be harder)
- Add a form to the individual post page to allow creating a new comment, which is saved to the new comments table including the Post ID.
- Refresh the /posts route data when adding a new post, and redirect the user to the list of posts
- Refresh the /post/:postId route when adding a new comment, so the new comment is displayed on the page
<br>

### Stretch goals

- Add a categories table to allow categorisation of posts at creation time using a dropdown menu; Add a /categories route that lists all categories, and a /categories/:id route that lists all posts in a category
- Add a new /posts/:id/edit route that allows editing a post. Populate the form with the post data, and save changes by updating the post in the database with a server action
- Add a delete button to the post page that removes the post from the database
- Add a new /posts/:id/comments/:id/edit route that allows editing a comment; Populate the form with the comment data, and save changes by updating the comment in the database with a server action



### Process

The project was implemented in two stages

1. Created Database (Postgres in Render)
2. Client/Server (in React/Next.js and hosted on Render)

To avoid the problems encountered in the previous week, the minimum requirements were implemented in the assignment, seen to be working and uploaded before adding any extra functionality.

<br>


### Requirements achieved

- Created using create-next-app
- Design a SQL schema for a posts table, and a comments table that has a post_id column connecting it to the posts table.
- Either create a form where users can add posts OR seed your database with at least 4 posts that comments can be added to ( Add post form was implemented - also SQL queries were used to populate tables - documented [here](https://github.com/mrdb303/assignment-forum-nextjs/blob/main/src/app/databaseinformation.txt) )<br>
- Add a form to the individual post page to allow creating a new comment, which is saved to the new comments table including the Post ID.
- Refresh the /posts route data when adding a new post, and redirect the user to the list of posts
- Refresh the /post/:postId route when adding a new comment, so the new comment is displayed on the page
<br>

### Stretch goals achieved

- Add a categories table to allow categorisation of posts at creation time using a dropdown menu. Add a /categories route that lists all categories, and a /categories/:id route that lists all posts in a category

<br/>

### Extra features

- When viewing a single instance of a post/tip, a user can hit the 'Like' button to increase the number of likes that the post has, thus increasing the rating of the tip/post
- If a category is clicked on to show a list of associated posts/tips, the list is ordered by the number of likes, in descending order (most number of likes first)
- The date/time of posting is saved against the post/tip record and message/comment records (as PostgreSQL timestamps) 

<br/>

### Other notes

- Although a 'Delete' button and 'Edit' button has been assigned to instances of messages, when listed underneath a post/tip, the functionality has not been added yet due to time restraints
- I discovered a last minute bug when assigning a category to a post, in that when posts/tips are viewed as a single instance, the correct category is not displayed; however, the correct category is displayed when viewing the post/tip directly from the category list
- Although timestamps are used to order previous messages/comments (see example query in the ListMessages component), I had some last minute problems pulling the date value out of the data returned, therefore they are not displayed on the posted records
<br>

### Links

Live link at Vercel: [https://assignment-forum-nextjs.vercel.app/](https://assignment-forum-nextjs.vercel.app/)<br>
Link to table setup SQL and population with basic test data: [here](https://github.com/mrdb303/assignment-forum-nextjs/blob/main/src/app/databaseinformation.txt)<br>
Link to the database schema: [https://github.com/mrdb303/assignment-forum-nextjs/tree/main/src/schema](https://github.com/mrdb303/assignment-forum-nextjs/tree/main/src/schema)<br>
<br><br>
Note: changes were made to this readme file after the assignment was submitted. I checked that this was allowed. No other code was changed.

